/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ClientsSvc(common, localStorageService, ClientsDataHandler, Connections, $cookies) {
        var $http = common.$http;
        var storage = localStorageService;
        var baseUrl = Connections.getBusinessServer() + '/business/clients';
        var baseUrlOp = Connections.getBusinessServer() + '/business/operations';
        //var baseUrl = 'http://172.17.0.3:5006/access/borrowers';

        function recordarPago(email, username,monto){
          return $http({
            url: baseUrl + '/recordarpago',
            headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
            method: 'POST',
            data: {'para':email, 'username':username, 'monto':monto}
          })
        }

        function getClientReco(clientId) {
            return $http({
                //////A mi no me cambies nunca! Dejame apuntar al trestful
                url: "https://trestful.yeipii.com/serverbusiness/business/clients/show/" + clientId,
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET'
            }).then(function(res) {
                return res;
            }).catch(function(err) {
                throw err;
            });
        }

        function getClient(clientId) {
            return $http({
                url: baseUrl + '/show/' + clientId,
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET'
            }).then(function(res) {
                return res;
            }).catch(function(err) {
                throw err;
            });
        }

        function getClientOperations(clientId, query) {
            return $http({
                url: baseUrlOp + '/list/' + clientId,
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET',
                params:query
            }).then(function(res) {
                return res;
            }).catch(function(err) {
                throw err;
            });
        }

        function getClients(query) {
            return $http({
                url: baseUrl + '/list',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET',
                params: query
            }).then(function(res) {
                return res;
            }).catch(function(err) {
                throw err;
            });
        }

        function createBorrower(borrower) {
            return $http({
                url: baseUrl + '/create',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'POST',
                data: borrower
            }).then(function(res) {
                ClientsDataHandler.createBorrower();
                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function sendAll(data) {
            return $http({
                url: baseUrl + '/all_mail',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'POST',
                data: data
            })
        }

        function sendEmail2(data) {
            return $http({
                url: baseUrl + '/all_mail',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'POST',
                data: data
            })
        }

        function sendEmail(data) {
            return $http({
                url: baseUrl + '/send_email',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'POST',
                data: data
            }).then(function(res) {
                ClientsDataHandler.createBorrower();
                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function updateClient(clientId, changes) {
            return $http({
                url: baseUrl + '/update/' + clientId,
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'PUT',
                data: changes
            }).then(function(res) {
                ClientsDataHandler.updateBorrower(res.data, changes);
                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function updateClientAdminOptions(clientId, changes) {
            console.log(changes);
            return $http({
                url: baseUrl + '/update_admin_options/' + clientId,
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'PATCH',
                data: changes
            }).then(function(res) {
                ClientsDataHandler.updateBorrower(res.data, changes);

                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function deleteBorrower(borrower) {
            return $http({
                url: baseUrl + '/delete/' + borrower._id,
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'DELETE'
            }).then(function(res) {
                ClientsDataHandler.deleteBorrower(borrower);

                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function removeClientsBatch(borrowerIds) {
            return $http({
                url: baseUrl + '/remove_batch',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'DELETE',
                data: {
                    clientIds: borrowerIds
                }
            }).then(function(res) {
                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function activeAccount(borrower) {
            return $http({
                url: baseUrl + '/bank_account_activations/answer/' + borrower._id,
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'PATCH',
                data: {
                    approved: true
                }
            }).then(function(res) {
                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function approveWithdrawal(borrower) {
            return $http({
                url: baseUrl + '/withdrawals/answer/' + borrower._id,
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'PATCH',
                data: {
                    approved: true
                }
            }).then(function(res) {
                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function handlerOperation(borrower) {
            if (borrower.type == "BankAccountActivation")
                return activeAccount(borrower)
            if (borrower.type == "WithdrawalRequest")
                return approveWithdrawal(borrower)

        }

        function updateBank(changes, clientId, bankId) {

            return $http({
                url: baseUrl + '/bank_accounts' + '/update/' + clientId + '/' + bankId,
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'PUT',
                data: changes
            }).then(function(res) {
                ClientsDataHandler.updateBorrower(res.data, changes);

                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        var service = {
            recuerda:recordarPago,
            sendAll:sendAll,
            getClients: getClients,
            getClient: getClient,
            sendEmail: sendEmail,
            sendEmail2: sendEmail2,
            createBorrower: createBorrower,
            updateClient: updateClient,
            updateClientAdminOptions: updateClientAdminOptions,
            deleteBorrower: deleteBorrower,
            removeClientsBatch: removeClientsBatch,
            handlerOperation: handlerOperation,
            updateBank: updateBank,
            getClientOperations: getClientOperations
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ClientsSvc', ClientsSvc);
})());
