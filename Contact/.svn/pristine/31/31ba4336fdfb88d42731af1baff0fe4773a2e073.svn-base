/**
 * Created by rei on 16.01.2015.
 */
/* globals app */

(function () {
    'use strict';

    /**
     @ngdoc controller
     * @name platformLoginDialogController
     * @function
     *
     * @description
     * Controller for Login dialog.
     */
    angular.module('App.userInfo').controller('platformLoginController',
        [
            '$scope',
            'appBaseDataService',
            'platformsDesService',
            'platformsLocalSessionStorageService',
            '_',
            'platformContextService',
            'platformTranslateService',
            '$timeout',
            'platformLogonService',
            '$state',
            '$ionicLoading',
            'userInfoDataService',
            'commonSettingService',
            '$rootScope',
            '$ionicPopup',
            function ($scope,
                      appBaseDataService,
                      platformsDesService,
                      platformsLocalSessionStorageService,
                      _,
                      platformContextService,
                      platformTranslateService,
                      $timeout,
                      logonService,
                      $state,
                      $ionicLoading,
                      userInfoDataService,
                      commonSettingService,
                      $rootScope,
                      $ionicPopup) { // jshint ignore:line

                var errorTimer = null; // holds running timer promise

                $scope.languages = [];
                // selected value, default 'en'
                $scope.languageId = platformContextService.getDefaultLanguage();

                // object holding translated strings
                $scope.text = {};

                $scope.feedback = {};
                $scope.loginData = {
                    username: null,
                    password: null,
                    status:false
                };
                $scope.isRemember = true;

                $scope.changeLanguage = function changeLanguage(languageId) {
                    userInfoDataService.changeLanguage(languageId, $scope.languages);
                };

                $scope.checkboxAction = function () {
                    $scope.isRemember = !$scope.isRemember;
                };
                $scope.checkInput = function () {
                    if (isUserPasswordValid()) {
                        return '';
                    }
                    else {
                        return 'button-disable';
                    }
                };

                function serverConnectFalse() {
                    $ionicLoading.hide();
                    var serverConnectAlert = $ionicPopup.alert({
                        title: 'Server Connect Fail',
                        template:'please check your server.'
                    });
                    //serverConnectAlert.close();
                     $timeout(function () {
                         serverConnectAlert.close();
                    }, 3000);
                }

                /*
                 called when Login Button is pressed, or Enter Key
                 */
                $scope.login = function () {
                    commonSettingService.setSettingCurrentStatus(null);
                    if (isUserPasswordValid()) {
                        $scope.feedback = {
                            show: true,
                            message: $scope.translate.login.loginBusyMessage,
                            alertClass: 'alert-info'
                        };
                        $ionicLoading.show();
                        try {
                            userInfoDataService.login($scope.loginData.username, $scope.loginData.password).then(
                                function (response) {
                                    $ionicLoading.hide();
                                    // remove eventually running error feedback timer
                                    if (response) {
                                        $scope.$on('serverInvalid', function (e) {
                                            if(!$scope.loginData.status){
                                                console.log(e);
                                                //alert('sss');
                                                serverConnectFalse();
                                                $scope.loginData.status=true;
                                            }
                                            $timeout(function(){
                                                $scope.loginData.status=false;
                                            },600);
                                        });
                                        if (errorTimer) {
                                            $timeout.cancel(errorTimer);
                                        }
                                        $scope.feedback = {
                                            show: true,
                                            message: $scope.translate.login.loginSuccessfulMessage,
                                            alertClass: 'alert-info'
                                        };
                                        onLogonSuccess(response);
                                    } else {
                                        onLoginError();
                                    }
                                },
                                function () {
                                    onLoginError();
                                });
                        } catch (error) {
                            onLoginError();
                        }
                    }

                };

                //enter key and trigger login
                $scope.loginKeyDown = function (event) {
                    if (event.keyCode === 13) {
                        $scope.login();
                    }
                };

                $scope.serverConfig = function () {
                    $state.go('setting.configServer');
                };

                function init() {

                    // register translation changed event
                    platformTranslateService.translationChanged.register(loadTranslations);

                    // register a module - translation table will be reloaded if module isn't available yet
                    if (!platformTranslateService.registerModule('user-info')) {
                        // if translation is already available, call loadTranslation directly
                        loadTranslations();
                    }
                    //var status = commonSettingService.getSettingCurrentStatus();
                    //alert(status);
                    //appBaseDataService.initController($scope);
                    //fill username and password
                    var lastLoginInfo = userInfoDataService.getLoginUserInfo();
                    if (lastLoginInfo) {
                        $scope.loginData = lastLoginInfo;
                    }
                    //check server config
                    userInfoDataService.checkServerConfig();
                    //check login
                    appBaseDataService.checkLogin('companyRole.company');
                    //var status = commonSettingService.getSettingCurrentStatus();
                    //alert(status.currentStatus);

                }

                // loads or updates translated strings
                function loadTranslations() {
                    $scope.translate = platformTranslateService.instant({
                        login: ['loginLanguage', 'loginPassword', 'loginUsername', 'loginButton',
                            'loginEnterPassword', 'loginEnterUsername', 'loginBusyMessage', 'loginFailedMessage',
                            'loginSuccessfulMessage', 'remember', 'appName', 'serverConfig', 'settings', 'continue']
                    });

                    //clear languages
                    $scope.languages.length = 0;
                    //get ui languages
                    $scope.languages = angular.copy(logonService.getUiLanguages());
                    //get default languageId
                    $scope.languageId = platformContextService.getLanguage() || platformContextService.getDefaultLanguage();



                }

                function isUserPasswordValid() {
                    return !(!$scope.loginData.username || !$scope.loginData.password || ($scope.loginData.username.length === 0) || ($scope.loginData.password.length === 0));
                }

                function onLogonSuccess() {
                    isRememberHandler();

                    $state.go('companyRole.company');
                    //app.navigateTo('company'); // jshint ignore:line
                }


                function isRememberHandler() {
                    if ($scope.isRemember) {
                        userInfoDataService.saveLoginUserInfo($scope.loginData.username, $scope.loginData.password);
                    } else {
                        userInfoDataService.removeLoginUserInfo();
                    }
                }

                function onLoginError() {

                    $scope.feedback = {
                        show: true,
                        message: $scope.translate.login.loginFailedMessage,
                        alertClass: 'alert-danger'
                    };

                    $ionicLoading.hide();
                    // remove feedback after 5 sec
                    errorTimer = $timeout(function () {
                        $scope.feedback.show = false;
                        errorTimer = null;
                    }, 115000, true);
                }

                init();

                // un-register on destroy
                $scope.$on('$destroy', function () {
                    platformTranslateService.translationChanged.unregister(loadTranslations);
                });

            }]);
})();
