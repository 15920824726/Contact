/**
 * Created by yar on 6/23/2016.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.business.partner';
    angular.module(moduleName).factory('businessPartnerDetailDataService',
        ['businessPartnerDetailHttpService', '$q',
            function (businessPartnerDetailHttpService, $q) {
                var service = {};

                service.getBlobByBusinessPartnerId = function (Id) {
                    var defer = $q.defer();
                    businessPartnerDetailHttpService.getBlobByBusinessPartnerId(Id).then(
                        function (response) {
                            try {
                                defer.resolve(response.data);
                            } catch (error) {
                                defer.reject(false);
                            }
                        },
                        function (error) {
                            defer.reject(error);
                        });
                    return defer.promise;
                };

                service.BusinessPartnerDetailFill = function () {
                    var result = {
                        imageData: 'data:image/png;base64,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',
                        BusinessPartnerName1: 'Benmu Construction Ltd.',
                        //BusinessPartnerName2:'',
                        //companyCode:'',
                        //????
                        companyName: 'Best Practice name2',
                        Telephone1: '2028999879',
                        Telephone2: '2028999879',
                        Mobile: '13480235667',
                        Email: 'info@33.com',
                        Fax: '13480235667',
                        Address: 'china',
                        Internet: 'https://www.baidu.com'
                    };
                    return result;
                };

                service.getBusinessPartnerDetailByBusinessPartnerId = function () {
                    return service.BusinessPartnerDetailFill();
                };
                return service;

            }]);
})(angular);
