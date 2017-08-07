/**
 * Created by edw on 2016/7/26.
 */
(
    function(){
        'use strict';

        angular.module('App.business.partner').factory('bpSummaryContactsHttpService',
            ['$http', function ($http) {

                var service = {};

                service.getBpContactsSummary = function (options) {
                    return $http.post(globals.server + '/businesspartner/main/contact/mobility/loadContactsByBp',options);
                };

                return service;
            }]);

    }

)(angular)