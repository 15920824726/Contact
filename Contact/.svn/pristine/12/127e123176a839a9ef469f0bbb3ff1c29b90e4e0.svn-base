/**
 * Created by yar on 6/20/2016.
 */
(function (angular) {
    'use strict';

    /*
     ** module is created.
     */
    var moduleName = 'App.project';

    angular.module(moduleName, ['ui.router', 'platform']);
    globals.modules.push(moduleName);

    angular.module(moduleName)
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('desktop.project', {
                        url: "/project",
                        cache:false,
                        views: {
                            'tab-project': {
                                templateUrl: 'project/templates/project-list.html',
                                controller: 'projectController'
                            }
                        },
                        resolve: {
                            reportTranslation: ['platformTranslateService', function (platformTranslateService) {
                                return platformTranslateService.registerModule('project', true);
                            }]
                        }
                    })
                    .state('desktop.projectcontact', {
                        url: "/projectcontact",
                        params: {'data': null},
                        views: {
                            'tab-project': {
                                templateUrl: 'project/templates/project-contacts.html',
                                controller: 'projectContactController'
                            }
                        }
                    })
                    .state('desktop.projectdetails', {
                        url: "/projectdetails",
                        params: {'data': null},
                        views: {
                            'tab-project': {
                                templateUrl: 'project/templates/project-details.html',
                                controller: 'projectDetailsController'
                            }
                        }
                    })
                    .state('desktop.projectusermessage', {
                        url: "/projectusermessage/:contactId/:bpName",
                        //params: {'data': null},
                        views: {
                            'tab-project': {
                                templateUrl: 'project/templates/project-contact-message.html',
                                controller: 'projectContactMessageController'
                            }
                        }
                    })
                    .state('desktop.projectMap', {
                    url: "/projectMap",
                    params:{'data':null},
                    views: {
                        'tab-project': {
                            templateUrl: 'project/templates/project-map.html',
                            controller: 'projectMapController'
                        }
                    }
                });
            }
        ])
        

})(angular);
