/**
 * Created by yar on 6/23/2016.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.business.partner';
    angular.module(moduleName).factory('businessPartnerDetailHttpService',
        ['$http',
            function ($http) {
                var service = {};

                service.getBlobByBusinessPartnerId = function (Id) {
                    //var filterString = 'BusinessPartnerFk=' + Id;
                    return $http.get(globals.server + '/businesspartner/main/photo/list?mainItemId=' + Id);
                };
                return service;
            }]);
})(angular);
