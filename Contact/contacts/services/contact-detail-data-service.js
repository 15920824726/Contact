/**
 * Created by yar on 6/20/2016.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.contacts';

    /**
     * contact detail data service
     */
    angular.module(moduleName).factory('contactDetailDataService',
        ['contactDetailHttpService', '$q',
            function (contactDetailHttpService, $q) {

                var service = {};


                /**
                 * get blob by contactId
                 *
                 * @param Id
                 * @returns {*}
                 */
                service.getBlobByContactId = function (Id) {
                    var defer = $q.defer();
                    contactDetailHttpService.getBlobByContactId(Id).then(
                        function (response) {
                            try {
                                if (response && response.data) {
                                    defer.resolve(response.data);
                                }
                                else {
                                    defer.reject(false);
                                }
                            } catch (error) {
                                defer.reject(false);
                            }
                        }, function (error) {
                            defer.reject(error);
                        });
                    return defer.promise;
                };

                service.createContact = function (options) {
                    var defer = $q.defer();
                    contactDetailHttpService.createContact(options).then(
                        function (response) {
                            try {
                                if (response && response.data) {
                                    defer.resolve(response.data);
                                }
                                else {
                                    defer.reject(false);
                                }
                            } catch (error) {
                                defer.reject(false);
                            }
                        }, function (error) {
                            defer.reject(error);
                        });
                    return defer.promise;
                };

                service.saveContact = function (options) {
                    var defer = $q.defer();
                    contactDetailHttpService.saveContact(options).then(
                        function (response) {
                            try {
                                if (response && response.data) {
                                    defer.resolve(response.data);
                                }
                                else {
                                    defer.reject(false);
                                }
                            } catch (error) {
                                defer.reject(false);
                            }
                        }, function (error) {
                            defer.reject(error);
                        });
                    return defer.promise;
                };

                service.createTelephone = function (options) {
                    var defer = $q.defer();
                    contactDetailHttpService.createTelephone(options).then(
                        function (response) {
                            try {
                                if (response && response.data) {
                                    defer.resolve(response.data);
                                }
                                else {
                                    defer.reject(false);
                                }
                            } catch (error) {
                                defer.reject(false);
                            }
                        }, function (error) {
                            defer.reject(error);
                        });
                    return defer.promise;
                };

                service.createPhoto = function (options) {
                    var defer = $q.defer();
                    contactDetailHttpService.createPhoto(options).then(
                        function (response) {
                            try {
                                if (response && response.data) {
                                    defer.resolve(response.data);
                                }
                                else {
                                    defer.reject(false);
                                }
                            } catch (error) {
                                defer.reject(false);
                            }
                        }, function (error) {
                            defer.reject(error);
                        });
                    return defer.promise;
                };

                service.createBase = function (options, telephoneOptions) {
                    var defer = $q.defer(), data = {},tempData=[],count = 0,i= 0, max = telephoneOptions.count?telephoneOptions.count:0;
                    if(max===0){
                        defer.reject(false);
                    }
                    else{
                        if(telephoneOptions.photo){
                            i=1;
                            contactDetailHttpService.createPhoto(options).then(
                                function (response) {
                                    try {
                                        if (response && response.data) {
                                            count++;
                                            //tempData.push(response.data);
                                            telephoneOptions.photo=response.data;
                                            //data.telephone = response.data;
                                            if (count == max) {
                                                for(var j in telephoneOptions){
                                                    if(tempData.length&&j!="count"&&j!="photo"){
                                                        telephoneOptions[j]=tempData[tempData.length-1];
                                                        tempData.pop();
                                                    }
                                                }
                                                defer.resolve(telephoneOptions);
                                            }
                                        }
                                        else {
                                            defer.reject(false);
                                        }
                                    } catch (error) {
                                        defer.reject(false);
                                    }
                                }, function (error) {
                                    defer.reject(error);
                                });
                        }
                        for(;i<max;i++){
                                contactDetailHttpService.createTelephone(options).then(
                                    function (response) {
                                        try {
                                            if (response && response.data) {
                                                count++;
                                                tempData.push(response.data);
                                                //data.telephone = response.data;
                                                if (count == max) {
                                                    for(var j in telephoneOptions){
                                                        if(tempData.length&&j!="count"&&j!="photo"){
                                                            telephoneOptions[j]=tempData[tempData.length-1];
                                                            tempData.pop();
                                                        }
                                                    }
                                                    defer.resolve(telephoneOptions);
                                                }
                                            }
                                            else {
                                                defer.reject(false);
                                            }
                                        } catch (error) {
                                            defer.reject(false);
                                        }
                                    }, function (error) {
                                        defer.reject(error);
                                    });
                        }
                    }

                    return defer.promise;
                };
                service.loadCountriesByFilter=function(options){
                    var defer = $q.defer();
                    contactDetailHttpService.loadCountriesByFilter(options).then(
                        function (response) {
                            try {
                                if (response && response.data) {
                                    defer.resolve(response.data);
                                }
                                else {
                                    defer.reject(false);
                                }
                            } catch (error) {
                                defer.reject(false);
                            }
                        }, function (error) {
                            defer.reject(error);
                        });
                    return defer.promise;
                };

                return service;

            }]);
})(angular);