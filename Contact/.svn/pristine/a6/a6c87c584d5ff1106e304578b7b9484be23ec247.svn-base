/**
 * Created by edw on 2016/6/20.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.project';

    angular.module(moduleName).controller('projectController',
        ['$scope', 'projectListDataService', '$timeout', 'platformsLocalSessionStorageService',
            'platformsDesService', '$state', '$ionicLoading','commonProjectDataService','platformTranslateService',
            function ($scope, projectListDataService, $timeout, platformsLocalSessionStorageService,
                      platformsDesService, $state, $ionicLoading,commonProjectDataService,platformTranslateService ) {

                $scope.projectListData = [];
                $scope.options = {
                    parameters: '',
                    ExecutionHints: false,
                    IncludeNonActiveItems: false,
                    PageNumber: 0,
                    PageSize: 10,
                    Pattern: "",
                    orderBy: [{Field: "ProjectName", Desc: false}],
                    start: 0,
                    UseCurrentClient:true

                };

                $scope.translate = platformTranslateService.instant({
                    projectDetail: ["toSearch"]
                });

                $scope.moreProject = true;

                $scope.Search = function () {
                    commonProjectDataService.setProjectName($scope.options.Pattern);
                    $scope.options.PageNumber = 0;
                    $scope.projectListData = [];
                    $scope.moreProject = true;
                    console.log($scope.options.Pattern);
                    loadData();
                };
                //$scope.$watch('options.Pattern',function(newvalue){
                //    if(!newvalue ||newvalue.length==0)
                //        return $scope.options.Pattern="";
                //    $scope.options.PageNumber=0;
                //    $scope.projectListData = [];
                //    $scope.moreProject = true;
                //    console.log($scope.options.Pattern);
                //    loadData();
                //});


                $scope.skipContact = function (project) {
                    var data = {};
                    data.contactFk=project.contactFk?project.contactFk:'';
                    data.addressLine=project.addressLine?project.addressLine:'';
                    data.projectNo=project.projectNo?project.projectNo:'';
                    data.projectName=project.projectName?project.projectName:'';
                    data.bpName1=project.bpName1?project.bpName1:'';
                    data.telephone=project.telephone?project.telephone:'';
                    data.mobile=project.mobile?project.mobile:'';
                    data.telefax=project.telefax?project.telefax:'';
                    data.firstName =  project.firstName ?project.firstName:'';
                    data.familyName=project.familyName?project.familyName:'';
                    data.contactRoleDescription=project.contactRoleDescription?project.contactRoleDescription:'';

                    data.address={
                        'addressLine':project.addressLine?project.addressLine:'',
                        'latitude':project.latitude?project.latitude:'',
                        'longitude':project.longitude?project.longitude:''
                    }

                    $state.go('desktop.projectdetails', {data: data});
                };

                function showLoading() {
                    var loadingOptions = {
                        duration: 5000
                    };
                    $ionicLoading.show(loadingOptions);
                }

                function hideLoading() {
                    $ionicLoading.hide();
                }

                $scope.skipeDetail = function (project) {
                    $state.go('desktop.projectdetails', {data: project});
                };

                $scope.skipCancel = function () {
                    commonProjectDataService.setProjectName('');
                    $scope.options.PageNumber = 0;
                    $scope.projectListData = [];
                    $scope.moreProject = true;
                    $scope.options.Pattern = "";
                    loadData();
                };

                function loadData() {
                    showLoading();
                    projectListDataService.getProjectList($scope.options).then(function (data) {
                        if (data.length > 0) {
                            if ($scope.options.Pattern != "") {
                                var Pattern = new RegExp($scope.options.Pattern, "i");
                                data.map(function (item, index) {
                                    //  return item.ownDefine = filterSearchData(item, Pattern) ? filterSearchData(item, Pattern) : null;
                                    if (item.projectName || item.projectNo) {
                                        if (Pattern.exec(item.projectName)) {
                                            //$scope.hasPattern = false;
                                            return item.ownDefine = {
                                                value: item.projectName,
                                            };

                                        }

                                        if (Pattern.exec(item.projectNo)) {
                                            //$scope.hasPattern = false;
                                            return item.ownDefine = {
                                                value: 'projectNo : ' + item.projectNo,
                                                state: true
                                            };
                                        }
                                    }

                                    if (item.telephone || item.addressLine || item.telephonePattern || item.email || item.mobile ||
                                        item.mobilePattern || item.familyName || item.firstName || item.bpName1 ||item.matchCode) {
                                        if (Pattern.exec(item.telephone)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.telephone,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.addressLine)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.addressLine,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.telephonePattern)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.telephonePattern,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.email)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.email,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.mobile)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.mobile,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.matchCode)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.matchCode,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.mobilePattern)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.mobilePattern,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.familyName)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine = {
                                                value: item.firstName + " " + item.familyName,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.firstName)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.firstName + " " + item.familyName,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.bpName1)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.bpName1,
                                                state: true
                                            };
                                        }
                                    }
                                });
                            } else {
                                $scope.hasPattern = false;
                            }
                            $scope.options.PageNumber++;
                            $scope.projectListData = $scope.projectListData.concat(data);
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        } else {
                            $scope.moreProject = false;
                        }
                        hideLoading();
                    }, function () {
                        $scope.moreProject = false;
                        $ionicLoading.hide();
                    })
                }

                function loadDataMore() {
                    projectListDataService.getProjectList($scope.options).then(function (data) {
                        if (data.length > 0) {
                            if ($scope.options.Pattern != "") {
                                var Pattern = new RegExp($scope.options.Pattern, "i");
                                data.map(function (item, index) {
                                    //  return item.ownDefine = filterSearchData(item, Pattern) ? filterSearchData(item, Pattern) : null;
                                    if (item.projectName || item.projectNo) {
                                        if (Pattern.exec(item.projectName)) {
                                            //$scope.hasPattern = false;
                                            return item.ownDefine = {
                                                value: item.projectName,
                                            };

                                        }

                                        if (Pattern.exec(item.projectNo)) {
                                            //$scope.hasPattern = false;
                                            return item.ownDefine = {
                                                value: 'projectNo : ' + item.projectNo,
                                                state: true
                                            };
                                        }
                                    }

                                    if (item.telephone || item.addressLine || item.telephonePattern || item.email || item.mobile ||
                                        item.mobilePattern || item.familyName || item.firstName || item.bpName1 ||item.matchCode) {
                                        if (Pattern.exec(item.telephone)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.telephone,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.addressLine)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.addressLine,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.telephonePattern)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.telephonePattern,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.email)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.email,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.mobile)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.mobile,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.matchCode)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.matchCode,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.mobilePattern)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.mobilePattern,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.familyName)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine = {
                                                value: item.firstName + " " + item.familyName,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.firstName)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.firstName + " " + item.familyName,
                                                state: true
                                            };
                                        }
                                        if (Pattern.exec(item.bpName1)) {
                                            //$scope.hasPattern = true;
                                            return item.ownDefine =  {
                                                value: item.bpName1,
                                                state: true
                                            };
                                        }
                                    }
                                });
                            } else {
                                $scope.hasPattern = false;
                            }
                            $scope.options.PageNumber++;
                            $scope.projectListData = $scope.projectListData.concat(data);
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        } else {
                            $scope.moreProject = false;
                        }
                        hideLoading();
                    }, function () {
                        $scope.moreProject = false;
                    })
                }

                $scope.$on('ngRepeatFinished', function () {
                    //if ($scope.options.Pattern != "") {
                    //    var pa = $scope.options.Pattern;
                    //    var node = $('#projectlist ion-list .projectPattern1');
                    //    for (var i = 0; i < node.length; i++) {
                    //        var contactParrnt = jQuery(node[i]).text().replace(pa, "<span style=\" color:red\">" + pa + "</span>");
                    //        jQuery(node).html(contactParrnt);
                    //    }
                    //}
                    if ($scope.options.Pattern != "") {
                        var Pattern = new RegExp($scope.options.Pattern, "i");
                        var node = $('#projectlist ion-list .projectPattern');
                        for (var i = 0; i < node.length; i++) {
                            var value = Pattern.exec(jQuery(node[i]).text());
                            if (value) {
                                var contactParrnt = jQuery(node[i]).text().replace(value[0], "<span style=\" color:red\">" + value[0] + "</span>");
                                jQuery(node[i]).html(contactParrnt);
                            }
                        }
                    }
                });

                $scope.loadMore = function () {
                    var selectedname = globals.getSelectedCompanyNameKey();
                    var obj = JSON.parse(localStorage.getItem(selectedname));
                    $scope.selectcompanyname = obj.code + " " + obj.name;
                    $timeout(loadDataMore(), 1000);
                };

                $scope.goToSettting = function () {
                    $state.go('setting.configSetting', {data: {from: 'desktop.project'}})
                };

                function init() {
                   if(commonProjectDataService.returnProjectName()){
                       $scope.options.Pattern= commonProjectDataService.returnProjectName()
                   }
                    $scope.loadMore();
                }

                init();
            }]);
})(angular);