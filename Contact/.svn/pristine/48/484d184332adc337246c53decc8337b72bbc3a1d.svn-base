/*
 * Created by hot on 2016-6-15.
 * Copyright (c) RIB Software AG
 */
(function (angular) {
	'use strict';

	angular.module('App.common').factory('NetWorkTranslationDataService',
		[
			'platformTranslateService',
			'$rootScope',
			function (platformTranslateService,
			          $rootScope) {

				var service = {};

				function loadTranslations() {
					$rootScope.disConnect = platformTranslateService.instant({
						base: ['NotNetWork']
					}).base.NotNetWork;
				}

				service.registerNetWorkTranslation = function () {
					platformTranslateService.translationChanged.register(loadTranslations);
					if (!platformTranslateService.registerModule('common')) {
						loadTranslations();
					}
				};

				return service;
			}
		]);
})(angular);