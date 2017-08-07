/**
 * Created by edw on 6/21/2016.
 */
(function () {
    'use strict';
    angular.module('App.common').factory('commonFavoriteDataService',
        ['$http',
            function ($http) {
                var service = {};


                //  opendatabase
                service.websqlOpenDB = function (dbname) {
                    var db = openDatabase(dbname, '1.0', 'Contact App', 5 * 1024 * 1024);
                    if (db) {
                        console.log("open database sucessful")
                    } else {
                        alert("open database false ");
                    }
                    return db;
                };


                //  drop table
                service.DropTable = function (db) {
                    db.transaction(function (ctx) {
                        ctx.executeSql('drop table contactsList ');
                    });

                };


                //  create table
                service.websqlCreateTable = function (db) {
                    var creatTableSQL = 'CREATE TABLE IF NOT EXISTS  contactsList' +
                        ' (id INTEGER PRIMARY KEY AUTOINCREMENT ,FamilyName nvarchar(50),FirstName nvarchar(50),ContextId int, Title nvarchar(50),BpName varchar(50),SubsidiaryDescription varchar(50),Email varchar(50),MobilePattern varchar(50) ,' +
                        'TelephonePattern varchar(50) ,Telephone2Pattern varchar(50),TelefaxPattern varchar(50),ImageData text)';
                    db.transaction(function (ctx, result) {
                        ctx.executeSql(creatTableSQL, [], function (ctx, result) {
                            console.log("create table sucessful");
                        }, function (ctx, result) {
                            console.log("create table false");
                        })
                    });
                };

                //Add
                service.websqlInsertData = function (database, contact, contactid) {
                    var inserTableSQL = ' INSERT INTO contactsList (FamilyName,FirstName,ContextId,Title,BpName,SubsidiaryDescription,Email,MobilePattern,TelephonePattern,Telephone2Pattern,TelefaxPattern,ImageData ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ';
                    //  var newinsertSQL='ALTER TABLE clients ADD FamilyName, FirstName,ContextId ,Title';
                    database.transaction(function (ctx, result) {
                        ctx.executeSql(inserTableSQL, [contact.FamilyName, contact.FirstName, contactid, contact.role,contact.bpname,contact.subsidiaryDescription, contact.Email, contact.MobilePattern, contact.TelephonePattern, contact.Telephone2Pattern, contact.TelefaxPattern, contact.imageData], function (ctx, result) {
                            console.log("Insert into table sucessful");
                        }, function (ctx, result) {
                            console.log(result);
                            console.log("insert into table false");
                        })
                    });

                };

                //Get one information
                service.websqlGetOneDateById = function (db, contactid) {
                    var selectSQL = 'SELECT * FROM ' + contactsList + ' WHERE  ContextId = ?';
                    db.transaction(function (ctx, result) {
                        ctx.executeSql(selectSQL, [contactid], function (ctx, result) {
                            console.log("get one information from table sucessful");
                        }, function (ctx, result) {
                            console.log(result);
                            console.log("get one information from table false");
                        })
                    });
                };

                //Get all data
                service.websqlGetAllDate = function (db) {
                    var selectSQL = 'SELECT * FROM contactsList';
                    db.transaction(function (ctx, result) {
                        ctx.executeSql(selectSQL, [], function (ctx, result) {
                            console.log("get all information sucessful");
                        }, function (ctx, result) {
                            console.log(result);
                            console.log("get all information false");
                        })

                    });

                };


                //Delete one data
                service.websqlDeleteOneDataById = function (db, contactid) {
                    var deleteSQL = 'Delete From contactsList WHERE ContextId = ?';
                    db.transaction(function (ctx, result) {
                        ctx.executeSql(deleteSQL, [contactid], function (ctx, result) {
                            console.log("delete one information form table sucessful");
                        }, function (ctx, result) {
                            console.log(result);
                            console.log("delete one information form table false");
                        })

                    });

                };

                //Delete All Data
                service.websqlDeleteAllData = function () {
                    var deleteSQL = 'Delete From contactsList';
                    db.transaction(function (ctx, result) {
                        ctx.executeSql(deleteSQL, [], function (ctx, result) {
                            console.log("delete all information form table sucessful");
                        }, function (ctx, result) {
                            console.log(result);
                            console.log("delete all information form table sucessful");
                        })

                    });

                };

                //Update
                service.websqlUpdateData = function () {


                };

                return service;
            }
        ]);

})(angular);