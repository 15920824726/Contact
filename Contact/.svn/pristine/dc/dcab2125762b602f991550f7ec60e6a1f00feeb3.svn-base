/**
 * Created by edw on 2016/7/27.
 */
(function(){
    'use strict';
    angular.module('App.business.partner').factory('businessImgHttpService',['$http',function($http){
        var service={};
        service.getImageData=function(options){
            return $http.post( globals.server+'/businesspartner/main/contact/mobility/loadBpPhoto',options);
        }

        return service;

    }])

})(angular);