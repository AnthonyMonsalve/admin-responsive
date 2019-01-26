((function() {
    'use strict';

    /*@ngInject*/
    function Auth(common, localStorageService, $cookies, NotificationsSvc, $interval, $mdDialog, Connections,$timeout) {
        var service = {};
        var $q = common.$q;
        var $state = common.$state;
        var $http = common.$http;
        var $window = common.$window;
        var storage = localStorageService;
        var currentUser = null;
        var receiverUser = null;
        var baseUrl = Connections.getAccessServer();
        var baseUrl_auth = Connections.getAccessServer();
        var baseUrl_business = Connections.getBusinessServer();
        var baseUrl_catalogues = Connections.getCataloguesServer();
        //var baseUrl = 'http://172.17.0.3:5004';
        var estado_anterior = "content.home";

        function ValidationError(err) {
            this.errors = err;
        }

        /* ========== AUTH SERVICES ========== */

        service.isEmployee= function(){
            cu = storage.get('user');
            if (cu.type=='Employee') {return true}
            else {return false}
        }

        service.getCurrentUser = function() {
            currentUser = storage.get('user');
            return currentUser;
        };

        service.getUser_id = function(username) {
            return $http({
                method: 'GET',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                url: baseUrl_business + '/business/employees/list?username=' + username
            }).then(function(res) {
                if (res.data.count == 1) {
                    currentUser = res.data.list[0];
                    storage.set('user', res.data.list[0]);
                    storage.set('username', res.data.list[0].username);
                }
            }).catch(function(err) {
                throw err;
            });
        };

        // Better no use this
        service.me = function() {
                return $http({
                    method: 'GET',
                    url: Connections.getAccessServer() + '/access/users/me'
                })
            }
            // And better use this
        service.getReceiver_id = function(username) {
            return $http({
                method: 'GET',
                url: baseUrl_business + '/business/clients/list?username=' + username
            })
        };

        // Login
        service.login = function(user,vm) {
            return $http({
                method: 'POST',
                url: baseUrl_auth + '/access/login',
                data: user
            }).then(function(res) {
                /*if (res.statusText == "Bad Request")
                	throw {'error': res.data[0].msg}*/
                //console.log(res);
                $cookies.put('token', res.data.token);
                storage.set('username', user.user);
                service.getBox().then((response)=>{
                    console.log(response.data);
                    storage.set('user',response.data.list[0]);
                    //console.log(storage.get('user'));
                    currentUser = storage.get('user');
                    //console.log('going home now');
                    console.log(response.data.list[0].type);
                    if (response.data.list[0].type=='Employee'){
                        console.log('going home now');
                        $state.go("content.business.clients");
                    }else{
                        console.log('user is UnAthorized');
                        vm.submitted = false;
                        vm.error = 'Usuario no Autorizado';
                        vm.inError = true;
                        $timeout(function(){
                            vm.inError = false;
                        }, 5000);
                    };
                }).catch((err)=>{
                    console.log(err);
                });

            }).catch(function(err) {
                if (err.data.reason=='Usuario Bloqueado'){
                    console.log('user is Blocked');
                    vm.submitted = false;
                    vm.error = err.data.reason;
                    vm.inError = true;
                    $timeout(function(){
                        vm.inError = false;
                    }, 5000);

                } else{
                    console.log(err.data);
                    vm.submitted = false;
                    vm.error = err.data.reason;
                    vm.inError = true;
                    $timeout(function(){
                        vm.inError = false;
                    }, 5000);
                }
            });
        };

        // Log out
        service.logout = function() {
            currentUser = {};
            storage.remove('user');
            $cookies.remove('token');
            common.$state.go("login");
            //$window.location.reload();
        };

        // SIGN UP:
        service.signup = function(user) {
            return $http({
                method: 'POST',
                url: baseUrl_business + '/business/clients/register',
                data: user
            }).then(function(res) {
                if (!res) {
                    console.log("Error registrando usuario.");
                    return $q(false);
                }
                var credentials = {
                    _id: res.data.user,
                    password: user.password
                };

                return service.login(credentials);
            }).catch(function(err) {
                throw new ValidationError(err.data);
            });
        };
        // Request phone activation
        service.phoneReq = function() {
                return $http({
                    method: 'POST',
                    url: baseUrl_business + '/business/clients/confirm_phone/request'
                }).then(function(res) {
                    console.log('Success', res);
                }).catch(function(err) {
                    console.log('ERR:', err);
                    throw err;
                });
            }
            // confirm phone
        service.phoneAct = function(user) {
            return $http({
                method: 'POST',
                url: baseUrl_business + '/business/clients/confirm_phone/',
                data: user
            }).then(function(res) {
                console.log('Success', res);
            }).catch(function(err) {
                console.log('ERR:', err);
                throw err;
            });
        }

        /* ======================================= */
        /* ========== BUSINESS SERVICES ========== */
        /* ======================================= */


        // Get data in a box
        service.getBox = function() {
            return $http({
                method: 'GET',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                url: baseUrl_business + '/business/employees/list?username=' + storage.get('username')
            })
        };

        // RECHARGE:
        service.recharge = function(user) {
            return $http({
                method: 'POST',
                url: baseUrl_business + '/business/requests/recharges/create',
                data: user,
                Authorization: $cookies.get('token')
            }).then(function(res) {
                console.log('Success', res);
            }).catch(function(err) {
                console.log('ERR:', err);
                throw err;
            });
        };

        // TRANSFER:
        service.transfer = function(user) {
            return $http({
                method: 'POST',
                url: baseUrl_business + '/business/operations/transfers/create',
                data: user,
                Authorization: $cookies.get('token')
            }).then(function(res) {
                console.log('Success', res);
            }).catch(function(err) {
                console.log('ERR:', err);
                throw err;
            });
        };
        service.shareTransferData = function() {
            var transfer = {
                receiver: '',
                amount: ''
            };
            return transfer;
        };

        // WITHDRAW:
        service.withdraw = function(user) {
            return $http({
                method: 'POST',
                url: baseUrl_business + '/business/requests/withdrawals/create',
                data: user,
                Authorization:$cookies.get('token')
            }).then(function(res) {
                console.log('Success', res);
            }).catch(function(err) {
                console.log('ERR:', err);
                throw err;
            });
        };
        service.shareWithdrawData = function() {
            var withdraw = {
                amount: ''
            };
            return withdraw;
        };

        // ACTIVATE ACCOUNT:
        service.activateAccount = function(user) {
            return $http({
                method: 'POST',
                url: baseUrl_business + '/business/requests/bank_account_activations/create',
                data: user,
                Authorization:$cookies.get('token')
            }).then(function(res) {
                console.log('Success', res);
            }).catch(function(err) {
                console.log('ERR:', err);
                throw err;
            });
        };

        // CONTACT FORM:
        service.contactUs = function(user) {
            return $http({
                method: 'POST',
                url: baseUrl_business + '/business/requests/contact_us/create',
                data: user,
                Authorization:$cookies.get('token')
            }).then(function(res) {
                console.log('Success', res);
            }).catch(function(err) {
                console.log('ERR:', err);
                throw err;
            });
        };

        // LIST BANKS
        service.bankList = function() {
            return $http({
                method: 'GET',
                url: baseUrl_catalogues + '/catalogues/banks/list?limit=30'
            })
        };

        // HISTORIAL
        service.history = function() {
            return $http({
                method: 'GET',
                url: baseUrl_business + '/business/operations/list/me'
            })
        }

        /* ------------------------------------------------------------------------------------ */
        /* ------------------------------------- NOT USED ------------------------------------- */

        function getCurrentUserFromServer() {
            return $http({
                method: 'GET',
                url: Connections.getAccessServer() + '/access/users/me'
            }).then(function(res) {
                currentUser = res.data;
                storage.set('user', res.data);
            }).catch(function(err) {
                throw err;
            });
        }

        service.getToken = function() {
            return $cookies.get('token');
        };

        service.isLoggedIn = function() {
            return ($http({
                method: 'POST',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                url: baseUrl_auth + '/access/verifica',
                data: null
            }));
        };

        service.isLoggedInAsync = function(cb) {
            return cb(service.isLoggedIn());
        };

        service.hasRole = function(role) {
            return (service.getCurrentUser().roles.indexOf(role) != (-1));
        };

        service.hasRoleAsync = function(cb) {
            return cb(service.hasRole());
        };

        service.productService = function() {
            var productList = [];

            var addProduct = function(newObj) {
                productList.push(newObj);
            };

            var getProducts = function() {
                return productList;
            };

            return {
                addProduct: addProduct,
                getProducts: getProducts
            };
        };




        service.unauthorizedAttempt = function(attempt) {
            if (attempt.code === 'error') {
                NotificationsSvc.fast("You have to login", "error");
                currentUser = {};
                storage.remove('user');
                $cookies.remove('token');
                $window.location.reload();
            }

            if (attempt.code === 'expired') {
                NotificationsSvc.fast("Your session expired", "error");
                service.showLoginModal();
            } else if (attempt.code === 'unauthorized') {
                alert('Access not allowed.');
                NotificationsSvc.fast("Access denied", "error");
            }
        };

        service.estadoAnterior = function(estado) {
            if (estado.length != 0) estado_anterior = estado;
        };

        service.refreshToken = function() {
            console.info('Refrescando token');
            const user = storage.get('user');
            console.info(user.username);
            return $http({
                method: 'POST',
                headers:{Authorization: $cookies.get('token'), user: user.username},
                url: baseUrl + '/access/refresh'
            }).then(function(res) {
                console.log(res.data);
                $cookies.put('token', res.data.token);
            }).catch(()=>{
                $cookies.remove('token');
            });
        };

        service.enableRefreshToken = function() {
            console.log('refresh my token')
            $interval(function() {
                service.refreshToken();
            }, 10 /*minutes*/ * 60 /*seconds*/ * 1000 /*milliseconds*/ );
        };

        service.showLoginModal = function() {
            $mdDialog.show({
                    controller: 'LoginModalCtrl',
                    controllerAs: 'vm',
                    templateUrl: 'app/auth/login/modal/login.html',
                    parent: angular.element(document.querySelector('body')),
                    clickOutsideToClose: false,
                    escapeToClose: false,
                    fullscreen: true
                })
                .then(function(token) {
                    NotificationsSvc.fast("Successful authentication.", "success");
                });
        };

        service.authenticate = function(password) {
            var user = service.getCurrentUser();
            console.log(user);
            var credentials = {
                _id: user._id,
                password: password
            };
            return service.login(credentials);
        };

        service.hasAccess = function(state) {
            var user = service.getCurrentUser();
            if (!user || !user.states) {
                return false;
            }
            return user.states[state];
        };

        service.hasAccessAsync = function(state, cb) {
            var user = service.getCurrentUser();
            if (!user || !user.states) {
                return cb(true);
            }
            return cb(null, user.states[state]);
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('Auth', Auth);
})());
