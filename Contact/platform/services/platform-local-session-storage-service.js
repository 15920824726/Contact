/*
 * $Id: platform-local-session-storage-service.js 321194 2015-12-21 13:37:19Z tommy $
 * Copyright (c) RIB Software AG
 */

(function () {
	'use strict';
	angular.module('platform').factory('platformsLocalSessionStorageService', platformsLocalSessionStorageService);

	platformsLocalSessionStorageService.$inject = ['$http', '$q', 'tokenAuthentication'];
	function platformsLocalSessionStorageService($http, $q, tokenAuthentication) {
		var service = {};
		//var storage;
		//var config = {
		//	userKey: ''
		//};
		service.getStore = function (type) {
			return type === 'private' ? sessionStorage : localStorage;
		};
		service.promiseGetItem = function (type, key) {
			var store = this.getStore(type), data;
			var deferred = $q.defer();
			data = store.getItem(key);
			if (typeof data === 'string'&&data.indexOf('{')>=0) {
				data = JSON.parse(data);
			}
			if (data) {
				deferred.resolve(data);
			} else {
				deferred.reject();
			}
			return deferred.promise;
		};
		service.getItem = function (type, key) {
			var store = this.getStore(type), data;
			data = store.getItem(key);
			if (typeof data === 'string'&&data.indexOf('{')>=0) {
				data = JSON.parse(data);
			}
			if (data) {
				return data;
			}
			return null;
		};
		service.setItem = function (type, key, data) {
			if (!data) {
				return;
			}

			var store = this.getStore(type);
			if (typeof data === 'object') {
				data = JSON.stringify(data);
			}
			if (typeof data === 'string') {
				store.setItem(key, data);
				return true;
			}
			return false;
		};
		service.removeItem = function (type, key) {
			var store = this.getStore(type);
			store.removeItem(key);
		};
		service.clearAllStore = function (type) {
			var store = this.getStore(type);
			store.clear();
		};
		service.getUserInfo = function () {
			return tokenAuthentication.getToken().then(function (tokenData) {
				if (new Date().getTime() <= tokenData.expiration) {
					if (tokenData) {
						var userInfo;
						userInfo = tokenData.user;
						globals.userInfo = userInfo;
						return userInfo;
					}
				}
				return false;
			});
		};
		return service;
	}
})();
