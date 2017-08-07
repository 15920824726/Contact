/**
 * Created by yar on 6/20/2016.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.desktop';

    angular.module(moduleName).controller('desktopController',
        ['$scope', 'platformTranslateService','$translate',
            function ($scope, platformTranslateService,$translate) {



                // function initSqlite(){
                //     favoriteSqliteService.initDb();
                //     favoriteSqliteService.createAllTables();
                // }



                //platformSQLiteService.promiseInsertsEx('Insert into boqs (id,projectId,bqno,uom,name) values (?,?,?,?,?)', rows, globals.sqliteDb);

                function getAllTranslation() {
                    $scope.title = {
                        project: $translate.instant('deskTop.project'),
                        contacts: $translate.instant('deskTop.contacts'),
                        businessPartner: $translate.instant('deskTop.businessPartner'),
                        favorite: $translate.instant('deskTop.favorite')
                    };
                }

                function init(){
                    platformTranslateService.translationChanged.register(getAllTranslation);

                    platformTranslateService.registerModule('desktop', true).then(function () {
                        getAllTranslation();
                    });
                    //initSqlite();
                }
                init();


                // loads or updates translated strings
                //var loadTranslations = function () {
                //    // $log.debug('loadTranslations called', logonService.getUiLanguages());
                //    // load translation of tile-group definition
                //    $scope.text = platformTranslateService.instant({
                //        desktop: ['project', 'contacts', 'businessPartner', 'settings']
                //    });
                //
                //
                //};
                //
                //// register translation changed event
                //platformTranslateService.translationChanged.register(loadTranslations);
                //
                //// register a module - translation table will be reloaded if module isn't available yet
                //if (!platformTranslateService.registerModule('desktop')) {
                //    // if translation is already available, call loadTranslation directly
                //    loadTranslations();
                //}

                $scope.$on('$destroy', function () {
                    platformTranslateService.translationChanged.unregister(getAllTranslation);
                });
            }]);
})(angular);