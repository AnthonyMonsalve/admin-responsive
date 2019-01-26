((function () {

    'use strict';

    /*@ngInject*/
    function FilterSearchCtrl() {
        var vm = this;

        vm.$onInit = function() {
            vm.searchType = 'content';
            vm.term = vm.filter.query.searchTerm ? vm.filter.query.searchTerm : "";
        };

        function searchTerm(term){
            vm.filter.searchTerm(term);
            vm.getList();
        }

        function clearSearch() {
            vm.term = "";
            vm.filter.searchTerm(vm.term);
            vm.getList();
        }

        function checkEvents(event) {
            if (event.keyCode == 27) {
                clearSearch();
            }
        }

        vm.searchTerm = searchTerm;
        vm.clearSearch = clearSearch;
        vm.checkEvents = checkEvents;
    }

    angular.module('hiraApp')
        .controller('FilterSearchCtrl', FilterSearchCtrl);

})());
