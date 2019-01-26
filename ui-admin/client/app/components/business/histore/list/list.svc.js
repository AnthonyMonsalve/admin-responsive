((function() {
    'use strict';

    /*@ngInject*/
    function histoReListSvc(common,
        FilterFactory,
        localStorageService,
        HistoReSvc,
        Connections,
        HistoReListCache, $cookies) {
            var $http = common.$http;
        var storage = localStorageService;
        var baseUrl = Connections.getBusinessServer() + '/business/clients';
        var baseUrlOp = Connections.getBusinessServer() + '/business/operations';
        var baseUrlRe = Connections.getBusinessServer() + '/business/requests';
        var $q = common.$q;
        var cache =HistoReListCache.getCache();
        var filter = new FilterFactory();

        function getRequest(forceRemote) {
            if (!forceRemote && cache.dataLoaded) {
                return $q.when(cache);
            }
            console.log(filter.query);
            return HistoReSvc.RequestList(filter.query).then(function(res) {
                
                cache.set(res.data);
                count().then((res1)=>{console.log(res1.data);filter.setTotalPages(res1.data)})
                

                return cache;
            }).catch(function(err) {
                throw err;
            });
        }

        function count(){
            return $http({
                url: baseUrlRe + '/count',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET'
            })
        }

        function getFilter() {
            return filter;
        }

        var service = {
            getRequest: getRequest,
            getFilter: getFilter
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('histoReListSvc', histoReListSvc);
})());