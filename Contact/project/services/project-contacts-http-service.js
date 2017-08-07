/**
 * Created by edw on 2016/6/22.
 */
(function(angular){
    'use strict';

    var moduleName = 'App.project';
    angular.module(moduleName).factory('projectContactsHttpService' ,
        ['$http',function ($http) {
        var service={};
        service.getContacts = function (bpId) {
            return $http.post(globals.server + '/businesspartner/main/contact/mobility/loadContactsByBp',{
                "BpId":bpId
            });
        };


            return service;
    }])


})(angular)