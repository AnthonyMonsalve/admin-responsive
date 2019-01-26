((function() {

    'use strict';

    /*@ngInject*/
    function BusinessFastCtrl(common, Auth) {
        var vm = this;

        vm.$state = common.$state;
        vm.refresh = ()=>{
            Auth.refreshToken()
        }
        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/

        activate();

    }

    angular.module('hiraApp.layout.content.pages.business')
        .controller('ProDataCtrl', BusinessFastCtrl);

})());