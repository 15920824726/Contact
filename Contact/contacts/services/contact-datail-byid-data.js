/**
 * Created by edw on 2016/7/22.
 */
(function (angular) {
        'use strict';
        angular.module('App.contacts').factory('contactDetailSummaryService', ['contactDetailByIdHttpService', '$q',
            function (contactDetailByIdHttpService, $q) {
                var service = {};
                service.getContactDetail = function (options) {
                    var defer = $q.defer();
                    contactDetailByIdHttpService.getContactDetail(options).then(function (response) {
                        try {
                            if (response.status === 200) {
                                defer.resolve(response.data);
                            } else {
                                defer.reject('connect fail');
                            }
                        } catch (error) {
                            defer.reject(false);
                        }
                    }, function (error) {
                        defer.reject(error);
                    });
                    return defer.promise;
                };

                return service;

            }]
        );

    })(angular);