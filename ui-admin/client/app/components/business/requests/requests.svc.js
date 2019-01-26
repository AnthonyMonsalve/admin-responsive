/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RequestsSvc(common,localStorageService, RequestsDataHandler, Connections,$cookies) {
        var $http = common.$http;
        var storage = localStorageService
        var baseUrl = Connections.getBusinessServer() + '/business/requests';
        //var baseUrl = 'http://172.17.0.3:5006/access/borrowers';


        function getRequest(borrowerId) {
            return $http({
                url: baseUrl + '/show/' + borrowerId,
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET'
            }).then(function(res){
                console.log(res);
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function getClient(clientId) {
            return $http({
                url: Connections.getBusinessServer() + '/business/clients' + '/show/' + clientId,
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }        

        function getRequests(query) {
            return $http({
                url: baseUrl + '/list',
                method: 'GET',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                params: query,
                Authorization: $cookies.get('token')
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function createBorrower(borrower) {
            return $http({
                url: baseUrl + '/create',
                method: 'POST',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                data: borrower
            }).then(function(res){
                RequestsDataHandler.createBorrower();

                return res.data;
            }).catch(function(err){
                throw err;
            });
        }

        function updateBorrower(borrowerId,changes) {
            return $http({
                url: baseUrl + '/update/' + borrowerId,
                method: 'PUT',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                data: changes
            }).then(function (res) {
                RequestsDataHandler.updateBorrower(res.data,changes);

                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        function deleteBorrower(borrower) {
            return $http({
                url: baseUrl + '/delete/' + borrower._id,
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'DELETE'
            }).then(function (res) {
                RequestsDataHandler.deleteBorrower(borrower);

                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        function removeBorrowersBatch(borrowerIds) {
            return $http({
                url: baseUrl + '/remove_batch',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'DELETE',
                data: {
                    requestIds: borrowerIds
                }
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        function handleActivation(request,isApproved) {
            return $http({
                url: baseUrl + '/bank_account_activations/answer/' + request._id,
                method: 'PATCH',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                data: {
                    approved: isApproved
                }
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        function handleWithdrawal(request,isApproved) {
            return $http({
                url: baseUrl + '/withdrawals/answer/' + request._id,
                method: 'PATCH',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                data: {
                    approved: isApproved
                }
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }    

        function handlerRecharge(request,isApproved,pago=false) {
            return $http({
                url: baseUrl + '/recharges/answer/' + request._id,
                method: 'PATCH',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                data: {
                    approved: isApproved,
                    pago :pago
                }
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                throw err;
            });
        } 

        function handlerContact(request,isApproved) {
            return $http({
                url: baseUrl + '/contact_us/answer/' + request._id,
                method: 'PATCH',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                data: {
                    approved: isApproved
                }
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }                    

        
 
        function handlerOperation(borrower) {
            if (borrower.type == "BankAccountActivation")
                return activeAccount(borrower)
            if (borrower.type == "WithdrawalRequest")
                return handleWithdrawal(borrower,true)

        }


        var service = {
            getRequests: getRequests,
            getRequest: getRequest,
            createBorrower: createBorrower,
            updateBorrower: updateBorrower,
            deleteBorrower: deleteBorrower,
            removeBorrowersBatch: removeBorrowersBatch,
            getClient: getClient,
            handlerOperation: handlerOperation,
            handleWithdrawal: handleWithdrawal,
            handleActivation: handleActivation,
            handlerRecharge: handlerRecharge,
            handlerContact: handlerContact
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('RequestsSvc', RequestsSvc);
})());
