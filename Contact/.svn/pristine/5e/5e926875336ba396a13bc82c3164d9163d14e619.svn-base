/**
 * Created by yar on 6/23/2016.
 */
(function () {
    'use strict'

    var moduleName = 'App.business.partner';
    angular. module(moduleName).factory('businessPartnerHttpService',
        ['$http',
            function ($http) {
                var service = {};

                service.getBusinessPartnerList = function (options) {
                    return $http.post(globals.server + '/businesspartner/main/businesspartner/list',options
                    );
                };

                return service;
            }])
})(angular);