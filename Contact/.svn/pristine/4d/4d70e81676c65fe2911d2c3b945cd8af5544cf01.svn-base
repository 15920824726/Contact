/**
 * Created by edw on 2016/7/20.
 */
(
    function(){
        'use strict';

        angular.module('App.contacts').factory('contactListSummaryHttpService',
            ['$http', function ($http) {

                var service = {};

                service.getContactListSummary = function (options) {
                    return $http.post(globals.server + '/businesspartner/main/contact/mobility/getContactSummaryItems',options);
                };

                return service;
            }]);

    }

)(angular);