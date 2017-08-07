/**
 * Created by edw on 2016/6/21.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.project';
    angular.module(moduleName).factory('projectListHttpService',
        ['$http',function ($http) {

            var service = {};

            service.getProjectList = function (options) {
                //debugger;
                return $http.post(globals.server + '/businesspartner/main/contact/mobility/getProjectSummaryItems',{
                    "FilterRequest":options
                });
            };

            service.getProjectDetail=function (projectId) {
                return $http.post(globals.server + '/businesspartner/main/contact/mobility/getProjectSummaryItems',{
                    "ProjectId":projectId
                });
            };

            return service;
        }]);
})(angular);