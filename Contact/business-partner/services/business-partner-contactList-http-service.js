/**
 * Created by yar on 6/23/2016.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.business.partner';
    angular.module(moduleName).factory('businessPartnerContactListHttpService',
        ['$http',
            function ($http) {
                var service = {};
                service.getContactListByBusinessPartnerId = function (Id) {
                    //var filterString = 'BusinessPartnerFk=' + Id;
                    return $http.get(globals.server + '/businesspartner/main/contact/list?mainItemId=' + Id);
                };
                service.loadCountriesByFilter=function(options){
                    return $http.post(globals.server + '/businesspartner/main/contact/mobility/loadCountriesByFilter',options);
                };
                return service;
            }]);
})(angular);