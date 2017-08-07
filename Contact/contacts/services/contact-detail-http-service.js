/**
 * Created by yar on 6/20/2016.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.contacts';
    angular.module(moduleName).factory('contactDetailHttpService',
        ['$http',
            function ($http) {
                var service = {};

                service.getBlobByContactId = function (contactId) {
                    //var filterString = 'contactFk=' + Id;
                    return $http.get(globals.server + '/businesspartner/main/contact/mobility/list?mainItemId='+contactId);
                };

                service.createContact=function(options){
                    return $http.post(globals.server + '/businesspartner/main/contact/mobility/createContact',options);
                };

                service.saveContact=function(options){
                    return $http.post(globals.server + '/businesspartner/main/contact/mobility/saveContact',options);
                };

                service.createTelephone=function(options){
                    return $http.post(globals.server + '/businesspartner/main/contact/mobility/createTelephone',options);
                };

                service.createPhoto=function(options){
                    return $http.post(globals.server + '/businesspartner/main/contact/mobility/createContactPhoto',options);
                };

                service.loadCountriesByFilter=function(options){
                    return $http.post(globals.server + '/businesspartner/main/contact/mobility/loadCountriesByFilter',options);
                };

                //service.createNewContact = function (bpFk) {
                //    return $http.get(globals.webApiBaseUrl + 'businesspartner/main/contact/create?bpFk=' + bpFk);
                //};
                //
                //service.getNewBlob = function () {
                //    return $http.get(globals.webApiBaseUrl + 'cloud/common/blob/getnewblob');
                //};
                //
                //service.createBlob = function () {
                //    return $http.post(globals.webApiBaseUrl + 'cloud/common/blob/create');
                //};
                //
                //service.getBlobById = function (id) {
                //    return $http.get(globals.webApiBaseUrl + 'cloud/common/blob/getblobbyid?id=' + id);
                //};
                //
                //service.getContactPhoto = function (contactFk) {
                //    var option = {
                //        contactFk: contactFk
                //    };
                //    return $http.post(globals.webApiBaseUrl + 'businesspartner/main/contactphoto/create', option);
                //};
                //
                //
                //service.saveContactBlob = function (option) {
                //    return $http.post(globals.webApiBaseUrl + 'businesspartner/main/businesspartner/update', option);
                //};


                return service;
            }]);
})(angular);
