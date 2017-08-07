/**
 * Created by hot on 2016-6-15.
 */
(function (angular) {
	'use strict';

	angular.module('App.companyRole').factory('companyRoleHttpService',
		['$http', function ($http) {

			var service = {};

			service.getCompanyRole = function () {
				return $http.get(globals.server + '/basics/company/getassignedcompanieswithroles');
			};
			service.checkCompany=function(params){
				return $http.get(globals.server + '/basics/company/checkcompany?requestedCompanyId='+params.clientId+'&requestedSignedInCompanyId='+params.signedInClientId+'&requestedPermissionClientId='+params.permissionClientId+'&requestedRoleId='+params.roleId);
			}

			return service;
		}]);
})(angular);