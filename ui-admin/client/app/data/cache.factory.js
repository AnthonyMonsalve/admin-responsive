/**
 * Created by daniel on 1/25/17.
 */

((function () {
    'use strict';

    /* @ngInject */
    function CacheFactory(common) {
        var Cache = function(dataType) {
            this.dataLoaded = false;
            this.dataType = dataType;
            this.identifier = "";

            if (this.dataType == 'array') {
                this.data = []
            } else {
                this.data = {}
            }
        };

        Cache.prototype.clear = function() {
            var self = this;
            self.dataLoaded = false;
            self.identifier = "";

            if (self.dataType == 'array') {
                self.data = []
            } else {
                self.data = {}
            }
        };

        Cache.prototype.get = function() {
            var self = this;
            return self.data;
        };

        Cache.prototype.set = function(data,identifier) {
            var self = this;

            self.data = data;
            self.identifier = identifier;
            self.dataLoaded = true;
            return true;
        };

        Cache.prototype.update = function(cond,data,populate) {
            var self = this;

            if (!self.dataLoaded) {
                return false;
            }

            if (self.dataType != 'array') {
                self.data = $.extend(true,self.data,data);
                return true;
            }

            var key = Object.keys(cond)[0];
            var value = cond[key];

            for (var i = 0; i < self.data.length; i++) {
                if (common.byString(self.data[i],key) == value) {
                    if (populate) {
                        if (!self.data[i][populate]) {
                            return false;
                        }
                        self.data[i][populate] = $.extend(true,self.data[i][populate],data);
                        return true;
                    }

                    self.data[i] = $.extend(true,self.data[i],data);
                    return true;
                }
            }

            return false;
        };

        Cache.prototype.remove = function(cond) {
            var self = this;

            if (!self.dataLoaded) {
                return false;
            }

            if (self.dataType != 'array') {
                self.data = {};
                return true;
            }

            var key = Object.keys(cond)[0];
            var value = cond[key];

            for (var i = 0; i < self.data.length; i++) {
                if (common.byString(self.data[i],key) == value) {
                    self.data.splice(i,1);
                    if (self.data.length == 0) {
                        self.clear();
                    }
                    return true;
                }
            }

            return false;
        };

        Cache.prototype.removeBatch = function(cond) {
            var self = this;

            if (!self.dataLoaded) {
                return false;
            }

            if (self.dataType != 'array') {
                self.data = {};
                return true;
            }

            var key = Object.keys(cond)[0];
            var value = cond[key];
            var newData = [];

            for (var i = 0; i < self.data.length; i++) {
                if (common.byString(self.data[i],key) == value) {
                    continue;
                }
                newData.push(self.data[i]);
            }

            if (newData.length == 0) {
                self.clear();
            }

            self.data = newData;
            return false;
        };

        return Cache;
    }

    angular
        .module('hiraApp.core')
        .factory('CacheFactory', CacheFactory);

})());
