/**
 * Created by hot on 2016-6-15.
 */
(function (angular) {
    'use strict';

    angular.module('App.setting').controller('settingMainController',
        [
            '$scope',
            '$translate',
            function ($scope,
                      $translate) {
                $scope.setting = {
                    appName: $translate.instant('main.appName')
                };

            }]);
})(angular);