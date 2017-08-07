/**
 * Created by edw on 2016/7/27.
 */

(function () {
    'use strict';

    angular.module('App.business.partner').factory('bpContactImgDataService', ['bpConactImgHttpService', '$q', function (bpConactImgHttpService, $q) {
        var servoce = {};
        servoce.getImagData = function (options) {
            var defer = $q.defer();
            bpConactImgHttpService.getImagData(options).then(function (response) {
                    try {
                        if (response.status == 200) {
                            defer.resolve(response.data);
                        }
                        else {
                            defer.reject('connect fail');
                        }
                    } catch (error) {
                        defer.reject(false);
                    }
                }, function () {
                    defer.reject(error);
                }
            );
            return defer.promise;
        };

        return servoce;

    }])

})(angular);