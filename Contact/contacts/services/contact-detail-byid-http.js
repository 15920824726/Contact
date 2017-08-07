/**
 * Created by edw on 2016/7/22.
 */
(
    function(){
        'use strict';

        angular.module('App.contacts').factory('contactDetailByIdHttpService',
            ['$http', function ($http) {

                var service = {};

                service.getContactDetail = function (options) {
                    return $http.post(globals.server + '/businesspartner/main/contact/mobility/getContactDetailById',options);
                };

                return service;
            }]);

    }

)(angular);