/**
 * Created by hot on 2016-6-15.
 */
(function (angular) {
    'use strict';

    angular.module('App.companyRole').controller('roleController',
        [
            '$scope',
            '$translate',
            '$state',
            'companyRoleDataService',
            '$location',
            '$window',
            '$ionicPopup',
            '$ionicHistory',
            'platformsLocalSessionStorageService',
            function ($scope,
                      $translate,
                      $state,
                      companyRoleDataService,
                      $location,
                      $window,
                      $ionicPopup,
                      $ionicHistory,
                      platformsLocalSessionStorageService) {

                //translate start
                var translatePrefix = 'companyRole.role.';
                $scope.translate = {
                    "companyRole": {
                        "role": {
                            "selectRole": ""
                        }
                    }
                };
                function refreshTranslation() {
                    for (var item in $scope.translate.companyRole.role) {
                        $scope.translate.companyRole.role[item] = $translate.instant(translatePrefix + item);
                    }
                }

                //translate end

                function init() {
                    //$scope.report.showLoading();
                    refreshTranslation();
                }

                init();

                //init selection
                $scope.selection = {
                    "selectRole": companyRoleDataService.getRoleSelection()
                };

                $scope.roles = companyRoleDataService.getRoleData();

                function saveCompanyAndRoleConfig() {
                    var companyRecord = companyRoleDataService.getCompanySelection(),
                        roleRecord = companyRoleDataService.getRoleSelection();
                    if (!companyRecord || !roleRecord) {
                        return;
                    }
                    //save
                    companyRoleDataService.saveContextData();

                }

                $scope.selectRole = function (record) {
                    companyRoleDataService.setRoleSelection(record);
                    saveCompanyAndRoleConfig();
                    $scope.selection = {
                        "selectRole": record
                    };
                    window.localStorage.removeItem('roleName');
                    window.localStorage.setItem('roleName',JSON.stringify(record));
                    //nav to contacts
                    var status = companyRoleDataService.getSettingCurrentStatus();
                    if (status && status.currentStatus === 'setting') {
                        if (status.server) {
                            $state.go('desktop.contact');
                            return;
                        }
                        $state.go('setting.configSetting');
                        return;
                    }
                    $state.go('desktop.contact');
                };
                $scope.$on('$cordovaNetwork:online', function () {
                    init();
                });

            }]);
})(angular);