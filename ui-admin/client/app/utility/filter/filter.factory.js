/**
 * Created by daniel on 2/15/17.
 */

((function () {
    'use strict';

    /* @ngInject */
    function FilterFactory() {
        var Filter = function(type) {
            this.query = {};
            this.query.limit = 50;
            this.query.type = type;
            this.paging = {
                current: 1,
                total: 1
            };
        };

        Filter.prototype.sortBy = function sortBy(attr) {
            var self = this;

            if (!self.query.sort) {
                self.query.sort = {};
                self.query.sort[attr] = 1;
            } else {
                if (self.query.sort[attr] === 1) {
                    self.query.sort = {};
                    self.query.sort[attr] = -1;
                } else {
                    self.query.sort = {};
                    self.query.sort[attr] = 1;
                }
            }
        };

        Filter.prototype.filterType = function filterType(type) {
            var self = this;

            if (type != 'public') {
                self.query.type = type;
            } else {
                delete self.query.type;
            }
        };

        Filter.prototype.filterStatus = function filterStatus(status) {
            var self = this;

            if (status != 'none') {
                self.query.status = status;
            } else {
                delete self.query.status;
            }
        };

        Filter.prototype.limitSize = function limitSize(size) {
            var self = this;
            self.query.skip = 0;
            self.query.limit = size;
            self.paging.current = 1;
        };

        Filter.prototype.searchTerm = function searchTerm(text){
            var self = this;
            if (!text) {
                delete self.query.searchTerm;
                return;
            }
            self.query.searchTerm = text;
        };

        Filter.prototype.setTotalPages = function setTotalPages(count) {
            var self = this;
            var div = Math.floor(count/self.query.limit);
            var rem = count % self.query.limit;
            if ((rem > 0) || (div == 0)) {
                div += 1;
            }
            self.paging.total = div;
        };

        Filter.prototype.getPage = function getPage(side) {
            var self = this;
            if (side === 'next') {
                self.query.skip = self.paging.current * self.query.limit;
                self.paging.current += 1;
            } else if (side === 'previous') {
                self.paging.current -= 1;
                self.query.skip = (self.paging.current - 1) * self.query.limit;
            }
        };

        return Filter;
    }

    angular
        .module('hiraApp.core')
        .factory('FilterFactory', FilterFactory);

})());



