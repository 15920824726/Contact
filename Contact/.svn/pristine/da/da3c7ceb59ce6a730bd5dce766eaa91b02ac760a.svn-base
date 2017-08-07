/**
 * Created by hot on 2016-6-15.
*/
(function (angular) {
	'use strict';
	angular.module('App.common').factory('appBaseDataService',
		[
			'$ionicLoading',
			'$ionicPopup',
			'tokenAuthentication',
			'$state',
			function ($ionicLoading,
					  $ionicPopup,
					  tokenAuthentication,
					  $state) {

				var service = {};

				service.initController = function ($scope, obj) {
					if (!obj) {
						obj = $scope;
					}
					obj.showLoading = function () {
						$ionicLoading.show();
					};
					obj.hideLoading = function () {
						$ionicLoading.hide();
					};

					obj.showMessage = function (message) {
						var body = message || 'connect error';
						obj.popUp = $ionicPopup.alert({
							title: 'error',
							template: '<div class="messageBody">' + body + '</div>',
							scope: $scope
						});
					};

					$scope.$on('$destroy', function () {
						if (obj.popUp) {
							obj.popUp.close();
						}
						//$scope.popUp.remove();
					});
				};

				service.checkLogin = function (currentRoute) {
					tokenAuthentication.checkForValidToken().then(function(valid){
						if(valid){
							$state.go(currentRoute||'companyRole.company');
						}
						else {
							$state.go('login');
						}
					});
				};

				service.getOptions = function (ops, viewId) {
					ops = ops || {};
					return ops;
				};
				return service;

			}]);

})(angular);
