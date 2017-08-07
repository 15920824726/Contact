/**
 * Created by edw on 2016/7/26.
 */
(function (angular) {
    'use strict';
    angular.module('App.business.partner').factory('bpSummaryContactsDataService', ['bpSummaryContactsHttpService', '$q',
        function (bpSummaryContactsHttpService, $q) {
            var service = {};
            service.getBpContactsSummary = function (options) {
                var defer = $q.defer();
                bpSummaryContactsHttpService.getBpContactsSummary(options).then(function (response) {
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