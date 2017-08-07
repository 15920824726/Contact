/**
 * Created by hot on 2016-6-15.
 */
(function (angular) {
    'use strict';

    /*
     ** module is created.
     */
    var moduleName = 'App.contacts';

    angular.module(moduleName, ['ui.router', 'platform']);
    globals.modules.push(moduleName);

    angular.module(moduleName)
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('desktop.contact', {
                      // cache:false,
                        url: "/contact",
                        cache:false,
                        views: {
                            'tab-contact': {
                                //cache:false,
                                templateUrl: 'contacts/templates/contacts-list.html',
                                controller: 'contactsListController'
                            }
                        },
                        resolve: {
                            reportTranslation: ['platformTranslateService', function (platformTranslateService) {
                                return platformTranslateService.registerModule('contacts', true);
                            }]
                        }
                    })
                    .state('desktop.contact-detail', {
                        url: '/contact/:contactId/:bpName',
                        views: {
                            'tab-contact': {
                                templateUrl: 'contacts/templates/contacts-detail.html',
                                controller: 'contactDetailController'
                            }
                        }
                    });
            }
        ]);

})(angular);