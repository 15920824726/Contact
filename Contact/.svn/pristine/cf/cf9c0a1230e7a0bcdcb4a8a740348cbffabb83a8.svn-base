/**
 * Created by mobilityimac1 on 10/14/16.
 */
(function(){
	'use strict';

	angular.module('App.common').factory('commonMapKey',function($http){

		var service={};

		service.getMapkey=function(){
			return $http.get(globals.server+'/basics/common/systemoption/map');
		}

		return service;

	});



})(angular)