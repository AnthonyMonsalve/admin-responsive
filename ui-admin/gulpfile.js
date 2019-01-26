//Extra plugins

var gulp = require('gulp');
var del = require('del');
var args = require('yargs').argv;
var babel  = require('gulp-babel');
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var gulpNgConfig = require('gulp-ng-config');
var currentEnv = (args.production === undefined) ? 'dev' : 'production';

// Gulp plugins merged into one object name $

var $ = require('gulp-load-plugins')({
    lazy: true
});

var port = process.env.PORT || config.defaultPort;

// Helper method

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

// Checking out syntax and common style errors

gulp.task('vet', function() {
    log('Analyzing with JSHINT and JSCS!');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'));
});

// Copying fonts

gulp.task('fonts', ['clean-fonts'], function() {
    log('Copying fonts...');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'assets/fonts'));
});

// Copying and compressing images

gulp.task('images', ['clean-images'], function() {
    log('Copying and compressing images...');

    return gulp
        .src(config.images)
        .pipe($.imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(config.build + 'assets/images'));
});

// Css Precompiler and AutoPrefixer

gulp.task('styles', ['clean-styles'], function() {
    log('Compiling SASS --> CSS and adding prefixes.');

    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sass())
        .on('error', $.sass.logError)
        .pipe($.autoprefixer({
            browsers: ['last 2 version', '> 5%']
        }))
        .pipe(gulp.dest(config.tmp))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Watcher of CSS files to precompile automatically

gulp.task('sass-watcher', function() {
    gulp.watch([config.sass], ['styles']);
});

// Wiring every script and stylesheet at index.html

gulp.task('templatecache', ['clean-code'], function() {
    log('Creating AngularJS $templateCache');

    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({
            empty: true
        }))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.tmp));
});

gulp.task('wiredep', function() {
    log('Wiring everything up"');

    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['set-env','wiredep', 'styles', 'templatecache'], function() {
    log('Injecting custom css...');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

gulp.task('optimize', ['inject', 'fonts', 'images'], function() {
    log('Optimizing files');

    var templateCache = config.tmp + config.templateCache.file,
        assets = $.useref({
            searchPath: './'
        }),
        cssFilter = $.filter(config.optimized.css, {
            restore: true
        }),
        jsAppFilter = $.filter(config.optimized.app, {
            restore: true
        }),
        jsLibFilter = $.filter(config.optimized.lib, {
            restore: true
        });

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache, {
            read: false
        }), {
            starttag: '<!-- inject:template:js -->'
        }))
        .pipe(assets)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(jsLibFilter)
        .pipe($.uglify())
        .pipe(jsLibFilter.restore)
        .pipe(jsAppFilter)
        .pipe(babel({presets: ["@babel/preset-env"]}))
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsAppFilter.restore)
        .pipe($.if('!*.html', $.rev()))
        .pipe($.revReplace())
        .pipe(gulp.dest(config.build))
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.build));
});

gulp.task('serve-build', ['optimize'], function() {
    serve(false);
});

gulp.task('serve-dev', ['inject'], function() {
    serve(true);
});

gulp.task('set-env', function() {
    log('Injectando variables de entorno');
    
    return gulp
        .src('env.json')
        .pipe(gulpNgConfig('hiraApp.connections',{
            createModule: false,
            wrap: true,
            environment: currentEnv,
            pretty: true
        }))
        .pipe(gulp.dest(config.envPath));
});


// Bumping versions

gulp.task('bump', function() {
    var msg = 'Bumping versions',
        type = args.type,
        version = args.version,
        options = {};

    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
        msg += ' for a ' + type;
    }

    log(msg);

    return gulp
        .src(config.packages)
        .pipe($.print())
        .pipe($.bump(options))
        .pipe(gulp.dest(config.root));
});

// Temporary folder clean up

gulp.task('clean', function() {
    var delconfig = [].concat(config.build, config.tmp);

    log('Cleaning: ' + $.util.colors.blue(delconfig));

    return del(delconfig);
});

gulp.task('clean-fonts', function() {
    clean(config.build + 'fonts/**/*.*');
});

gulp.task('clean-images', function() {
    clean(config.build + 'images/**/*.*');
});

gulp.task('clean-styles', function() {
    clean(config.tmp + '**/*.css');
});

gulp.task('clean-code', function() {
    var files = [].concat(
        config.tmp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );

    clean(files);
});

//////////////////
// Reusable Fns //
//////////////////

function serve(isDev) {
    if (isDev)
        log('Serving up in dev-mode.');

    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    if (isDev) {
        return $.nodemon(nodeOptions)
            .on('start', function() {
                    log('Server started in dev mode');
                    startBrowserSync(isDev);
            })
            .on('restart', function() {
                log('Server has just restarted');
                setTimeout(function() {
                    browserSync.reload({
                        stream: false
                    });
                }, 1000);
            });
    }

    log('Production detected. Please run server with pm2. -  This for now.');

    return null;
}


function startBrowserSync(isDev) {
    if (browserSync.active || args.nosync) {
        return;
    }

    log('Starting browser sync');

    if (isDev) {
        gulp.watch([config.sass], ['styles']);
    } else {
        gulp.watch([config.sass, config.js, config.html], ['optimize', browserSync.reload]);
    }

    var options = {
        proxy: 'localhost:' + config.defaultPort,
        port: 4002,
        files: isDev ? [
            config.client + '**/*.js',
            config.client + '**/*.html',
            config.css
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: config.browserSyncReloadDelay
    };

    browserSync(options);
}

function clean(path) {
    log('Cleaning path: ' + path);
    return del(path);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
