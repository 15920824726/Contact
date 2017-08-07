/**
 * Created by yar on 6/23/2016.
 */
(function () {
    'use strict';
    angular.module('App.common').factory('commonBusinessPartnerDataService',
        ['CommonDataService',
            function (CommonDataService) {
                var service = new CommonDataService();
                var totalRecords = 0;
                var companies = {};
                var parrent,bpname;

                service.setTotalRecords = function (data) {
                    totalRecords = data;
                };

                service.getTotalRecords = function () {
                    return totalRecords;
                };


                service.setCompanies = function (data) {
                    companies = data;
                };

                service.getCompanies = function () {
                    return companies;
                };

                service.setTotalRecords = function (data) {
                    totalRecords = data;
                };

                service.getTotalRecords = function () {
                    return totalRecords;
                };

                service.setParrent=function(data){
                    parrent=data;
                }

                service.returnParrent=function(){
                    return parrent;
                }


                service.setBpName=function(tempname){
                    bpname=tempname;
                }

                service.returnBpName=function(){
                    return bpname;
                }


                return service;
            }
        ]);

})(angular);