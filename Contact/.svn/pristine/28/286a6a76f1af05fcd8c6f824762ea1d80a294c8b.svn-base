/**
 * Created by yar on 6/17/2016.
 */
(function () {
    'use strict';
    angular.module('App.common').factory('commonContactlistDataService',
        ['CommonDataService',
            function (CommonDataService) {
                var service = new CommonDataService();
                var totalRecords = 0;
                var parrent;

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


                return service;
            }
        ]);

})(angular);