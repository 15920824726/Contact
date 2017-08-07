(function (angular) {
    'use strict';

    /*
     ** Created by hot on 2016-6-15.
     */
    var moduleName = 'App.companyRole';

    angular.module(moduleName, ['ui.router', 'platform']);
    globals.modules.push(moduleName);

    angular.module(moduleName)
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('companyRole', {
                        url: '/companyRole',
                        controller: 'companyRoleMainController',
                        cache: false,
                        //abstract: true,//navigation is not smooth
                        template: '<ion-nav-view on-scroll="false"></ion-nav-view>',
                        resolve: {
                            serverSettingTranslation: ['platformTranslateService', function (platformTranslateService) {
                                return platformTranslateService.registerModule('company-role', true);
                            }],
                            userInfo: ['userInfoDataService', function (userInfoDataService) {
                                return userInfoDataService.getUserInfo();
                            }]
                        }
                    })
                    .state('companyRole.company', {
                        templateUrl: 'company-role/templates/company-list.html',
                        controller: 'companyController'
                    })
                    .state('companyRole.next', {
                        url: '/next/:companyId',
                        templateUrl: 'company-role/templates/company-list.html',
                        controller: 'companyController'
                    })
                    .state('companyRole.reSelect', {
                        templateUrl: 'company-role/templates/company-list.html',
                        controller: 'companyController'
                    })
                    .state('companyRole.role', {
                    templateUrl: 'company-role/templates/role-list.html',
                    controller: 'roleController'
                });
            }
        ]);

})(angular);