/**
 * Created by edw on 2016/7/27.
 */
(function(){
    'use strict';

    angular.module('App.business.partner').factory('bpConactImgHttpService',['$http',function($http){
        var servoce={};

        servoce.getImagData=function(options){
            return   $http.post(globals.server+'/businesspartner/main/contact/mobility/loadContactPhoto',options);
        }

        return servoce;

    }] )

})(angular)