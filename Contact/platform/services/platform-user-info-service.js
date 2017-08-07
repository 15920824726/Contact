/*
 * $Id: platform-user-info-service.js 317496 2015-07-14 12:10:10Z kh $
 * Copyright (c) RIB Software AG
 */

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
  angular.module('platform').factory('platformUserInfoService', platformUserInfoService);

  platformUserInfoService.$inject = ['$http', '$q', '_'];

  function platformUserInfoService($http, $q, _) {
    var loadedUsers = {};
    var service = {};

    /**
     * @ngdoc function
     * @name loadUsers
     * @function
     * @methodOf platform.platformUserInfoService
     * @description loads given user id(s)
     * @param ids {integer|array} user id(s) to be loaded
     * @returns {promise} resolved when users info is available for lookup
     */
    service.loadUsers = function loadUsers(ids) {
      if (!!ids) {
        var data = [];

        _.each(_.isArray(ids) ? ids : [ids], function (id) {
          if (_.isUndefined(loadedUsers[id])) {
            data.push(id);
          }
        });

        if (data.length) {
          var promise = $http.post(globals.appBaseUrl + 'services/platform/loaduserinfobyid', data)
            .then(function (result) {
              _.each(result.data, function (item) {
                loadedUsers[item.id] = item;
              });

              return true;
            }, function () {
              _.each(data, function (id) {
                loadedUsers[id] = '';
              });

              return false;
            });

          _.each(data, function (id) {
            loadedUsers[id] = promise;
          });

          return promise;
        }
      }

      return $q.when(true);
    };

    /**
     * @ngdoc function
     * @name logonName
     * @function
     * @methodOf platform.platformUserInfoService
     * @description retrieve logon name for given id
     * @param id {integer} user's id
     * @returns {string|promise} logon name for given id or promise when loading
     */
    service.logonName = function logonName(id) {
      return loadedUsers[id] ? loadedUsers[id].name : null;
    };

    return service;
  }
})();
