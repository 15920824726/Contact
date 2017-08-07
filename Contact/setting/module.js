(function (angular) {
    'use strict';

    /*
     ** Created by hot on 2016-6-15.
     */
    var moduleName = 'App.setting';

    angular.module(moduleName, ['ui.router', 'platform']);
    globals.modules.push(moduleName);

    angular.module(moduleName)
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('setting', {
                        url: '/setting',
                        controller: 'settingMainController',
                        cache: false,
                        //abstract: true,//navigation is not smooth
                        template: '<ion-nav-view on-scroll = "false"></ion-nav-view>',
                        resolve: {
                            serverSettingTranslation: ['platformTranslateService', function (platformTranslateService) {
                                return platformTranslateService.registerModule('setting', true);
                            }]
                        }
                    })
                    .state('setting.configServer', {
                        url: '/configServer',
                        params:{'id':null},
                        templateUrl: 'setting/templates/setting-server-config.html',
                        controller: 'settingServerConfigController'
                    })
                    .state('setting.configSetting', {
                        url: '/configSetting',
                        params: {'data': null},
                        templateUrl: 'setting/templates/setting.html',
                        controller: 'settingConfigController'
                    });
            }
        ]);

})(angular);