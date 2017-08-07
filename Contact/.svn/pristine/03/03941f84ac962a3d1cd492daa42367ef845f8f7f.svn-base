/**
 * Created by hot on 2016-6-15.
 */

(function (angular) {
    'use strict';

    var moduleName = 'App.contacts';

    /* jshint -W072 */ // many parameters because of dependency injection
    angular.module(moduleName).controller('contactsListController',
        ['$scope','$rootScope',
            '$http',
            'contactsListDataService',
            '$ionicLoading',
            '$timeout',
            'commonContactlistDataService',
            '$state',
            '$ionicScrollDelegate', 'contactListSummaryService','platformTranslateService',
            //'platformDeviceHelper',
            function ($scope,$rootScope,
                      $http,
                      contactDataService,
                      $ionicLoading,
                      $timeout,
                      commonContactlistDataService,
                      $state,
                      $ionicScrollDelegate, contactListSummaryService,platformTranslateService
                      //platformDeviceHelper
            ) {


                $scope.controllSearch = function () {
                    alert(0);
                };

                $scope.contacts = [];


                $scope.totalRecords = 0;
                $scope.totalLoadRecords = 0;
                $scope.hasPattern = false;
                $scope.hascontact=true;
                $scope.options = {
                    Pattern: '',
                    PageNumber: 0,
                    start: 0,
                    PageSize: 10,
                    ExecutionHints: true,
                    IncludeNonActiveItems: false,
                    orderBy: [{
                        'Field': 'FirstName',
                        'Desc': false
                    }],
                    CompanyCode: 101
                };

                $scope.newOptions = {
                    FilterRequest: {
                        Pattern: '',
                        PageNumber: 0,
                        start: 0,
                        PageSize: 15,
                        ExecutionHints: true,
                        UseCurrentClient:false,
                        IncludeNonActiveItems: false
                    },
                    CompanyCode: ''
                };

                function loadTranslations() {
                    $scope.translate = platformTranslateService.instant({
                        contactDetail: ['Telephone','OtherTelephone', 'Mobile', 'message', 'Fax', 'Email', 'Favorite', 'Edit'
                            , 'FirstName', 'FamilyName', 'MobilePhone', 'Add', 'Update','Success','Failure', 'InputTelephone',
                            'Country', 'AreaCode', 'PhoneNumber','Extension','Ok','toSearch','NoMatchesFound']
                    });
                }


                $scope.skipCancel = function () {
                    commonContactlistDataService.setParrent('');
                    $scope.newOptions.FilterRequest.Pattern = '';
                    $scope.newOptions.FilterRequest.PageNumber = 0;
                    $scope.contacts = [];
                    $scope.moreContact = true;
                    loadData();
                };

                $scope.moreContact = true;

                $scope.doRefresh = function () {
                    $timeout($scope.$broadcast('scroll.refreshComplete'), 1000);
                };

                function showLoading() {
                    var loadingOptions = {
                       duration: 6000
                    };
                    $ionicLoading.show(loadingOptions);
                }

                function hideLoading() {
                    $ionicLoading.hide();
                }


                $scope.search = function () {
                  //cordova.plugins.Keyboard.disableScroll(true);
                    commonContactlistDataService.setParrent($scope.newOptions.FilterRequest.Pattern);
                    $scope.newOptions.FilterRequest.PageNumber = 0;
                    $scope.contacts = [];
                    $scope.moreContact = true;
                    loadData();

                };

                $scope.clear = function () {
                    $scope.options.Pattern = '';
                };




                function loadData() {
                    showLoading();
                    $scope.newOptions.CompanyCode = JSON.parse(localStorage.getItem("companyName")).code;
                    contactListSummaryService.getContactListSummary($scope.newOptions).then(function (data) {

                        if (data.length) {
                            if (data.length < $scope.newOptions.FilterRequest.PageSize) {
                                $scope.moreContact = false;
                            }
                            if ($scope.newOptions.FilterRequest.Pattern != "") {
                                var Pattern = new RegExp($scope.newOptions.FilterRequest.Pattern,"i");

                                data.map(function (item, index) {
                                  //  return item.ownDefine = filterSearchData(item, Pattern) ? filterSearchData(item, Pattern) : null;
                                    if (item.familyName || item.firstName) {
                                        if (Pattern.exec(item.familyName)) {
                                            return item.ownDefine ={value: item.firstName+" "+item.familyName
                                                ,state:false}   ;
                                        }
                                        if (Pattern.exec(item.firstName)) {
                                            $scope.hasPattern = false;
                                            return item.ownDefine =  {value: item.firstName +" "+ item.familyName
                                                ,state:false}
                                        }
                                    }

                                    if (item.bpName1) {
                                        if (Pattern.exec(item.bpName1)) {
                                            $scope.hasPattern = false;
                                            return item.ownDefine = {value:  item.bpName1
                                                ,state:false};
                                        }
                                    }
                                    if (item.addressLine) {
                                        if (Pattern.exec(item.addressLine)) {
                                            //$scope.hasPattern = true;
                                            //return item.ownDefine = item.addressLine;
                                            return item.ownDefine ={value: item.addressLine
                                                ,state:true}
                                        }
                                    }
                                    if (item.email) {
                                        if (Pattern.exec(item.email)) {
                                            return item.ownDefine ={value: item.email
                                                ,state:true}
                                        }
                                    }
                                    if (item.mobile) {
                                        if (Pattern.exec(item.mobile)) {
                                            return item.ownDefine ={value: item.mobile
                                                ,state:true}
                                        }
                                    }
                                    if (item.telephone) {
                                        if (Pattern.exec(item.telephone)) {
                                            return item.ownDefine ={value: item.telephone
                                                ,state:true}
                                        }
                                    }
                                    if (item.telephonePattern) {
                                        if (Pattern.exec(item.telephonePattern)) {
                                            return item.ownDefine ={value: item.telephonePattern
                                                ,state:true}
                                        }
                                    }
                                    if (item.mobilePattern) {
                                        if (Pattern.exec(item.mobilePattern)) {
                                            return item.ownDefine ={value: item.mobilePattern
                                                ,state:true}
                                        }
                                    }

                                });
                            }else {
                                //$scope.hasPattern = false;
                                data.map(function (item, index) {
                                    return item.ownDefine ={
                                        value: ''
                                        ,state:false
                                    };

                                })
                            }

                            $scope.hascontact=true;
                            $scope.newOptions.FilterRequest.PageNumber++;
                            $scope.contacts = $scope.contacts.concat(data);
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            $scope.totalRecords = commonContactlistDataService.getTotalRecords();
                            $scope.totalLoadRecords = $scope.contacts.length;
                            hideLoading();

                        } else {
                            $scope.hascontact=false;
                            $scope.moreContact = false;
                        }
                        hideLoading();

                    }, function (error) {
                        hideLoading();
                        $scope.moreContact = false;
                    });
                }

                function loadDataMore(){
                    $scope.newOptions.CompanyCode = JSON.parse(localStorage.getItem("companyName")).code;
                    contactListSummaryService.getContactListSummary($scope.newOptions).then(function (data) {
                        if (data.length) {
                            $scope.hascontact=true;
                            if (data.length < $scope.newOptions.FilterRequest.PageSize) {
                                $scope.moreContact = false;
                            }

                            if ($scope.newOptions.FilterRequest.Pattern != "") {
                                var Pattern = new RegExp($scope.newOptions.FilterRequest.Pattern,"i");

                                data.map(function (item, index) {
                                    //  return item.ownDefine = filterSearchData(item, Pattern) ? filterSearchData(item, Pattern) : null;
                                    if (item.familyName || item.firstName) {
                                        if (Pattern.exec(item.familyName)) {
                                            return item.ownDefine ={value: item.firstName+" "+item.familyName
                                                ,state:false}   ;
                                        }
                                        if (Pattern.exec(item.firstName)) {
                                            $scope.hasPattern = false;
                                            return item.ownDefine =  {value: item.firstName +" "+ item.familyName
                                                ,state:false}
                                        }
                                    }

                                    if (item.bpName1) {
                                        if (Pattern.exec(item.bpName1)) {
                                            $scope.hasPattern = false;
                                            return item.ownDefine = {value:  item.bpName1
                                                ,state:false};
                                        }
                                    }
                                    if (item.addressLine) {
                                        if (Pattern.exec(item.addressLine)) {
                                            //$scope.hasPattern = true;
                                            //return item.ownDefine = item.addressLine;
                                            return item.ownDefine ={value: item.addressLine
                                                ,state:true}
                                        }
                                    }
                                    if (item.email) {
                                        if (Pattern.exec(item.email)) {
                                            return item.ownDefine ={value: item.email
                                                ,state:true}
                                        }
                                    }
                                    if (item.mobile) {
                                        if (Pattern.exec(item.mobile)) {
                                            return item.ownDefine ={value: item.mobile
                                                ,state:true}
                                        }
                                    }
                                    if (item.telephone) {
                                        if (Pattern.exec(item.telephone)) {
                                            return item.ownDefine ={value: item.telephone
                                                ,state:true}
                                        }
                                    }
                                    if (item.telephonePattern) {
                                        if (Pattern.exec(item.telephonePattern)) {
                                            return item.ownDefine ={value: item.telephonePattern
                                                ,state:true}
                                        }
                                    }
                                    if (item.mobilePattern) {
                                        if (Pattern.exec(item.mobilePattern)) {
                                            return item.ownDefine ={value: item.mobilePattern
                                                ,state:true}
                                        }
                                    }

                                });
                            }else {
                                //$scope.hasPattern = false;
                                data.map(function (item, index) {
                                    return item.ownDefine ={
                                        value: ''
                                        ,state:false
                                    };

                                })
                            }


                            $scope.newOptions.FilterRequest.PageNumber++;
                            $scope.contacts = $scope.contacts.concat(data);
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            $scope.totalRecords = commonContactlistDataService.getTotalRecords();
                            $scope.totalLoadRecords = $scope.contacts.length;
                            hideLoading();

                        } else {
                            $scope.moreContact = false;
                             $scope.hascontact=false;

                        }

                        hideLoading();

                    }, function (error) {
                        $scope.moreContact = false;
                    })
                }

                $scope.goToSettting = function () {
                    $state.go('setting.configSetting', {data: {from: 'desktop.contact'}})
                };

                $scope.loadMore = function () {
                    $timeout(loadDataMore(), 3000);
                };


                function init() {
                    loadTranslations();
                    if(commonContactlistDataService.returnParrent()){
                        $scope.newOptions.FilterRequest.Pattern= commonContactlistDataService.returnParrent();
                    }
                    loadData();
                }

                $scope.$on('ngRepeatFinished', function () {
                    if($scope.newOptions.FilterRequest.Pattern!=""){
                        var pa=$scope.newOptions.FilterRequest.Pattern;
                        var Pattern = new RegExp($scope.newOptions.FilterRequest.Pattern,"i");
                        var node=  $('#contacts-list ion-list .contactParrnt');
                        var node1=$('#contacts-list ion-list .ctParrent');

                        for(var i=0;i<node.length;i++){
                            var value=Pattern.exec( jQuery(node[i]).text());
                            if(value ){
                                var contactParrnt = jQuery(node[i]).text().replace(pa, "<span style=\" color:red;font-weight: bold\">" + pa + "</span>") ;
                                jQuery(node[i]).html(contactParrnt);
                            }
                            }

                        for(var i=0;i<node1.length;i++){
                            var value=Pattern.exec( jQuery(node1[i]).text());
                            if(value ){
                                var contactParrnt = jQuery(node1[i]).text().replace(value[0], "<span style=\" color:red ;font-weight: bold;\">" + value[0] + "</span>") ;
                                jQuery(node1[i]).html(contactParrnt);
                            }
                        }
                    }
                });


                init();
            }]);

})(angular);
