/**
 * Created by edw on 2016/7/25.
 */
(
    function(){
        'use strict';

        angular.module('App.business.partner').factory('bpSummaryLiatHttpService',
            ['$http', function ($http) {

                var service = {};

                service.getBpListSummary = function (options) {
                    return $http.post(globals.server + '/businesspartner/main/contact/mobility/getBpSummaryItems',options);
                };

                return service;
            }]);

    }

)(angular)