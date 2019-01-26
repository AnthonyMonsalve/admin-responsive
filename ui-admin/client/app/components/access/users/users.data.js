/**
 * Created by daniel on 1/23/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function UsersDataHandler(UserDetailsCluster,
                              UsersListCache) {
        //Private FUNCTIONS
        var userDetailsCluster = UserDetailsCluster.getCluster();
        var usersListCache = UsersListCache.getCache();

        function createUser(){
            usersListCache.clear();
        }

        function updateUser(user,changes) {
            usersListCache.update({_id:user._id}, changes);
            userDetailsCluster.update(user._id, changes);
        }

        function deleteUser(user) {
            usersListCache.remove({_id:user._id});
            userDetailsCluster.remove({_id:user._id});
        }

        var service = {
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('UsersDataHandler', UsersDataHandler);
})());
