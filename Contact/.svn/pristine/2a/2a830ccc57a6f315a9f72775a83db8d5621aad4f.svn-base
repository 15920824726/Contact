/**
 * Created by yar on 6/22/2016.
 */
(function () {
    'use strict'

    var moduleName = 'App.favorite';

    /**
     * contact detail data service
     */
    angular.module(moduleName).factory('favoriteSqliteService',
        ['$q',
            function ($q) {

                var service = {};

                var config = {
                    //dbShortName: ['version'],
                    dbDisplayName: 'ContactApp',
                    maxSize: 5 * 1024 * 1024, //5Mb
                    tableList: [{
                        name: 'clients',
                        //id: 1,
                        fields: [
                            'clientId INTEGER PRIMARY KEY',
                            'favoriteId TEXT',
                            'createDate TIMESTAMP DEFAULT (datetime(\'now\',\'localtime\'))',
                            'lastModified TIMESTAMP DEFAULT (datetime(\'now\',\'localtime\'))'
                        ]
                    }
                        //    {
                        //    name: 'favorite',
                        //    //id: 2,
                        //    fields: [
                        //        'favoriteId INTEGER PRIMARY KEY',
                        //        'clientIdFK INTEGER',
                        //        'BusinessPartnerFk INTEGER',
                        //        'BusinessPartner nvarchar(50)',
                        //        'FamilyName nvarchar(50)',
                        //        'FirstName nvarchar(50)',
                        //        'Email nvarchar(100)',
                        //        'MobilePattern nvarchar(50)',
                        //        'TelefaxPattern nvarchar(50)',
                        //        'TelephonePattern nvarchar(50)',
                        //        'Telephone2Pattern nvarchar(50)',
                        //        //'imageData nvarchar(max)',
                        //        'createDate TIMESTAMP DEFAULT (datetime(\'now\',\'localtime\'))',
                        //        'lastModified TIMESTAMP DEFAULT (datetime(\'now\',\'localtime\'))'
                        //    ]
                        //}
                    ],
                    version: '1.0',
                    status: 1,
                    currentDbObj: null,
                };

                service.initDb = function () {
                    config.currentDbObj = openDatabase(config.dbDisplayName, config.version, config.dbDisplayName, config.maxSize);

                };

                service.createAllTables = function (db) {
                    if (!db) {
                        //service.getConfig();
                        //db = globals.sqliteDb;
                        db = config.currentDbObj;
                    }
                    //return;
                    var tables = config.tableList;
                    var me = this, defer = $q.defer(), result = 0;
                    for (var i in tables) {
                        (function () {
                            var t = tables[i];
                            me.promiseInsert("CREATE TABLE IF NOT EXISTS " + t.name + "(" + t.fields.join(',') + ")", [], db).then(function () {
                                result++;
                                if (tables.length == result) {
                                    defer.resolve(true);
                                }
                            }, function () {
                                defer.reject(false);
                            });
                        })();
                    }
                    return defer.promise;
                };

                service.promiseInsert = function (sql, data, db) {
                    var me = this;
                    var defer = $q.defer();
                    if (!db) {
                        //service.getConfig();
                        db = config.currentDbObj;
                    }
                    //return;
                    var result = [];
                    db.transaction(function (tx) {
                        tx.executeSql(sql, data,
                            function (tx, result) {
                                defer.resolve(true);
                            },
                            function (tx, error) {
                                console.log("error:" + error.message);
                                defer.reject(false);
                            });
                    });
                    return defer.promise;
                };

                service.promiseExecute = function (sql, db, backinfo, data) {
                    //Create menu
                    var defer = $q.defer();
                    if (!db) {
                        //service.getConfig();
                        db = config.currentDbObj;
                    }
                    //return;
                    var result = [];
                    data = data || [];
                    db.transaction(function (tx) {
                        tx.executeSql(sql, data, function (tx, rs) {
                            for (var i = 0; i < rs.rows.length; i++) {
                                var row = rs.rows.item(i);
                                result[i] = row;
                            }
                            defer.resolve({
                                data: result,
                                info: backinfo
                            });
                        }, function (tx, error) {
                            console.log("error:" + error.message);
                            defer.reject(error);
                        });
                    });
                    return defer.promise;
                };

                service.getClients = function (clientId) {
                    var selectClientSql = "select * from clients where clientId = '" + clientId + "'";
                    var client = this.promiseExecute(selectClientSql, '', 'success');
                    return client;
                };


                service.updateClientsFavoriteId = function (clientId, favoriteId, update) {
                    var sql = "INSERT INTO clients (favoriteId,clientId) VALUES (?,?)";
                    var data = [favoriteId, clientId];
                    if (update) {
                        sql = "UPDATE clients SET favoriteId = ? WHERE clientId = ?";
                    }
                    return this.promiseInsert(sql, data);
                };



                return service;

            }]);
})(angular);