/**
 * Created by edw on 2016/6/22.
 */
(function (angular) {
        'use strict';
        angular.module('App.project').factory('projectContactsDataService', ['projectContactsHttpService', '$q',
            function (projectContactsHttpService, $q) {
                var service = {};
                service.getContacts = function (bpId) {
                    var defer = $q.defer();
                    projectContactsHttpService.getContacts(bpId).then(function (response) {
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