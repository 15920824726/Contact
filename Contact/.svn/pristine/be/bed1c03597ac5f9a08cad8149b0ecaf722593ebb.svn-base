/**
 * Created by edw on 2016/7/4.
 */
(function () {
    'use strict';

    angular.module('App.common').factory('commonSettingService', [function () {
        var service = {},
            currentSattus,
            fromPage;

        service.setSettingCurrentStatus = function (status) {
            currentSattus = status;
        };

        service.getSettingCurrentStatus = function () {
            return currentSattus;
        };

        service.setFromPage = function (status) {
            if (status) {
                fromPage = status.from;
            }
        };

        service.getFromPage = function () {
            return fromPage;
        };
        return service;
    }])


})(angular);