/**
 * Created by yar on 6/20/2016.
 */
(function (angular) {
    'use strict';

    /*
     ** module is created.
     */
    var moduleName = 'App.business.partner';

    angular.module(moduleName, ['ui.router', 'platform']);
    globals.modules.push(moduleName);

    angular.module(moduleName)
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('desktop.businessPartner', {
                        url: "/businessPartner",
                        cache:false,
                        views: {
                            'tab-business-partner': {
                                templateUrl: 'business-partner/templates/business-partner.html',
                                controller: 'businessPartnerController'
                            }
                        },
                        resolve: {
                            reportTranslation: ['platformTranslateService', function (platformTranslateService) {
                                return platformTranslateService.registerModule('business-partner', true);
                            }]
                        }
                    }).state('desktop.businessPartnerDetail/:businessPartnerId', {
                    url: '/businessPartnerDetail/:businessPartnerId',
                    views: {
                        'tab-business-partner': {
                            templateUrl: 'business-partner/templates/business-partner-detail.html',
                            controller: 'businessPartnerDetailController'
                        }
                    }
                }).state('desktop.businessPartnerContactList', {
                    url: '/businessPartnerContactList/:businessPartnerId',
                    cache:false,
                    views: {
                        'tab-business-partner': {
                            templateUrl: 'business-partner/templates/business-partner-contactList.html',
                            controller: 'businessPartnerContactListController'
                        }
                    }
                })
                    .state('desktop.businessPartnerContactDetail', {
                        url: '/businessPartnerContactdetail/:contactId/:bpName',
                        views: {
                            'tab-business-partner': {
                                templateUrl: 'business-partner/templates/business-parter-contact-detail.html',
                                controller: 'bpContactdetailController'
                            }
                        }
                    }).state('desktop.addBusinessPartnerContact', {
                    url: '/addBusinessPartnerContact/:businessPartnerId',
                    views: {
                        'tab-business-partner': {
                            templateUrl: 'business-partner/templates/add-business-partner-contact.html',
                            controller: 'addBusinessPartnerContactController'
                        }
                    }
                })
                    .state('desktop.BusinessPartnerMap', {
                        url: '/BusinessPartnerMap',
                        params:{'data':null},
                        views: {
                            'tab-business-partner': {
                                templateUrl: 'business-partner/templates/business-partner-map.html',
                                controller: 'businessPartnerMapController'
                            }
                        }
                    })
                    .state('desktop.BusinessPartnerContactsFromLibrary', {
                        url: '/BusinessPartnerContactsFromLibrary/:businessPartnerId',
                        views: {
                            'tab-business-partner': {
                                templateUrl: 'business-partner/templates/business-partner-contact-fromLibrary.html',
                                controller: 'bpContactLibraryController'
                            }
                        }
                    });

            }
        ]);

})(angular);
