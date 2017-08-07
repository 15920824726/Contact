/**
 * Created by yar on 3/22/2016.
 */
(function (angular) {
    'use strict';

    angular.module('App.userInfo').factory('userInfoDataService',
        [
            'tokenAuthentication',
            'platformsDesService',
            '$q',
            'userInfoHttpService',
            'platformsLocalSessionStorageService',
            '$state',
            'platformContextService',
            function (tokenAuthentication,
                      platformsDesService,
                      $q,
                      httpService,
                      platformsLocalSessionStorageService,
                      $state,
                      platformContextService) {

                var service = {};
                var userInfo = {
                    userValid: false,
                    LogonName: '',
                    UserId: 0,
                    UserName: '',
                    Email: '',
                    UserDataLanguageId: 0
                };

                function getTokenData() {
                    var key = globals.appBaseUrl + 'tt:authentication:authNToken';
                    return JSON.parse(window.localStorage.getItem(key));
                }

                //todo:delete
                service.getUserData = function () {
                    var userData = getTokenData();
                    return userData.user ? userData.user : null;
                };
                //todo:delete
                service.replaceUserIcon = function (icon) {
                    var userData = getTokenData();
                    if (userData && userData.user) {
                        userData.user.icon = icon;
                        tokenAuthentication.setToken(userData);
                    }
                };
                //todo:delete
                service.saveUser = function (user) {
                    var defer = $q.defer();
                    var format = {
                        add: [],
                        set: [user],
                        del: []
                    };
                    httpService.saveUser(format).then(function (response) {
                        try {
                            if (response && response.status && response.status === 200) {
                                defer.resolve(response.data.items[0]);
                            } else {
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
                //todo:delete
                service.savePhoto = function (user) {
                    return service.saveUser(user);
                };

                service.login = function (username, password) {
                    var defer = $q.defer();
                    try {
                        tokenAuthentication.login(username, password).then(
                            function (response) {
                                // remove eventually running error feedback timer
                                if (response && response.status === 200) {
                                    defer.resolve(response.data);
                                } else {
                                    defer.reject(false);
                                }
                            },
                            function () {
                                defer.reject(false);
                            });
                    } catch (error) {//jshint ignore:line
                        defer.reject(false);
                    }

                    return defer.promise;
                };
                service.getUserInfo = function () {
                    var defer = $q.defer();
                    //cache
                    if (userInfo.userValid) {
                        return $q.when(userInfo); // return resolved promise
                    }
                    httpService.getUserInfo().then(function (response) {
                        try{
                            if (response && response.data) {
                                angular.extend(userInfo, response.data);
                                userInfo.userValid = true;
                                defer.resolve(userInfo);
                                //return userInfo;
                            }
                            else {
                                defer.reject(false);
                            }
                        }
                        catch (err){
                            defer.reject(false);
                        }

                    });
                    return defer.promise;
                };
                service.getUserInfoData = function () {
                    if (userInfo.userValid) {
                        return userInfo;
                    }
                    return null;
                };
                service.getLoginUserInfo = function () {
                    var user = platformsLocalSessionStorageService.getItem('public', 'user');
                    if (user) {
                        return {
                            username: platformsDesService.decrypt(user.username).substr(0, user.usernamelen),
                            password: platformsDesService.decrypt(user.password).substr(0, user.passwordlen)
                        };
                    }
                };

                service.saveLoginUserInfo = function (userName, password) {
                    platformsLocalSessionStorageService.setItem('public', 'user', {
                        username: userName,
                        password: platformsDesService.encrypt(password),
                        usernamelen: userName.length,
                        passwordlen: password.length
                    });
                };

                service.removeLoginUserInfo = function () {
                    platformsLocalSessionStorageService.removeItem('public', 'user');
                };

                service.changeLanguage = function (languageId, languages) {
                    var item = _.find(languages, function (item) {
                        return item.language === languageId;
                    });

                    platformContextService.setLanguage(item.language);
                    platformContextService.culture(item.culture);
                    platformContextService.saveLanguageInfo2Storage();
                };

                service.checkServerConfig = function () {
                    var identityServer = platformsLocalSessionStorageService.getItem('public', globals.getIdentityServerKey());
                    var server = platformsLocalSessionStorageService.getItem('public', globals.getServerKey());
                    if (!identityServer || !server) {
                        $state.go('setting.configServer');
                    }
                };
                return service;
            }]);
})(angular);