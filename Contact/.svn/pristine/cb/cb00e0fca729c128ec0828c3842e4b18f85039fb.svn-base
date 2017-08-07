/**
 * Created by yar on 6/20/2016.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.business.partner';

    angular.module(moduleName).controller('businessPartnerController',
        ['$scope', 'businessPartnerDataService', '$timeout',
            '$ionicLoading', 'commonBusinessPartnerDataService', 'platformTranslateService', 'bpSummaryListDataService','$state',
            function ($scope, businessPartnerDataService, $timeout,
                      $ionicLoading, commonBusinessPartnerDataService, platformTranslateService, bpSummaryListDataService,$state) {

                //$scope.deviceHelper = platformDeviceHelper;
                $scope.businessPartners = [];

                $scope.hasBusinessPartner=true;
                $scope.totalRecords = 0;
                $scope.totalLoadRecords = 0;
                $scope.options = {
                    FilterRequest: {
                        Pattern: '',
                        PageNumber: 0,
                        start: 0,
                        PageSize: 10,
                        ExecutionHints: false,
                        UseCurrentClient:false,
                        IncludeNonActiveItems: false,
                        orderBy: [{
                            'Field': 'BusinessPartnerName1'
                        }]
                    },
                    CompanyCode: ''
                };

                $scope.moreBusinessPartner = true;
                $scope.hasParrent=false;

                function loadTranslations() {
                    $scope.translate = platformTranslateService.instant({
                        businessPartner: ['toSearch','NoMatchesFound']
                    });
                }

                function showLoading() {
                    var loadingOptions = {
                        duration: 5000
                    };
                    $ionicLoading.show(loadingOptions);
                }

                function hideLoading() {
                    $ionicLoading.hide();
                }

                $scope.skipContactList=function(id,name){
                    commonBusinessPartnerDataService.setBpName(name);
                    $state.go('desktop.businessPartnerContactList',{'businessPartnerId':id})
                }

                $scope.skipCancel = function () {
                    commonBusinessPartnerDataService.setParrent('');
                    $scope.options.FilterRequest.Pattern = '';
                    $scope.options.FilterRequest.PageNumber = 0;
                    $scope.moreBusinessPartner = true;
                    $scope.businessPartners = [];
                    loadData();
                };

                $scope.search = function () {
                    commonBusinessPartnerDataService.setParrent($scope.options.FilterRequest.Pattern);
                    $scope.options.FilterRequest.PageNumber = 0;
                    $scope.businessPartners = [];
                    $scope.moreContact = true;
                    loadData();
                };

                $scope.goToSettting = function () {
                    $state.go('setting.configSetting', {data: {from: 'desktop.businessPartner'}})
                };

                function loadData() {
                    showLoading();
                    $scope.options.CompanyCode = JSON.parse(localStorage.getItem("companyName")).code;
                    $scope.options.SlectCompany=JSON.parse(localStorage.getItem("companyName")).name;
                    bpSummaryListDataService.getBpListSummary($scope.options).then(function (data) {
                        // $scope.businessPartners=data;
                        if (data.length > 0) {
                            $scope.hasBusinessPartner=true;
                            if (data.length < $scope.options.PageSize) {
                                $scope.moreBusinessPartner = false;
                            }
                            //filter data no firstname or familyname
                            //data=data.filter(function(item,index){
                            //    return item.businessPartnerName1 || item.businessPartnerName2;
                            //})

                            if ($scope.options.FilterRequest.Pattern != "") {
                                var Pattern = new RegExp($scope.options.FilterRequest.Pattern,"i");
                                data.map(function (item, index) {
                                    //  return item.ownDefine = filterSearchData(item, Pattern) ? filterSearchData(item, Pattern) : null;
                                    if (item.businessPartnerName1 || item.businessPartnerName2) {
                                        if (Pattern.exec(item.businessPartnerName1)) {
                                            return item.ownDefine = {value: item.businessPartnerName1
                                                ,state:false};
                                        }

                                        if (Pattern.exec(item.businessPartnerName2)) {
                                            return item.ownDefine = {value: item.businessPartnerName2
                                                ,state:false};
                                        }
                                    }

                                    if (item.telephone || item.addressLine || item.telephonePattern || item.email || item.mobile ||item.mobilePattern ||item.matchCode) {
                                        if (Pattern.exec(item.telephone)) {
                                            return item.ownDefine ={value: item.telephone
                                                ,state:true};
                                        }
                                        if (Pattern.exec(item.addressLine)) {
                                            return item.ownDefine = {value: item.addressLine
                                                ,state:true};
                                        }
                                        if (Pattern.exec(item.telephonePattern)) {
                                            return item.ownDefine = {value: item.telephonePattern
                                                ,state:true};
                                        }
                                        if (Pattern.exec(item.matchCode)) {
                                            return item.ownDefine = {value: item.matchCode
                                                ,state:true};
                                        }
                                        if (Pattern.exec(item.email)) {
                                         return   item.ownDefine ={value: item.email
                                                ,state:true};
                                        }
                                        if (Pattern.exec(item.mobile)) {
                                            return item.ownDefine = {value: item.mobile
                                                ,state:true};
                                        }
                                        if (Pattern.exec(item.mobilePattern)) {
                                            return item.ownDefine = {value: item.mobilePattern
                                                ,state:true};
                                        }
                                    }
                                });
                            }else {
                               data.map( function(item,index){
                                   //if(item.businessPartnerName2==''){
                                   //    item.businessPartnerName2='&nbsp';
                                   //}
                                   return item.ownDefine = {value: '',state:false};
                               });
                            }

                            $scope.options.FilterRequest.PageNumber++;
                            $scope.businessPartners = $scope.businessPartners.concat(data);
                            $scope.$broadcast('scroll.infiniteScrollComplete');

                        } else {
                            $scope.hasBusinessPartner=false;
                            $scope.moreBusinessPartner = false;
                        }
                        hideLoading();
                    }, function () {
                        hideLoading();
                    })


                }

                function loadDataMore() {
                    $scope.options.CompanyCode = JSON.parse(localStorage.getItem("companyName")).code;
                    $scope.options.SlectCompany=JSON.parse(localStorage.getItem("companyName")).name;
                    bpSummaryListDataService.getBpListSummary($scope.options).then(function (data) {
                        // $scope.businessPartners=data;
                        if (data.length > 0) {
                            if (data.length < $scope.options.PageSize) {
                                $scope.moreBusinessPartner = false;
                            }
                            //filter data no firstname or familyname
                            //data=data.filter(function(item,index){
                            //    return item.businessPartnerName1 || item.businessPartnerName2;
                            //})

                            if ($scope.options.FilterRequest.Pattern != "") {
                                var Pattern = new RegExp($scope.options.FilterRequest.Pattern,"i");
                                data.map(function (item, index) {
                                    //  return item.ownDefine = filterSearchData(item, Pattern) ? filterSearchData(item, Pattern) : null;
                                    if (item.businessPartnerName1 || item.businessPartnerName2) {
                                        if (Pattern.exec(item.businessPartnerName1)) {
                                            return item.ownDefine = {value: item.businessPartnerName1
                                                ,state:false};
                                        }

                                        if (Pattern.exec(item.businessPartnerName2)) {
                                            return item.ownDefine = {value: item.businessPartnerName2
                                                ,state:false};
                                        }
                                    }

                                    if (item.telephone || item.addressLine || item.telephonePattern || item.email || item.mobile ||item.mobilePattern ||item.matchCode) {
                                        if (Pattern.exec(item.telephone)) {
                                            return item.ownDefine ={value: item.telephone
                                                ,state:true};
                                        }
                                        if (Pattern.exec(item.addressLine)) {
                                            return item.ownDefine = {value: item.addressLine
                                                ,state:true};
                                        }
                                        if (Pattern.exec(item.telephonePattern)) {
                                            return item.ownDefine = {value: item.telephonePattern
                                                ,state:true};
                                        }
                                        if (Pattern.exec(item.matchCode)) {
                                            return item.ownDefine = {value: item.matchCode
                                                ,state:true};
                                        }
                                        if (Pattern.exec(item.email)) {
                                            return   item.ownDefine ={value: item.email
                                                ,state:true};
                                        }
                                        if (Pattern.exec(item.mobile)) {
                                            return item.ownDefine = {value: item.mobile
                                                ,state:true};
                                        }
                                        if (Pattern.exec(item.mobilePattern)) {
                                            return item.ownDefine = {value: item.mobilePattern
                                                ,state:true};
                                        }
                                    }
                                });
                            }else {
                                data.map( function(item,index){
                                    return item.ownDefine = {value: ''
                                        ,state:false};
                                });
                            }

                            $scope.options.FilterRequest.PageNumber++;
                            $scope.businessPartners = $scope.businessPartners.concat(data);
                            $scope.$broadcast('scroll.infiniteScrollComplete');

                        } else {
                            $scope.moreBusinessPartner = false;
                        }
                    }, function () {
                    })


                }

                $scope.$on('ngRepeatFinished', function () {
                    if($scope.options.FilterRequest.Pattern!=""){
                        var pa=$scope.options.FilterRequest.Pattern;
                        var Pattern = new RegExp($scope.options.FilterRequest.Pattern,"i");
                        var node=  $('#businessPartner ion-list .bpVariable');
                        var node1=$('#businessPartner ion-list .bpParrent');

                        for(var i=0;i<node.length;i++){
                            var value=Pattern.exec( jQuery(node[i]).text());
                            if(value ){
                                var contactParrnt = jQuery(node[i]).text().replace(value[0], "<span style=\" color:red;font-weight: bold\">" + value[0] + "</span>") ;
                                jQuery(node[i]).html(contactParrnt);
                            }
                        }

                        for(var i=0;i<node1.length;i++){
                            var value=Pattern.exec( jQuery(node1[i]).text());
                            if(value ){
                                var contactParrnt = jQuery(node1[i]).text().replace(value[0], "<span style=\" color:red;font-weight: bold\">" + value[0] + "</span>") ;
                                jQuery(node1[i]).html(contactParrnt);
                            }
                        }
                    }
                });


                $scope.loadMore = function () {
                    $timeout(loadDataMore(), 1000);
                };

                function init() {
                    loadTranslations();
                    // $scope.newOptions.FilterRequest.Pattern="rib";
                    if(commonBusinessPartnerDataService.returnParrent()){
                        $scope.options.FilterRequest.Pattern= commonBusinessPartnerDataService.returnParrent();
                    }
                    loadData();
                }

                init();
            }]);
})(angular);