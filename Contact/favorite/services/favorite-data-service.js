/**
 * Created by edw on 6/22/2016.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.favorite';

    /**
     * contact detail data service
     */
    angular.module(moduleName).factory('favoriteDataService',
        ['$q', 'favoriteSqliteService', 'commonFavoriteDataService',
            function ($q, favoriteSqliteService, commonFavoriteDataService) {

                var service = {};

                service.getClientsFavoriteIds = function (clientId) {
                    var defer = $q.defer();
                    favoriteSqliteService.getClients(clientId).then(function (data) {
                        try {
                            if (data && data.data.length === 0) {
                                defer.reject();
                            } else if (data && data.data.length > 0) {
                                commonFavoriteDataService.setDataSource(data);
                                var favoriteIds = data.data[0].favoriteId.split(',');
                                defer.resolve(favoriteIds);
                            } else {
                                defer.reject();
                            }

                            defer.resolve(favoriteIds);
                        } catch (error) {
                            defer.reject(false);
                        }

                    }, function () {
                        defer.reject();
                    });
                    return defer.promise;
                };

                return service;

            }]);
})(angular);