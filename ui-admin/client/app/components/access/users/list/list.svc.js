/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function UsersListSvc(common, UsersSvc, UsersListCache) {
        var $q = common.$q;
        var usersListCache = UsersListCache.getCache();

        function getUsers(forceRemote) {
            if (!forceRemote && usersListCache.dataLoaded) {
                return $q.when(usersListCache);
            }

            return UsersSvc.getUsers().then(function(res){
                usersListCache.set(res.data);

                return usersListCache;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getUsers: getUsers
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('UsersListSvc', UsersListSvc);
})());
