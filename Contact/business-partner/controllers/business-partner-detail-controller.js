/**
 * Created by yar on 6/23/2016.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.business.partner';
    angular.module(moduleName).controller('businessPartnerDetailController', [
        '$scope', 'businessPartnerDataService', '$stateParams',
        'contactDetailDataService', 'commonBusinessPartnerDataService', 'businessPartnerDetailDataService',
        'platformTranslateService','phoneHelper','bpSummaryDetailDataService','businessImgDataService','$state','$ionicLoading',
        function ($scope, businessPartnerDataService, $stateParams,
                  contactDetailDataService, commonBusinessPartnerDataService, businessPartnerDetailDataService,
                  platformTranslateService,phoneHelper,bpSummaryDetailDataService,businessImgDataService,$state,$ionicLoading) {
            $scope.deviceHelper = phoneHelper;
            $scope.options={
                Id: $stateParams.businessPartnerId,
                CompanyCode:''
            }

            $scope.imgOptions={
                CompanyCode:'',
                OwnerId:$stateParams.businessPartnerId,
                UseThumbnail: false
            }

            $scope.clickMap=false;

            console.log($stateParams.businessPartnerId);

            $scope.skipReturnBp=function(){
                $state.go('desktop.businessPartner');
            }


               function showLoading() {
                    var loadingOptions = {
                           duration: 9000
                    };
                    $ionicLoading.show(loadingOptions);
                }

                function hideLoading() {
                    $ionicLoading.hide();
                }

           // $scope.businessPartner = businessPartnerDetailDataService.getBusinessPartnerDetailByBusinessPartnerId();

            $scope.businessPartner={};
            $scope.imageData='';
            //$scope.businessPartner.imageData=  'data:image/png;base64,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';


            function loadTranslations() {
                $scope.translate = platformTranslateService.instant({
                    businessPartner: ['Mobile', 'Fax', 'Email', 'Telephone', 'Address',"OtherTelephone"
                        , 'Website']
                });
            }

            $scope.skipMap=function(address){
                var data={};

                data.latitude=address.latitude?address.latitude:'';
                data.longitude=address.longitude?address.longitude:'';
                data.addressLine=address.addressLine;
                $state.go('desktop.BusinessPartnerMap',{data:data});


            }

            function getImgData(options){
                businessImgDataService.getImageData(options).then( function(response){
                    //debugger;
                    if(response){
                        $scope.imageData='data:image/png;base64,'+ response.photo;
                    }else {
                        $scope.imageData='business-partner/content/img/companyDefault.png';
                    }
                },function(){
                    console.log('error');
                } );
            }


            function  LoadData(){
                showLoading();
                $scope.options.CompanyCode= JSON.parse(localStorage.getItem("companyName")).code;
                $scope.imgOptions.CompanyCode= JSON.parse(localStorage.getItem("companyName")).code;
                //debugger;
                //getImgData($scope.imgOptions);
                bpSummaryDetailDataService.getBpDetailSummary($scope.options).then(function(data){
                    $scope.businessPartner=data;
                    //$scope.imageData= "data:image/png;base64,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";
                    $scope.imageData='business-partner/content/img/companyDefault.png';
                    $scope.businessPartner.imageData=  $scope.imageData;
                    if(data.basicInfo.businessPartnerName1 && data.basicInfo.businessPartnerName1 ){
                        $scope.businessPartner.basicInfo.defineName=data.basicInfo.businessPartnerName1;
                    }

                    if(data.basicInfo.businessPartnerName1 && !data.basicInfo.businessPartnerName1){
                        $scope.businessPartner.basicInfo.defineName=data.basicInfo.businessPartnerName1;
                    }

                    if(!data.basicInfo.businessPartnerName1 && data.basicInfo.businessPartnerName1){
                        $scope.businessPartner.basicInfo.defineName=data.basicInfo.businessPartnerName2;
                    }

                    //getImageData
                    businessImgDataService.getImageData($scope.imgOptions).then( function(response){
                        //debugger;
                        if(response){
                            $scope.imageData='data:image/png;base64,'+ response.photo;
                        }
                        $scope.businessPartner.imageData=  $scope.imageData;
                    },function(){
                        console.log("error");
                         $scope.businessPartner.imageData=  $scope.imageData;
                         hideLoading();
                    } );

                },function(){
                    hideLoading();
                    console.log("error");
                } );
            }

            function init() {
                loadTranslations();
                LoadData();

            }

            init();
        }

    ])
    ;
})(angular);
