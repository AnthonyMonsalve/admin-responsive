module.exports = function() {
    var 
        root = './',
        client = root + 'client/',
        clientApp = client + 'app/',
        envPath = clientApp + 'connections/',
        clientComp = client + 'components/',
        tmp = root + '.tmp/',
        server = root + 'server/',
        build = root + 'build/';

    var config = {

        //////////////
        //File paths//
        //////////////
        tmp: tmp,
        client: client,
        server: server,
        build: build,
        envPath: envPath,

        // All JS to vet
        alljs: [
            clientApp + '**/*.js',
            './*.js'
        ],

        html: clientApp + '*/**.html',

        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js',
        ],

        css: [
            tmp + '**/*.css',
            client + 'bower_components/odometer/themes/odometer-theme-default.css',
            client + 'bower_components/angular-bootstrap/ui-bootstrap-csp.css'
        ],

        fonts: [
           // client + 'bower_components/font-awesome/fonts/**/*.*',
            client + 'bower_components/material-design-icons/iconfont/**/*.*',
            client + 'assets/fonts/**/*.*'
        ],

        images: client + 'assets/images/**/*.*',

        htmltemplates: clientApp + '**/*.html',

        // All Sass files to compile
        sass: clientApp + 'aphrodite/**/*.scss',

        index: client + 'index.html',

        root: root,

        optimized: {
            lib: '**/lib.js',
            app: '**/app.js',
            css: '**/*.css',
        },

        ///////////////////////////
        ///////Template Cache//////
        ///////////////////////////

        templateCache: {
            file: 'template.js',
            options: {
                module: 'hiraApp.core',
                standAlone: false,
                root: 'app/'
            }
        },

        ///////////////////////////
        ////////Browser Sync///////
        ///////////////////////////

        browserSyncReloadDelay: 500,

        packages: [
            '../package.json',
            './bower.json'
        ],


        ///////////////////////////
        //Bower and NPM Locations//
        ///////////////////////////

        bower: {
            json: require('./bower.json'),
            directory: './client/bower_components/',
            ignorePath: '../..',
            fileTypes: {
                html: {
                    replace: {
                        js: '<script src="/client/{{filePath}}"></script>',
                        css: '<link rel="stylesheet" href="/client/{{filePath}}" />'
                    }
                }
            }
        },

        ///////////////////////////
        ///////NODE SETTINGS///////
        ///////////////////////////

        defaultPort: 9002,
        nodeServer: server + 'ini.js'



    };

    config.getWiredepDefaultOptions = function getWiredepDefaultOptions() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath,
            fileTypes: config.bower.fileTypes
        };

        return options;
    };

    return config;
};
