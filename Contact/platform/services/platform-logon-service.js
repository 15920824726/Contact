/*
 * $Id: platform-logon-service.js 321194 2015-08-06 13:37:19Z rei $
 * Copyright (c) RIB Software AG
 */
/* globals globalLanguages */

(function () {
	'use strict';

	/**
	 * @ngdoc service
	 * @name platform:platformUserInfoService
	 * @function
	 * @requires $http, $q, platformContextService, _
	 * @description
	 * platformPermissionService provides support for loading and checking access right
	 */
	angular.module('platform').factory('platformLogonService', platformLogonService);

	platformLogonService.$inject = ['$http', '$q', '_', 'tokenAuthentication', 'platformTranslateService', 'platformContextService', '$ionicLoading'];
	function platformLogonService($http, $q, _, tokenAuthentication, xlateSvc, platformContextService, $ionicLoading) { // jshint ignore:line
		var service = {};

		var processMessage = {
			main: '',
			sub: ''
		};

		/**
		 * @param {string}[mainMsg]
		 * @param {string}[subMsg]
		 */
		service.setProcessMessage = function (mainMsg, subMsg) {
			processMessage.main = mainMsg;
			processMessage.sub = subMsg;
		};

		service.getProcessMainMsg = function () {
			return processMessage.main;
		};

		service.getProcessSubMsg = function () {
			return processMessage.sub;
		};

		/**
		 * This function supplies all avalaible ui languages as array
		 * The languages are taken from the globals variable globalLanguages, which itself will
		 * be assembled on backend side with all avaialable uilanguages
		 *
		 * @returns {Object} array of [{language: {string} , languageName: {string} , languageName$tr$: {string} , culture: {string} }]
		 */
		service.getUiLanguages = function getUiLanguages() {

			// check for availability of current language
			var defLanguage = platformContextService.getDefaultLanguage();
			var requestedLang = platformContextService.getLanguage() || defLanguage;

			var languages = globalLanguages[requestedLang];

			if (!languages && (defLanguage !== requestedLang)) {
				languages = globalLanguages[defLanguage];
			}

			if (languages) {
				return languages;
			}

			/* fallback if no languages are found in glaobalLanguages*/
			var uiLanguages = [
				{
					language: 'de',
					languageName: 'Deutsch',
					languageName$tr$: 'platform.loginLanguageGerman',
					culture: 'de-de'
				},
				{
					language: 'en',
					languageName: 'English',
					languageName$tr$: 'platform.loginLanguageEnglish',
					culture: 'en-gb'
				},
				{
					language: 'zh',
					languageName: '中文',
					languageName$tr$: 'platform.loginLanguageChinese',
					culture: 'zh-hans'
				}
			];
			var uiLanguagesXlated = xlateSvc.translateObject(uiLanguages, ['languageName']);
			return uiLanguagesXlated;
		};

		return service;
	}
})();
