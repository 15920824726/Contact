/**
 * Created by edw on 2016/6/24.
 */
(function(angular){
    'use strict';

    var moduleName = 'App.project';
    angular.module(moduleName).factory('projectIconHttpService' ,['$http',function($http){
        var service={};
        service.getIcons = function (options) {
            return $http.post(globals.server + '/businesspartner/main/contact/mobility/loadContactPhoto',options);
        };


        return service;
    }]
    )


})(angular);