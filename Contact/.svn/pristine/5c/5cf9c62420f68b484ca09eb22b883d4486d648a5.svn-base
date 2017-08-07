/**
 * Created by edw on 2016/7/25.
 */
(
    function(){
        'use strict';

        angular.module('App.business.partner').factory('bpSummaryDetailHttpService',
            ['$http', function ($http) {

                var service = {};

                service.getBpDetailSummary = function (options) {
                    return $http.post(globals.server + '/businesspartner/main/contact/mobility/getBpDetailById',options);
                };

                return service;
            }]);

    }

)(angular)