/**
 * Created by edw on 2016/6/21.
 */
(function (angular) {
    'use strict';
    angular.module('App.project').factory('projectListDataService', ['projectListHttpService', '$q',
        function (projectListHttpService, $q) {
            var service = {};
            service.getProjectList = function (options) {
                var defer = $q.defer();
                projectListHttpService.getProjectList(options).then(function (response) {
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

            service.getProjectDetail = function (projectId) {
                var defer = $q.defer();
                projectListHttpService.getProjectDetail(projectId).then(function (response) {
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