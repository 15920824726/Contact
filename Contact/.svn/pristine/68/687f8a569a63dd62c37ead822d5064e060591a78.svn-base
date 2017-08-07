/**
 * Created by edw on 6/20/2016.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.favorite';

    angular.module(moduleName).controller('favoriteController',
        ['$scope', 'commonFavoriteDataService', '$state', '$q','$translate','platformTranslateService',
            function ($scope, commonFavoriteDataService, $state, $q,$translate,platformTranslateService) {

                $scope.isShow=false;
                $scope.favoriteContactsData = [];

                $scope.delete = $translate.instant('favorite.delete');

                function loadTranslations() {
                    $scope.translate = platformTranslateService.instant({
                        favorite: ['noData']
                    });
                }


                $scope.skipDetail = function (contact) {
                    var data = {};
                    data.Email = contact.Email;
                    data.Name = contact.FirstName + " " + contact.FamilyName;
                    data.MobilePattern = contact.MobilePattern;
                    data.TelefaxPattern = contact.TelefaxPattern;
                    data.Telephone2Pattern = contact.Telephone2Pattern;
                    data.TelephonePattern = contact.TelephonePattern;
                    data.Title = contact.Title;
                    data.BpName=contact.BpName;
                    data.SubsidiaryDescription=contact.SubsidiaryDescription;
                    data.ImageData = contact.ImageData;
                    $state.go('desktop.favoritedetail', {data: data});

                };

                $scope.myDelete = function (contact) {
                    var Id = contact.ContextId;
                    var db = openDatabase('ContactApp', '1.0', 'ContactApp', 5 * 1024 * 1204);
                    if (db) {
                        commonFavoriteDataService.websqlDeleteOneDataById(db, Id);
                        $scope.getDate(db);

                    }
                    if($('#favoriteBtn').hasClass('add'+Id)){
                        $('#favoriteBtn').css('color','black');
                    }
                    if($('#contactFavoriteBtn').hasClass('add'+Id)){
                        $('#contactFavoriteBtn').css('color','black');
                    }

                };

                $scope.getDate = function (db) {

                   var selectSQL = 'SELECT * FROM contactsList';
                 //   var selectSQL='SELECT distinct id,FamilyName,FirstName,ContextId,Title,Email,MobilePattern,TelephonePattern,Telephone2Pattern,TelefaxPattern,ImageData FROM contactsList';
                    db.transaction(function (ctx, result) {
                        ctx.executeSql(selectSQL, [], function (ctx, result) {
                            console.log("get all information sucessful ");
                            if (result.rows.length >= 1) {
                                $scope.isShow=true;
                                var a = [];
                                //for (var i in result.rows) {
                                //    if ((typeof i) == "string" && isNaN(parseInt(i)) == false) {
                                //        a.push(result.rows[i]);
                                //    }
                                //}
                                for (var i=0;i<result.rows.length;i++) {
                                    a.push(result.rows.item(i))
                                }
                                $scope.$apply(function () {
                                    $scope.isShow=true;
                                    $scope.favoriteContactsData = a;
                                })

                            }
                            if (result.rows.length == 0) {

                                $scope.$apply(function () {
                                    $scope.isShow=false;
                                    $scope.favoriteContactsData = [];
                                })
                            }

                        }, function (ctx, result) {
                            console.log(result);
                            console.log("get all information false");
                        })

                    });

                };

                $scope.goToSettting = function () {
                    $state.go('setting.configSetting', {data: {from: 'desktop.favorite'}})
                };

                function Init() {
                    loadTranslations();
                    var db = openDatabase('ContactApp', '1.0', 'ContactApp', 5 * 1024 * 1204);
                    if (db) {
                        console.log("create table sucessful");
                        commonFavoriteDataService.websqlCreateTable(db);
                        $scope.getDate(db);
                    }
                }

                Init();
            }

        ]);
})(angular);