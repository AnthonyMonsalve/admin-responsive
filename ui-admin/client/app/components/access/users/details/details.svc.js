/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function UserDetailsSvc(common,
                            UsersSvc,
                            UserDetailsCluster) {
        var $q = common.$q;

        function getUser(forceRemote,userId) {
            var user = null;
            var userDetailsCluster = UserDetailsCluster.getCluster();

            if (userDetailsCluster.dataLoaded) {
                user = userDetailsCluster.get(userId);
            }

            if (!forceRemote && user) {
                return $q.when(user);
            }

            return UsersSvc.getUser(userId).then(function(res){
                if (forceRemote) {
                    user = userDetailsCluster.set({_id:userId},res.data);
                } else {
                    user = userDetailsCluster.push(res.data);
                }

                return user;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getUser: getUser
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('UserDetailsSvc', UserDetailsSvc);
})());
