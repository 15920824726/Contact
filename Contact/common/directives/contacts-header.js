/**
 * Created by hot on 2016-6-15.
 */
(function (angular) {
	'use strict';

	angular.module('App.common').directive('contactsHeader',
		['$state',
			function ($state) {
				return {
					restrict: 'AE',
					scope: {
						onBack: '='
					},
					templateUrl: globals.appBaseUrl + 'common/partials/contacts-header.html',
					link: function (scope,element,attrs) {

						/*scope.detail = app.headerTitle;

						scope.isShowCurrencyBtn = scope.$eval(attrs.showCurrency) ? true : false;

						scope.onGoBack = function () {
							scope.onBack ? scope.onBack() : function () {
								$state.go('report.documents');
							}();//jshint ignore:line
						};

						scope.$on('headerChange', function (e, title) {
							scope.detail = title;
						});*/

					}
				};
			}]);
})(angular);