(function (angular) {
    'use strict';

    /*
     ** module is created.
     */
    var moduleName = 'App.userInfo';
    angular.module(moduleName, ['ui.router', 'platform']);
    globals.modules.push(moduleName);

    angular.module(moduleName)
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    //.state('userInfo', {
                    //    templateUrl: 'user-info/templates/user-info.html',
                    //    controllers: 'userInfoController',
                    //    cache: false
                    //})
                    .state('login', {
                        url: '/login',
                        cache: false,
                        templateUrl: 'user-info/templates/logon-dialog.html',
                        controller: 'platformLoginController'
                    });
            }
        ]);


})(angular);