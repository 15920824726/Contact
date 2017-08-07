/**
 * Created by edw on 2016/6/24.
 */
(function(angular){
        'use strict';
        angular.module('App.project').factory('projectIconDataService',['projectIconHttpService','$q',
            function(projectIconHttpService,$q){
                var service={};
                service.getIcons = function (options) {
                    var defer = $q.defer();
                    projectIconHttpService.getIcons(options).then(function (response) {
                        try{
                            if (response.status === 200)  {
                                defer.resolve(response.data);
                            } else {
                                defer.reject('connect fail');
                            }
                        }catch (error){
                            defer.reject(false);
                        }

                    }, function (error) {
                        defer.reject(error);
                    });
                    return defer.promise;
                };

                return service;

            } ]
        );

    }
)(angular);