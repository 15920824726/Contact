/**
 * Created by edw on 2016/7/27.
 */
(function () {
    'use strict';
    angular.module('App.business.partner').factory('businessImgDataService', ['businessImgHttpService', '$q', function (businessImgHttpService, $q) {
        var service = {};
        service.getImageData = function (options) {
            var defer = $q.defer();
            businessImgHttpService.getImageData(options).then(function (response) {
                try {
                    if (response.status == 200) {
                        defer.resolve(response.data);
                    } else {
                        defer.reject("connect failed");
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

    }])

})(angular);