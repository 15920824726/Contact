/**
 *  global declarion of tt
 *  */
var tt = window.tt || {};

(function () {
    'use strict';
//
// Thinktecture token-based authentication module for AngularJS.
// Implements OAuth2 resource owner password flow.
// Uses jQuery.
// Version 0.2.4 - Feb 20, 2014.
//

    // jshint -W098
    // jshint -W069
    // jshint -W106
    tt.authentication = {};

// The following events are available to be subscribed to in the application:
    tt.authentication = {
        authenticationRequired: 'tt:authentication:authNRequired',
        loginConfirmed: 'tt:authentication:loginConfirmed',
        loginFailed: 'tt:authentication:loginFailed',
        loggedIn: 'tt:authentication:loggedIn',
        logoutConfirmed: 'tt:authentication:logoutConfirmed'
    };


    /**
     * @type {module|*}
     */
    tt.authentication.module = angular.module('Thinktecture.Authentication', ['ng']);
    /**
     * @provider tokenAuthentication
     *
     */
        //tt.authentication.module.provider('tokenAuthentication', {
        //	storage: null,
        //	baseUrl: null,
        //	url: null,
        //	setStorage: function (s) {
        //		this.storage = s;
        //	},
        //	setUrl: function (u) {
        //		this.url = u;
        //	},
        //	setBaseUrl: function (u) {
        //		this.baseUrl = u;
        //	},
        //	$get: ['$rootScope', '$injector', '$q', function ($rootScope, $injector, $q) {
        //		var $http;
        //		var key = this.baseUrl + 'tt:authentication:authNToken';
        //		var store;
        //		var that = this;
        //
        //		if (this.storage === 'private') {
        //			store = sessionStorage;
        //		} else {
        //			store = localStorage;
        //		}
        //
        //		$rootScope.tt = $rootScope.tt || {};
        //		$rootScope.tt.authentication = $rootScope.tt.authentication || {};
        //		$rootScope.tt.authentication.userLoggedIn = false;
        //
        //		// checkForValidToken();
        //
        //		/**
        //		 */
        //		function clearToken() {
        //			store.removeItem(key);
        //			$http = $http || $injector.get('$http');
        //			delete $http.defaults.headers.common['Authorization'];
        //			$rootScope.tt.authentication.userLoggedIn = false;
        //		}
        //
        //
        //		/**
        //		 * send login to backup and returning the token
        //		 */
        //		// client_id; secret; sollten aus controller angeliefert werden
        //		function login(username, password) {
        //			$http = $http || $injector.get('$http');
        //			//var postData = $.param({grant_type: 'password', username: username, password: password});
        //			var postData = $.param({
        //				grant_type: 'password',
        //				username: username,
        //				password: password,
        //				client_id: 'iTWO.Cloud',
        //				client_secret: '{fec4c1a6-8182-4136-a1d4-81ad1af5db4a}',
        //				scope: 'default'
        //			});
        //
        //			return $http({
        //				method: 'POST',
        //				url: that.url,
        //				data: postData,
        //				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        //			}).success(function (tokenData) {
        //						username = '';
        //						password = '';
        //						setToken(tokenData);
        //						authenticationSuccess();
        //					});
        //		}
        //
        //		/*
        //
        //		 */
        //		function logout() {
        //			clearToken();
        //			$rootScope.$emit(tt.authentication.logoutConfirmed);
        //		}
        //
        //		/*
        //
        //		 */
        //		function authenticationSuccess() {
        //			$rootScope.tt.authentication.userLoggedIn = true;
        //			//$rootScope.$broadcast(tt.authentication.loggedIn);
        //			//$rootScope.$broadcast(tt.authentication.loginConfirmed);
        //		}
        //
        //		/*
        //
        //		 */
        //		function initialCheckForToken() {
        //			var deferred = $q.defer();
        //			var token = JSON.parse(store.getItem(key));
        //			if (token) {
        //				deferred.resolve('iTWO token available');
        //			} else {
        //				deferred.reject('Invalid token or token not available.');
        //			}
        //			return deferred.promise;
        //		}
        //
        //		/*
        //		 fires tt.authentication.loggedIn if token is valid and ok
        //		 fires tt.authentication.authenticationRequired if token invalid or not there
        //		 */
        //		function checkForValidToken() {
        //			return getToken().then(function (tokenData) {
        //				$rootScope.tt.authentication.userLoggedIn = false;
        //				if (!tokenData) {
        //					$rootScope.$broadcast(tt.authentication.authenticationRequired);
        //
        //					return false;
        //
        //				} else {
        //					if (new Date().getTime() > tokenData.expiration) {
        //						$rootScope.$broadcast(tt.authentication.authenticationRequired);
        //						return false;
        //
        //					} else {
        //						//init db
        //						setToken(tokenData);
        //						$rootScope.tt.authentication.userLoggedIn = true;
        //						$rootScope.$broadcast(tt.authentication.loggedIn);
        //
        //						return true;
        //					}
        //				}
        //			});
        //		}
        //
        //		/**
        //		 * @function setToken
        //		 *
        //		 * @param tokenData
        //		 *
        //		 * @description
        //		 *  sets the token into the $http header and saves it into the local storage
        //		 *
        //		 */
        //		function setToken(tokenData) {
        //			if (!tokenData.expiration) {
        //				//  getTime() returns the number of milliseconds since 1970/01/01
        //				// tokenData.expires_in hold the expiration time in seconds, i.e. 604800 are 7 days
        //				// 10 minutes before it really expires we request a new token
        //				//var expiration = tokenData.timestamp + 604800000;
        //				//tokenData.expiration = expiration;
        //				var expiration = new Date().getTime() + (tokenData.expires_in - 600) * 1000;
        //				tokenData.expiration = expiration;
        //			}
        //			var sessionTokenValue = 'Bearer ' + tokenData.access_token;
        //
        //			$http = $http || $injector.get('$http');
        //			$http.defaults.headers.common['Authorization'] = sessionTokenValue;
        //			$http.defaults.headers.common['Client-Context'] = '{"signedInClientId":0,"clientId":0,"permissionClientId":0,"permissionRoleId":0,"dataLanguageId":1,"language":"en","culture":"en-gb"}';
        //
        //			store.setItem(key, JSON.stringify(tokenData));
        //
        //		}
        //
        //		/**
        //		 * @function getToken
        //		 *
        //		 * @returns {promise.promise}
        //		 *
        //		 * @description
        //		 * return a promise to the token from localstorage
        //		 */
        //
        //		function getToken() {
        //			var deferred = $q.defer();
        //			var token = JSON.parse(store.getItem(key));
        //			if (token) {
        //				deferred.resolve(token);
        //			} else {
        //				deferred.reject();
        //			}
        //			return deferred.promise;
        //		}
        //
        //		function modifyServer(url,baseUrl){
        //
        //		}
        //
        //		// factory supplies following methods
        //		return {
        //			login: login,
        //			logout: logout,
        //			clearToken: clearToken,
        //			getToken: getToken,
        //			setToken: setToken,
        //			checkForValidToken: checkForValidToken,
        //			initialCheckForToken: initialCheckForToken
        //		};
        //	}]
        //});


    tt.authentication.module.provider('tokenAuthentication', {
        storage: null,
        baseUrl: null,
        url: null,
        setStorage: function (s) {
            this.storage = s;
        },
        setUrl: function (u) {
            this.url = u;
        },
        setBaseUrl: function (u) {
            this.baseUrl = u;
        },
        $get: ['$rootScope', '$injector', '$q', function ($rootScope, $injector, $q) {
            var $http,
                key = this.baseUrl + 'tt:authentication:authNToken',
                store,
                that = this,
                newUrl = null;

            if (this.storage === 'private') {
                store = sessionStorage;
            } else {
                store = localStorage;
            }

            $rootScope.tt = $rootScope.tt || {};
            $rootScope.tt.authentication = $rootScope.tt.authentication || {};
            $rootScope.tt.authentication.userLoggedIn = false;

            // checkForValidToken();

            /**
             */
            function clearToken() {
                store.removeItem(key);
                $http = $http || $injector.get('$http');
                delete $http.defaults.headers.common['Authorization'];
                $rootScope.tt.authentication.userLoggedIn = false;
            }


            /**
             * send login to backup and returning the token
             */
            // client_id; secret; sollten aus controller angeliefert werden
            function login(username, password) {
                $http = $http || $injector.get('$http');
                //var postData = $.param({grant_type: 'password', username: username, password: password});
                var postData = $.param({
                    grant_type: 'password',
                    username: username,
                    password: password,
                    client_id: 'iTWO.Cloud',
                    client_secret: '{fec4c1a6-8182-4136-a1d4-81ad1af5db4a}',
                    scope: 'default'
                });
                return $http({
                    method: 'POST',
                    url: (newUrl ? newUrl : that.url)+'/core/connect/token',
                    data: postData,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (tokenData) {
                    username = '';
                    password = '';
                    setToken(tokenData);
                    authenticationSuccess();
                });
            }

            /*

             */
            function logout() {
                clearToken();
                $rootScope.$emit(tt.authentication.logoutConfirmed);
            }

            /*

             */
            function authenticationSuccess() {
                $rootScope.tt.authentication.userLoggedIn = true;
                //$rootScope.$broadcast(tt.authentication.loggedIn);
                //$rootScope.$broadcast(tt.authentication.loginConfirmed);
            }

            /*

             */
            function initialCheckForToken() {
                var deferred = $q.defer();
                var token = JSON.parse(store.getItem(key));
                if (token) {
                    deferred.resolve('iTWO token available');
                } else {
                    deferred.reject('Invalid token or token not available.');
                }
                return deferred.promise;
            }

            /*
             fires tt.authentication.loggedIn if token is valid and ok
             fires tt.authentication.authenticationRequired if token invalid or not there
             */
            function checkForValidToken() {
                return getToken().then(function (tokenData) {
                    $rootScope.tt.authentication.userLoggedIn = false;
                    if (!tokenData) {
                        $rootScope.$broadcast(tt.authentication.authenticationRequired);

                        return false;

                    } else {
                        if (new Date().getTime() > tokenData.expiration) {
                            $rootScope.$broadcast(tt.authentication.authenticationRequired);
                            return false;

                        } else {
                            //init db
                            setToken(tokenData);
                            $rootScope.tt.authentication.userLoggedIn = true;
                            $rootScope.$broadcast(tt.authentication.loggedIn);

                            return true;
                        }
                    }
                });
            }

            /**
             * @function setToken
             *
             * @param tokenData
             *
             * @description
             *  sets the token into the $http header and saves it into the local storage
             *
             */
            function setToken(tokenData) {
                if (!tokenData.expiration) {
                    //  getTime() returns the number of milliseconds since 1970/01/01
                    // tokenData.expires_in hold the expiration time in seconds, i.e. 604800 are 7 days
                    // 10 minutes before it really expires we request a new token
                    //var expiration = tokenData.timestamp + 604800000;
                    //tokenData.expiration = expiration;
                    var expiration = new Date().getTime() + (tokenData.expires_in - 600) * 1000;
                    tokenData.expiration = expiration;
                }
                var sessionTokenValue = 'Bearer ' + tokenData.access_token;

                $http = $http || $injector.get('$http');
                $http.defaults.headers.common['Authorization'] = sessionTokenValue;
                $http.defaults.headers.common['Client-Context'] = '{"signedInClientId":0,"clientId":0,"permissionClientId":0,"permissionRoleId":0,"dataLanguageId":1,"language":"en","culture":"en-gb"}';

                store.setItem(key, JSON.stringify(tokenData));

            }

            /**
             * @function getToken
             *
             * @returns {promise.promise}
             *
             * @description
             * return a promise to the token from localstorage
             */

            function getToken() {
                var deferred = $q.defer();
                var token = JSON.parse(store.getItem(key));
                if (token) {
                    deferred.resolve(token);
                } else {
                    deferred.reject();
                }
                return deferred.promise;
            }

            function modifyServer(url) {
                that.url = url
                newUrl = url;
            }

            // factory supplies following methods
            return {
                modifyServer: modifyServer,
                login: login,
                logout: logout,
                clearToken: clearToken,
                getToken: getToken,
                setToken: setToken,
                checkForValidToken: checkForValidToken,
                initialCheckForToken: initialCheckForToken
            };
        }]
    });

})();
