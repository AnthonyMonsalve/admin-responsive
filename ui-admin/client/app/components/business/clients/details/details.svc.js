/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ClientDetailsSvc(localStorageService,common, ClientsSvc, ClientsDetailsCluster,Connections,$cookies) {
        var $q = common.$q;
        var $http = common.$http;

        var storage = localStorageService;
        var borrowerDetailsCluster = ClientsDetailsCluster.getCluster();
        var baseUrl = Connections.getBusinessServer() + '/business/clients';
        var baseAcUrl = Connections.getAccessServer()

        function setSocio(data){
            return $http({
                method:'POST',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                url: baseUrl+'/setpartner',
                data: data
            })
        }

        function deleteSocio(data){
            return $http({
                method:'DELETE',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                url: baseUrl+'/setpartner',
                data: data
            })
        }

        function setAccess(Data){
            return $http({
                method: 'PATCH',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                url: baseAcUrl+'/access/users/blockAccess',
                data: Data
            })
        }

        function setSimple(Data){
            return $http({
                method: 'PUT',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                url: baseUrl+'/update/' + Data.id,
                data: {'simple':Data.simple}
            })
        }

        function setRoles(roles){
            return $http({
                method: 'POST',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                url: baseUrl+'/setRoles',
                data: roles
            })
        }

        function getSons(mom=''){
            return $http({
                url: baseUrl + '/showsons',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET',
                params:{'mom':mom}
            })
        }

        function createSon(data){
            return $http({
                url: baseUrl + '/createson',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'POST',
                data:data
            })
        }
        function deleteSon(data){
            return $http({
                url: baseUrl + '/deleteson',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'POST',
                data:data
            })
        }

        function getClient(forceRemote,borrowerId) {
            var borrower = null;

            return ClientsSvc.getClient(borrowerId).then(function(res){
                
                return res;
            }).catch(function(err){
                throw err;
            });
        }
        function getClientReco(forceRemote,borrowerId) {
            var borrower = null;

            if (borrowerDetailsCluster.dataLoaded) {
                borrower = borrowerDetailsCluster.get(borrowerId);
            }

            if (!forceRemote && borrower) {
                return $q.when(borrower);
            }

            return ClientsSvc.getClientReco(borrowerId).then(function(res){
                if (forceRemote) {
                    borrower = borrowerDetailsCluster.set(borrowerId,res.data);
                } else {
                    borrower = borrowerDetailsCluster.push(res.data);
                }

                return borrower;
            }).catch(function(err){
                throw err;
            });
        }

        function deleteBorrowerContacts(borrowerId,contactIds){
            borrowerDetailsCluster.removeSubdocs(borrowerId,{contacts:{_id:contactIds}});
        }

        var service = {
            setSocio: setSocio,
            deleteSocio: deleteSocio,
            getClient: getClient,
            getClientReco: getClientReco,
            deleteBorrowerContacts: deleteBorrowerContacts,
            getSons:getSons,
            createSon:createSon,
            deleteSon:deleteSon,
            setRoles:setRoles,
            setSimple,
            setAccess
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ClientDetailsSvc', ClientDetailsSvc);
})());
