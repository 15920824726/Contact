/**
 * Created by hot on 2016-6-15.
 */
(function (angular) {
	'use strict';

	angular.module('App.contacts').controller('contactsMainController',
		[
			'$scope',
			'appBaseDataService',
			'$translate',
			function ($scope,
			          appBaseDataService,
			          $translate) {
					  
				$scope.contacts = {
					appName: $translate.instant('main.appName')
				};

				appBaseDataService.initController($scope, $scope.contacts);
			}]);
})(angular);