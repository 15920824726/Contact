/**
 * Created by yar on 7/6/2016.
 */
(function (angular) {
    'use strict';

    angular.module('App.setting').controller('settingConfigController',
        [
            '$scope',
            '$translate',
            '$ionicModal',
            'tokenAuthentication',
            '$state',
            'commonSettingService',
            'platformLogonService',
            'platformTranslateService',
            'platformContextService',
            'userInfoDataService',
            '$stateParams',
            function ($scope,
                      $translate,
                      $ionicModal,
                      tokenAuthentication,
                      $state,
                      commonSettingService,
                      logonService,
                      platformTranslateService,
                      platformContextService,
                      userInfoDataService,
                      $stateParams) {


                var data;
                //$scope.company = '901 ITwo Best Practice';
                $scope.languages = [];
                $scope.setting = {
                    appName: $translate.instant('main.appName')
                };
                //Edwin add
                $scope.image='setting/content/img/contactDefault.png';
                $scope.translate = {
                    "setting": {
                        "title": "",
                        "server": "",
                        "about": "",
                        "logOut": ""
                    },
                    "about": {
                        "appName": "",
                        "company": "",
                        "contact": "",
                        "version": "",
                        "title":""
                    }

                };
                function refreshTranslation() {
                    translateFactory('setting.config.', $scope.translate.setting);
                    translateFactory('setting.about.', $scope.translate.about);

                }

                function translateFactory(translatePrefix, dataSource) {
                    for (var item in dataSource) {
                        dataSource[item] = $translate.instant(translatePrefix + item);
                    }
                }

                function loadTranslations() {
                    //$scope.translate = platformTranslateService.instant({
                    //    setting: ['title', 'server', 'about', 'logOut']
                    //});
                    refreshTranslation();
                    //clear languages
                    $scope.languages.length = 0;
                    //get ui languages
                    $scope.languages = angular.copy(logonService.getUiLanguages());
                    //get default languageId
                    $scope.languageId = platformContextService.getLanguage();

                    $scope.currentLanguage = getCurrentLanguage($scope.languages, $scope.languageId);
                }

                function getCurrentLanguage(languages, languageId) {
                    var len = languages.length,
                        i = 0,
                        item;
                    for (; i < len; i++) {
                        item = languages[i];
                        if (item.language === languageId) {
                            return item.languageName;
                        }
                    }
                }

                $scope.changeLanguage = function (languageId) {
                    if (languageId) {
                        userInfoDataService.changeLanguage(languageId, $scope.languages);
                        $scope.currentLanguage = getCurrentLanguage($scope.languages, languageId);
                    }
                };

                function getService() {
                    $ionicModal.fromTemplateUrl('setting/partials/common-about.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function (modal) {
                        $scope.aboutmodal = modal;
                    });

                    $ionicModal.fromTemplateUrl('setting/partials/common-language.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function (modal) {
                        $scope.languagemodal = modal;
                    });

                    $scope.goToServer = function () {
                        data = {currentStatus: 'setting', server: true};
                        commonSettingService.setSettingCurrentStatus(data);
                        $state.go('setting.configServer',{id:1});
                    };

                    $scope.logOut = function () {
                        localStorage.clear();
                        tokenAuthentication.logout();
                        $state.go('login');
                    };

                    $scope.commonSelectCompany = function () {
                        data = {currentStatus: 'setting'};
                        commonSettingService.setSettingCurrentStatus(data);
                        $state.go('companyRole.reSelect');
                    };
                }

                function initCommonSetting() {
                    data = {currentStatus: ''};
                    commonSettingService.setSettingCurrentStatus(data);
                    commonSettingService.setFromPage($stateParams.data)
                }

                $scope.goBack = function () {
                    var goPage = commonSettingService.getFromPage();
                    $state.go(goPage);
                };

                $scope.app = app;

                function init() {
                    initCommonSetting();
                    $scope.company=JSON.parse(localStorage.getItem("companyName")).name;
                    // register translation changed event
                    platformTranslateService.translationChanged.register(loadTranslations);

                    //userInfoDataService.getUserData();
                    //userInfoDataService.getUserInfo().then(function (response) {
                    //    $scope.loginame = response.LogonName;
                    //    $scope.username = response.UserName;
                    //    console.log('OK');
                    //}, function (error) {
                    //    console.log('error');
                    //});
                    $scope.username=JSON.parse(localStorage.getItem('user')).username;
                    $scope.companyrole=JSON.parse(localStorage.getItem('roleName')).value?JSON.parse(localStorage.getItem('roleName')).value:'UnSelected';


                    loadTranslations();
                    getService();
                }

                init();

                // un-register on destroy
                $scope.$on('$destroy', function () {
                    platformTranslateService.translationChanged.unregister(loadTranslations);
                });

            }]);
})(angular);