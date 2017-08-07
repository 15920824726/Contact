/**
 * Created by yar on 6/20/2016.
 */
(function (angular) {
    'use strict';

    /*
     ** module is created.
     */
    var moduleName = 'App.favorite';

    angular.module(moduleName, ['ui.router', 'platform']);
    globals.modules.push(moduleName);

    angular.module(moduleName)
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('desktop.favorite', {
                        url: "/favorite",
                        cache:false,
                        views: {
                            'tab-favorite': {
                                templateUrl: 'favorite/templates/favorite.html',
                                controller: 'favoriteController'
                            }
                        },
                        resolve: {
                            reportTranslation: ['platformTranslateService', function (platformTranslateService) {
                                return platformTranslateService.registerModule('favorite', true);
                            }]
                        }
                    })
                    .state('desktop.favoritedetail', {
                    url: "/favoritedetail",
                    params:{'data':null},
                    views: {
                        'tab-favorite': {
                            templateUrl: 'favorite/templates/favorite-detail.html',
                            controller: 'favoriteDetailController'
                        }
                    }
                })
            }
        ]);

})(angular);