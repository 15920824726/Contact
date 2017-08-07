/**
 * Created by hot on 6/16/2016.
 */
(function (angular) {
	'use strict';

	angular.module('App.common').factory('companyRoleCommonDataService',
		['CommonDataService', function (CommonDataService) {
			//var CurrentSattus;
			var service = new CommonDataService();
			service.companiesMap={};
			service.roles={};
			service.rolesLookup={};
			service.selectedRole=null;

			service.initCompaniesRoleRolesLookup = function () {
				var data=service.getDataSource();
				if (data.companies) {
					service.companiesMap = service.companiesTreeToMap(data.companies);
				}
				if (data.roles) {
					service.roles = service.rolesArrayToObject(data.roles);
				}
				if (data.rolesLookup) {
					service.rolesLookup = _.indexBy(data.rolesLookup, 'key');
				}
			};
			/*
			 this method extends each company with its parent.
			 */
			service.companiesTreeToMap=function(companiesList) {
				/* local function*/
				function walkTruTree(company) {
					arr.push(company);
					if (company.children) {
						_.forEach(company.children, walkTruTree);
					}
				}
				var arr = [];
				_.forEach(companiesList, function (company) {
					walkTruTree(company);
				});
				return arr;
			};
			/*
			 This method converts the roles array into an javascript object with properties of v.clientId value.
			 the represent a kind of map
			 */
			service.rolesArrayToObject=function(roles) {
				var resultObj;
				resultObj = _.reduce(roles, function (result, v) {
					result[v.clientId] = {roleId: v.roleIds, clientId: v.clientId};
					return result;
				}, {});
				return resultObj;
			};

			service.getCompanyData=function(){
				var data=service.getDataSource()||{companies:null};
				if(data.hasOwnProperty('companies')&&data.companies){
					return data.companies;
				}
				return null;
			};
			service.getCompanyById=function(Id) {
				var len = service.companiesMap.length;
				var company = null;
				for (var i = 0; i < len; i++) {
					if (Id === service.companiesMap[i].id) {
						company = service.companiesMap[i];
						break;
					}
				}
				return company;
			};

			service.setRolesToCompany = function(selectedId) {
				var roleItems =service.companyRoles;
				service.selectedRole = null; // unselect previous
				if (roleItems && roleItems.length > 0) {
					var selectedItem;
					if (selectedId) {
						selectedItem = _.find(roleItems, {key: selectedId});
					}
					service.selectedRole = selectedItem || roleItems[0];
				}
			};
			service.setRoleData=function(company){
				var roleItems = service.getRolesToCompany(company);
				if(roleItems)
					service.companyRoles = roleItems;
				else
					service.companyRoles=null;
			};

			//init roles
			service.getRolesToCompany=function(node) {
				/* local function */
				function getRoleInfotoNode(roles) {
					var rolesInfo = [];
					_.forEach(roles.roleId, function (role) {
								// build roleInfo objet, take origin roleInfo and extend it with ClientId, indicating who is the owner
								// of the role permission record
								if (service.rolesLookup[role]) {
									var roleInfo = {};
									angular.extend(roleInfo, service.rolesLookup[role]);
									roleInfo.clientId = roles.clientId;
									rolesInfo.push(roleInfo);
								}
							}
					);
					return rolesInfo;
				}
				if (!node) {
					return null;
				}
				//console.log ('getRolesToParent', node);
				var theRoles = service.roles[node.id];
				if (theRoles) {
					return getRoleInfotoNode(theRoles);
				}
				if (node.parentId) {
					var parent = service.getCompanyById(node.parentId);
					return service.getRolesToCompany(parent);
				}
				return null;
			};
			/**
			 * @function getCompanyToSignedIn
			 * returns parent company to signedIn company,
			 * if signedIn itself is a company it will return itself
			 * @param signedInCompanyId
			 * @returns {*}
			 */
			service.getCompanyToSignedIn=function(signedInCompanyId) {
				var signedInCompany = service.getCompanyById(signedInCompanyId);
				if (signedInCompany && signedInCompany.companyType === 1 /*is mandant*/) {
					return signedInCompanyId;
				}
				if (signedInCompany.parentId) {
					return service.getCompanyToSignedIn(signedInCompany.parentId);
				}
				return null;
			};

			//service.setCompanyCurrentStatus = function(status){
			//	CurrentSattus = status;
			//};
            //
			//service.getCompanyCurrentStatus = function(){
			//	return CurrentSattus;
			//};

			return service;
		}]);
})(angular);