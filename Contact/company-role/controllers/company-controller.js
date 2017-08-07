/**
 * Created by hot on 2016-6-15.
 */
(function (angular) {
    'use strict';

    angular.module('App.companyRole').controller('companyController',
        [
            '$scope',
            '$translate',
            '$state',
            '$stateParams',
            'companyRoleDataService',
            'userInfoDataService',
            '$ionicPopup',
            'userInfo',
            'platformsLocalSessionStorageService',
            function ($scope,
                      $translate,
                      $state,
                      $stateParams,
                      companyRoleDataService,
                      userInfoDataService,
                      $ionicPopup,
                      userInfo,
                      platformsLocalSessionStorageService) {
                $scope.settingStatus = false;
                $scope.companyId = $stateParams.companyId ? parseInt($stateParams.companyId) : null;
                $scope.companies = [];
                $scope.parentCompany = {
                    parentId: null
                };
                var loadingStatus = {
                    companyRoleLoading: true
                };
                var popUp;
                //translate start
                var translatePrefix = 'companyRole.company.';
                $scope.translate = {
                    "companyRole": {
                        "company": {
                            "selectCompany": ""
                        }
                    }
                };
                function refreshTranslation() {
                    for (var item in $scope.translate.companyRole.company) {
                        $scope.translate.companyRole.company[item] = $translate.instant(translatePrefix + item);
                    }
                }

                //translate end

                function getCompanyRoleData() {
                    companyRoleDataService.getHttp().then(function (data) {
                        loadingStatus.companyRoleLoading = false;
                        $scope.companys = data.companies;
                        isLoadDone();
                    }, function () {
                        $scope.companyRole.hideLoading();
                        requestBrokenHandler();
                    });
                }

                function isLoadDone() {
                    if (!loadingStatus.companyRoleLoading) {
                        $scope.companyRole.hideLoading();
                    }
                }

                $scope.GoBack=function(){
                    $state.go("setting.configSetting");
                }

                function requestBrokenHandler() {
                    if (!popUp || (popUp && popUp.$$state.status === 1)) {
                        popUp = $ionicPopup.show({
                            title: 'NetWork Error',
                            scope: $scope,
                            buttons: [
                                {
                                    text: 'Refresh',
                                    type: 'button-positive',
                                    onTap: function () {
                                        popUp.close();
                                        init();
                                    }
                                },
                                {text: 'Cancel'}
                            ]
                        });
                    }
                }

                $scope.classByType = function (rs) {
                    var cls = ['ico-comp-businessunit', 'ico-comp-root', 'ico-comp-profitcenter'], index = 0;
                    if (rs && rs.companyType)
                        index = (rs.companyType - 1) % 3;
                    return cls[index];
                };
                //select company
                $scope.selectCompany = function (record) {
                    //don,t select group
                    if (record.companyType !== 2) {
                        //console.log(record);
                        companyRoleDataService.setCompanySelection(record);
                        window.localStorage.removeItem('companyName');
                        window.localStorage.setItem('companyName',JSON.stringify(record));
                        $scope.selection = {
                            "selectCompany": record
                        };
                        //init roles
                        companyRoleDataService.setRoleData(record);
                        //nav to role
                        $state.go('companyRole.role');
                    }else {
                        $state.go('companyRole.next',{companyId:record.id})
                    }
                };

                function fromSetting() {
                    var status = null;
                    if ($stateParams.data) {
                        status = $stateParams.data.currentStatus ? $stateParams.data.currentStatus : null;
                    }
                    return status;
                };

                $scope.testElement=function(item){
                if(item.children!=null){
                       $state.go('companyRole.next',{companyId:item.id} );
                  //  $state.$location.$href('/next/item.id');

                }else {
                   $scope.selectCompany(item);
                }

                }

                //"companyRole.next"
                function init() {
                    $scope.companyRole.showLoading();
                    refreshTranslation();
                    getCompanyRoleData();
                    //nav to contacts list
                    var status = companyRoleDataService.getSettingCurrentStatus();
                    if (!status || status.currentStatus !== 'setting') {
                    if ($state.current.name !== 'companyRole.reSelect') {
                        var select = companyRoleDataService.checkLocalStore(userInfo);
                        var data = platformsLocalSessionStorageService.getItem('public', companyRoleDataService.getKey(userInfo));
                        if (select) {
                            companyRoleDataService.checkCompanyHttp({
                                signedInClientId: data.signedInClientId,
                                clientId: data.clientId,
                                permissionClientId: data.permissionClientId,
                                roleId: data.roleId
                            }).then(function (isValid) {
                                if (isValid) {
                                    //local store to Context
                                    companyRoleDataService.reStoreContextData();
                                    companyRoleDataService.reSetCompanyAndRoleSelection();
                                    //nav to contact list
                                    $state.go('desktop.contact');
                                }
                            });

                        }
                    }
                    $scope.settingStatus = false;
                    }else{
                        $scope.settingStatus = true;
                    }
                }

                if (!$scope.companyId) {
                    init();
                }
                //next action
                else {
                    var result = companyRoleDataService.getCompanybyId($scope.companyId);
                    $scope.companys = result.children;
                    $scope.translate.companyRole.company.selectCompany = result.code + ' ' + result.name;
                    $scope.parentCompany = result;
                }
                $scope.selection = {
                    "selectCompany": companyRoleDataService.getCompanySelection()
                };
                $scope.$on('$cordovaNetwork:online', function () {
                    init();
                });

            }]);
})(angular);