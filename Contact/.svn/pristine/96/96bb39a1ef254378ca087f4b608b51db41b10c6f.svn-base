/**
 * Created by yar on 6/20/2016.
 */
(function (angular) {
    'use strict';

    /*
     ** Cloud.Desktop module is created.
     */
    var moduleName = 'App.desktop';

    //angular.module('contactApp.desktop', ['ui.router', 'services.login', 'platform']);
    angular.module('App.desktop', ['ui.router', 'platform']);
    globals.modules.push(moduleName);

    //config block of the desktop module.
    angular.module(moduleName)
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('desktop', {
                        url: "/desktop",
                        templateUrl: "desktop/partials/desktop.html",
                        controller: 'desktopController',

                    });
          //     esktop/partials/change-language.html',

                // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise('/desktop');

            }
        ]);

})(angular);
