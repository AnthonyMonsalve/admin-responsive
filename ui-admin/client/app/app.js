((function () {

    'use strict';

    var app = angular.module('hiraApp', [
        //hiraApp reusable features
        'hiraApp.core',
        'hiraApp.filters',
        'hiraApp.widgets',
        'hiraApp.connections',

        //hiraApp auth module
        'hiraApp.auth',

        //hiraApp DOM structure
        'hiraApp.layout'
    ]);

    /*@ngInject*/
    function authInterceptor($q, $injector) {
        return {
             // Intercept 401s and redirect you to login

            request: function(config) {
                var token = $injector.get('Auth').getToken();
                if (token) {
                    config.headers.Authorization = token;
                }
                config.headers.version= "37d467a210"
                return config;
            },

            //Esto deberia abrir un login en pop-up que te pida tus credenciales
            responseError: function (response) {
                if (response.status === 401 || response.status === 403) {
                    $injector.get('Auth').unauthorizedAttempt(response.data);
                    // remove any stale tokens
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    }

    app.factory('authInterceptor', authInterceptor);

    /*@ngInject*/
    function runFn(Auth, common, NavbarSvc, SweetAlert) {
        var $state = common.$state;
        var $log = common.$log;
        var $rootScope = common.$rootScope;

        $rootScope._ = _;

        //$log.info('Made with ♥ by IRB.IO\n\n-You want to work with us? Write a message to jobs@irb.io-');
        // Redirect to login if route requires auth and you're not logged in

        /* Auth.isLoggedIn().then((isLoggedIn)=>{
            //console.log(isLoggedIn);
            if (!isLoggedIn.data.valido) {
                event.preventDefault();
                $state.go('login');
            }else {
              //console.log('refrescando 1era');
                Auth.refreshToken();
            }
        }).catch((err)=>{
            console.log('Ha ocurrido un error en isloggedIn '+err);
            event.preventDefault();
            $state.go('login');
        }); */

        $rootScope.$on('$stateChangeStart', function (event, sig, sigParam, ant) {
            if (sig.name == 'login') {
                Auth.estadoAnterior(ant.name);
            }


            NavbarSvc.closeMenu();

            // This is for access check
            if (sig.data && sig.data.hasAccess) {
                isAllowed= Auth.isEmployee();
                    if (sig.data && sig.data.hasAccess && isAllowed && !(sig.name == 'login')) {
                        //event.preventDefault();

                        SweetAlert.swal({
                          title: "Access denied",
                          text: "You are not authorized to go to " + sig.name,
                          type: "error",
                          closeOnConfirm: true
                        },function(resp){
                          $state.go('login');
                        });
                    }
            }

            // This is for loggedin check
            if (sig.data && sig.data.isLoggedIn) {
                Auth.isLoggedIn().then((isLoggedIn)=>{
                    //console.log(isLoggedIn);
                    if (!isLoggedIn.data.valido) {
                        event.preventDefault();
                        $state.go('login');
                    }else {
                      //console.log('refrescando 1era');
                        Auth.refreshToken();
                    }
                }).catch((err)=>{
                    console.log('Ha ocurrido un error en isloggedIn '+err.data);
                    event.preventDefault();
                    $state.go('login');
                });
            }

        });
    }

    app.config(function($mdThemingProvider, $mdIconProvider){
            var path = './bower_components/material-design-icons/';

            $mdIconProvider
                .defaultFontSet( 'fa' );

                $mdThemingProvider.definePalette('primary', {
                  '50': 'e9ecf2',
                  '100': 'c8cfdf',
                  '200': 'a4afc9',
                  '300': '808eb3',
                  '400': '6476a3',
                  '500': '495e93',
                  '600': '42568b',
                  '700': '394c80',
                  '800': '314276',
                  '900': '213164',
                  'A100': 'a5b9ff',
                  'A200': '7291ff',
                  'A400': '3f69ff',
                  'A700': '2555ff',
                  'contrastDefaultColor': 'light',
                  'contrastDarkColors': [
                    '50',
                    '100',
                    '200',
                    '300',
                    'A100',
                    'A200'
                  ],
                  'contrastLightColors': [
                    '400',
                    '500',
                    '600',
                    '700',
                    '800',
                    '900',
                    'A400',
                    'A700'
                  ]
                });
                $mdThemingProvider.definePalette('secundary', {
                  '50': 'e8ebf2',
                  '100': 'c6cde0',
                  '200': 'a0accb',
                  '300': '798ab6',
                  '400': '5d71a6',
                  '500': '405896',
                  '600': '3a508e',
                  '700': '324783',
                  '800': '2a3d79',
                  '900': '1c2d68',
                  'A100': 'a5b6ff',
                  'A200': '728dff',
                  'A400': '3f64ff',
                  'A700': '2550ff',
                  'contrastDefaultColor': 'light',
                  'contrastDarkColors': [
                    '50',
                    '100',
                    '200',
                    '300',
                    'A100',
                    'A200'
                  ],
                  'contrastLightColors': [
                    '400',
                    '500',
                    '600',
                    '700',
                    '800',
                    '900',
                    'A400',
                    'A700'
                  ]
                });

                $mdThemingProvider.theme('default')
                    .primaryPalette('primary')
                    .accentPalette('secundary');

        });

    app.run(runFn);


    //No se donde ubicarlo y bueno

})());
