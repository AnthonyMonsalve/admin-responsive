/**
 * Created by daniel on 1/25/17.
 */

((function () {
    'use strict';

    /* @ngInject */
    function ClusterFactory() {
        var Node = function(data) {
            this.hits = 1;
            this.data = data;
        };

        var Cluster = function(clusterSize) {
            this.dataLoaded = false;
            this.numNodes = 0;
            this.container = {};
            this.maxSize = clusterSize;
        };

        Cluster.prototype.clear = function() {
            var self = this;

            self.dataLoaded = false;
            self.numNodes = 0;
            self.container = {};
        };

        Cluster.prototype.get = function(id) {
            var self = this;
            if (self.container[id]) {
                self.container[id].hits += 1;
                return self.container[id];
            }

            return false;
        };

        Cluster.prototype.set = function(id,data) {
            var self = this;
            self.dataLoaded = true;

            if (self.container[id]) {
                self.container[id].data = $.extend(true,self.container[id].data,data);
                return self.container[id];
            }

            return self.push(data);
        };

        Cluster.prototype.push = function(data) {
            var self = this;
            var node = new Node(data);
            self.dataLoaded = true;

            //Check space available
            if (self.numNodes < self.maxSize) {
                self.container[data._id] = node;
                self.numNodes += 1;
                return self.container[data._id];
            }

            //Look for less used space.
            var lessUsed = data._id;
            var min, hits;

            for (var key in self.container) {
                hits = self.container[key].hits;

                if (!min || (hits < min)) {
                    min = hits;
                    lessUsed = key;
                }
            }

            self.container[lessUsed] = node;
            return self.container[lessUsed];
        };

        Cluster.prototype.update = function(cond,changes) {
            var self = this;

            if (typeof cond === 'string' || cond instanceof String) {
                self.container[cond].data = $.extend(true,self.container[cond].data,changes);
                return self.container[cond];
            }

            var key = Object.keys(cond)[0];
            var value = cond[key];

            for (var id in self.container) {
                if (self.container[id].data[key] == value) {
                    self.container[id].data = $.extend(true,self.container[id].data,changes);
                    return self.container[id];
                }
            }

            return false;
        };

        Cluster.prototype.remove = function(cond) {
            var self = this;

            if (typeof cond === 'string' || cond instanceof String) {
                if (!self.container[cond]) {
                    return false;
                }

                delete self.container[cond];
                self.numNodes -= 1;
                return true;
            }

            var key = Object.keys(cond)[0];
            var value = cond[key];

            for (var id in self.container) {
                if (self.container[id].data[key] == value) {
                    delete self.container[id];
                    self.numNodes -= 1;

                    if (self.numNodes == 0) {
                        self.clear();
                    }

                    return true;
                }
            }

            return false;
        };

        Cluster.prototype.removeBatch = function(cond) {
            var self = this;

            if (typeof cond === 'string' || cond instanceof String) {
                if (!self.container[cond]) {
                    return false;
                }

                delete self.container[cond];
                return true;
            }

            var key = Object.keys(cond)[0];
            var value = cond[key];

            var newData = {};

            for (var id in self.container) {
                if (self.container[id].data[key] == value) {
                    self.numNodes -= 1;
                    continue;
                }
                newData[id] = self.container[id];
            }

            if (self.numNodes == 0) {
                self.clear();
                return;
            }

            self.container = newData;
            self.numNodes = Object.keys(newData).length;
        };

        Cluster.prototype.removeSubdocs = function(id,cond) {
            var self = this;
            var node = self.container[id].data;

            var key = Object.keys(cond)[0];
            var value = cond[key];

            var subKey = Object.keys(value)[0];
            var subValue = value[subKey];

            var subdocs = [];

            for (var i = 0; i < node[key].length; i++) {
                if (subValue.indexOf(node[key][i]._id) != (-1)) {
                    self.numNodes -= 1;
                    continue;
                }

                subdocs.push(node[key][i]);
            }

            self.container[id].data[key] = subdocs;
        };

        return Cluster;
    }

    angular
        .module('hiraApp.core')
        .factory('ClusterFactory', ClusterFactory);

})());
