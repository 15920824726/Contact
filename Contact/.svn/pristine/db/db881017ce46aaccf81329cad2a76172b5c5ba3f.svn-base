/**
 * Created by hot on 2016-6-15.
 */
(function (angular) {
	'use strict';

	angular.module('App.companyRole').controller('companyRoleMainController',
			[
				'$scope',
				'appBaseDataService',
				'$translate',
				function ($scope,
						  appBaseDataService,
						  $translate) {
					$scope.companyRole = {
						appName: $translate.instant('main.appName')
					};
					appBaseDataService.initController($scope, $scope.companyRole);
				}]);
})(angular);