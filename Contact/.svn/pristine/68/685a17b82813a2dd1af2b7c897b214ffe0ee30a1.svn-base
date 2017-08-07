/**
 * Created by hot on 2016-6-15.
 */
(function (angular) {
    'use strict';

    angular.module('App.setting').controller('settingServerConfigController',
        [
            '$scope',
            '$translate',
            '$state',
            '$location',
            '$window',
            '$ionicPopup',
            '$ionicHistory',
            'platformsLocalSessionStorageService',
            'commonSettingService',
            'tokenAuthentication','$stateParams',
            function ($scope,
                      $translate,
                      $state,
                      $location,
                      $window,
                      $ionicPopup,
                      $ionicHistory,
                      platformsLocalSessionStorageService,
                      commonSettingService,
                      tokenAuthentication,$stateParams
                      ) {

                var oldServer, oldAuthenticationServer;
                $scope.testId=false;
                //translate start
                var translatePrefix = 'setting.config.';
                $scope.translate = {
                    "setting": {
                        "config": {
                            "appServer": "",
                            "authenticationServer": "",
                            "apply": ""
                        }
                    }
                };
                $scope.settingShow = false;

                function refreshTranslation() {
                    for (var item in $scope.translate.setting.config) {
                        $scope.translate.setting.config[item] = $translate.instant(translatePrefix + item);
                    }
                }

                //translate end

                function initServerSetting() {
                    //debugger;
                    var authenticationServer = platformsLocalSessionStorageService.getItem('public', globals.getIdentityServerKey()); // token
                    var server = platformsLocalSessionStorageService.getItem('public', globals.getServerKey());
                    $scope.setting = {};
                    $scope.setting.server = server ? server : globals.server;
                    $scope.setting.authenticationServer =authenticationServer ? authenticationServer : globals.identityServer;
                }

                function initSetting(){
                    var data = {};
                    commonSettingService.setSettingCurrentStatus(data);
                }

                $scope.apply = function () {
                    getSettingStatus(true);
                    platformsLocalSessionStorageService.setItem('public', globals.getIdentityServerKey(), $scope.setting.authenticationServer);
                    platformsLocalSessionStorageService.setItem('public', globals.getServerKey(), $scope.setting.server);
                    globals.server = $scope.setting.server;
                    globals.identityServer = $scope.setting.authenticationServer;
                    tokenAuthentication.modifyServer(globals.identityServer);
                    initSetting();
                    $location.path('/login');
                    //setTimeout(function () {
                    //    $window.location.reload();
                    //}, 0);


                };

                function loginOut() {
                    localStorage.clear();
                    tokenAuthentication.logout();
                    $state.go('login');
                }

                //clearToken is boolean type
                function getSettingStatus(clearToken) {
                    var status = commonSettingService.getSettingCurrentStatus();
                    if (status && status.currentStatus) {
                        if (clearToken) {
                            loginOut();
                            return;
                        }
                        var applyBtn = document.getElementById('apply');
                        applyBtn.setAttribute('disabled', 'true');
                        $scope.settingShow = true;
                    }
                }

                //function deleteSettingStatus(){
                //    var data = {currentStatus:''};
                //    commonSettingService.setSettingCurrentStatus(data);
                //}

                $scope.goBack=function(){
                    $state.go("setting.configSetting");
                }


                $scope.applayShow = function () {
                    var applyBtn = document.getElementById('apply');
                    applyBtn.removeAttribute('disabled');
                };

                function TestId(){
                   if ($stateParams.id){
                       $scope.testId=true;
                   }else {
                       $scope.testId=false;
                   }
                }
                //function keyboardShowHandler(e){
                //    if(window.scrollY < 100) //键盘高度一般大于100，如果scrollY小于100，可以认为界面未上移，则需要手动上移
                //        window.scrollTo(0, e.keyboardHeight);
                //}
                //function keyboardHideHandler(e){
                //    if(window.scrollY != 0)
                //        window.scrollTo(0, 0);
                //}
                //$scope.keyBoardScrollTop=function(){
                //    window.addEventListener('native.keyboardshow', keyboardShowHandler);
                //    window.addEventListener('native.keyboardhide', keyboardHideHandler);
                //    var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是iOS
                //    if(isIOS) {
                //        keyboardShowHandler(e);
                //        keyboardHideHandler(e);
                //    }
                //}

                function init() {
                    TestId();
                    initServerSetting();
                    getSettingStatus();
                    refreshTranslation();
                }

                init();

                $scope.$on('$cordovaNetwork:online', function () {
                    init();
                });

            }]);
})(angular);