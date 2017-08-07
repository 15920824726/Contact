/**
 * Created by hot on 2016-6-15.
 */
(function (angular) {
    'use strict';

    angular.module('App.companyRole').factory('companyRoleDataService',
        ['companyRoleHttpService',
            '$q',
            'companyRoleCommonDataService',
            'userInfoDataService',
            'platformsLocalSessionStorageService',
            'platformContextService',
            'commonSettingService',
            function (httpService,
                      $q,
                      companyRoleCommonDataService,
                      userInfoDataService,
                      platformsLocalSessionStorageService,
                      platformContextService,
                      commonSettingService) {
                var selection = {
                    "selectCompany": null,
                    "selectRole": null
                };
                var service = {
                    getHttp: function () {
                        var defer = $q.defer();
                        var cache = companyRoleCommonDataService.getDataSource();
                        if (cache && cache.companies) {
                            defer.resolve(cache);
                        }
                        else {
                            httpService.getCompanyRole().then(function (response) {
                                try {
                                    companyRoleCommonDataService.setDataSource(response.data);
                                    companyRoleCommonDataService.initCompaniesRoleRolesLookup();
                                    defer.resolve(companyRoleCommonDataService.getDataSource());
                                } catch (err) {
                                    defer.reject(false);
                                }
                            }, function () {
                                defer.reject(false);
                            });
                        }
                        return defer.promise;
                    },
                    checkCompanyHttp: function (params) {
                        var defer = $q.defer();
                        httpService.checkCompany(params).then(function (response) {
                            try {
                                if (response.data && response.data.isValid) {
                                    defer.resolve(true);
                                }
                                else {
                                    defer.reject(false);
                                }
                            } catch (err) {
                                defer.reject(false);
                            }
                        }, function () {
                            defer.reject(false);
                        });
                        return defer.promise;
                    },
                    getCompanybyId: function (companyId) {
                        return companyRoleCommonDataService.getCompanyById(companyId);
                    },
                    setCompanySelection: function (company) {
                        selection.selectCompany = company;
                    },
                    setRoleSelection: function (role) {
                        selection.selectRole = role;
                    },
                    getCompanySelection: function () {
                        return selection.selectCompany;
                    },
                    getRoleSelection: function () {
                        return selection.selectRole;
                    },
                    setRoleData: function (company) {
                        companyRoleCommonDataService.setRoleData(company);
                    },
                    getRoleData: function () {
                        return companyRoleCommonDataService.companyRoles;
                    },
                    getKey: function (userInfo) {
                        userInfo = userInfo ? userInfo : userInfoDataService.getUserInfoData();
                        if (userInfo) {
                            return globals.appBaseUrl + '/companyRole-' + userInfo.UserId;
                        }
                        return null;
                    },
                    reStoreContextData: function () {
                        var data = platformsLocalSessionStorageService.getItem('public', service.getKey());
                        if (data)
                            platformContextService.setCompanyConfiguration(
                                data.signedInClientId,
                                data.clientId,
                                data.permissionClientId,
                                data.roleId,
                                data.companyCode);

                    },
                    reSetCompanyAndRoleSelection: function () {
                        var data = platformsLocalSessionStorageService.getItem('public', service.getKey());
                        if (data) {
                            service.setCompanySelection({
                                id: data.clientId
                            });
                            service.setRoleSelection({
                                clientId: data.permissionClientId,
                                key: data.roleId
                            });
                        }
                    },
                    checkLocalStore: function (userInfo) {
                        var data = platformsLocalSessionStorageService.getItem('public', service.getKey(userInfo));
                        return data ? true : false;
                    },
                    saveContextData: function () {
                        var signedInClientId = selection.selectCompany.id;
                        //check companyID
                        var clientId = companyRoleCommonDataService.getCompanyToSignedIn(signedInClientId);
                        if (clientId) {
                            var companyRoleValue = {
                                signedInClientId: signedInClientId,
                                clientId: clientId,
                                permissionClientId: selection.selectRole.clientId,
                                roleId: selection.selectRole.key,
                                companyCode:selection.selectCompany.code
                            };
                            platformContextService.setCompanyConfiguration(
                                companyRoleValue.signedInClientId,
                                companyRoleValue.clientId,
                                companyRoleValue.permissionClientId,
                                companyRoleValue.roleId,
                                companyRoleValue.companyCode);
                            platformsLocalSessionStorageService.setItem('public', service.getKey(), companyRoleValue);
                        }
                        else {
                            console.log('company type err!');
                        }

                    },
                    getSettingCurrentStatus: function () {
                        return commonSettingService.getSettingCurrentStatus();
                    }
                };

                return service;
            }]);

})(angular);