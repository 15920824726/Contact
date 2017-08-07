/**
 * Created by hot on 2016-6-15.
 */
(function (angular) {
	'use strict';

	angular.module('App.common').factory('CommonDataService',
		[function () {
			function CommonDataService() {
				this.dataSource = [];
			}

			CommonDataService.prototype.getItemById = function (id) {
				var len = this.dataSource.length,
					i = 0,
					item;
				for (; i < len; i++) {
					item = this.dataSource[i];
					if (item.Id === parseInt(id)) {
						return item;
					}
				}

				return null;
			};


			CommonDataService.prototype.setDataSource = function (data) {
				this.dataSource = data;
			};

			CommonDataService.prototype.getDataSource = function () {
				return this.dataSource;
			};

			return CommonDataService;

		}]);
})(angular);