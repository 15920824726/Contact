/**
 * Created by edw on 2016/7/25.
 */
(function (angular) {
        'use strict';
        angular.module('App.business.partner').factory('bpSummaryDetailDataService', ['bpSummaryDetailHttpService', '$q',
            function (bpSummaryDetailHttpService, $q) {
                var service = {};
                service.getBpDetailSummary = function (options) {
                    var defer = $q.defer();
                    bpSummaryDetailHttpService.getBpDetailSummary(options).then(function (response) {
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