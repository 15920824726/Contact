/**
 * Created by edw on 2016/7/20.
 */
(function (angular) {
        'use strict';
        angular.module('App.contacts').factory('contactListSummaryService', ['contactListSummaryHttpService', '$q',
            function (contactListSummaryHttpService, $q) {
                var service = {};
                service.getContactListSummary = function (options) {
                    var defer = $q.defer();
                    contactListSummaryHttpService.getContactListSummary(options).then(function (response) {
                        try {
                            //debugger;
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