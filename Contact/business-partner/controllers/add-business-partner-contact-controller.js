/**
 * Created by yar on 6/23/2016.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.business.partner';
    angular.module(moduleName).controller('addBusinessPartnerContactController', [
        '$scope', 'businessPartnerDataService', '$stateParams','$ionicPopup','appBaseDataService','$ionicScrollDelegate',
        'contactDetailDataService', 'commonBusinessPartnerDataService', 'businessPartnerDetailDataService','businessPartnerContactListDataService',
        'platformTranslateService','$state','closePopupService','$ionicLoading',
        function ($scope, businessPartnerDataService, $stateParams,$ionicPopup,appBaseDataService,$ionicScrollDelegate,
                  contactDetailDataService, commonBusinessPartnerDataService, businessPartnerDetailDataService,businessPartnerContactListDataService,
                  platformTranslateService,$state,closePopupService,$ionicLoading) {
            appBaseDataService.initController($scope);
            $scope.detailEdit=true;
            $scope.options={
                Id: $stateParams.businessPartnerId,
                CompanyCode:''
            }
            $scope.businessPartner={};
            $scope.contact={
                firstName:'',
                familyName:'',
                telephone:'',
                entity:null,
                telephone2:'',
                entity2:null,
                mobile:'',
                fax:'',
                email:''
            };
            $scope.status={
                telephone2:false,
                add:false,
                searchBox:false
            };

            function showLoading() {
                var loadingOptions = {
                    duration: 9000
                };
                $ionicLoading.show(loadingOptions);
            }

            function hideLoading() {
                $ionicLoading.hide();
            }

            function loadTranslations() {
                $scope.translate = platformTranslateService.instant({
                    businessPartner: ['Telephone', 'Mobile', 'message', 'Fax', 'Email', 'Favorite', 'Edit', 'FirstName', 'FamilyName', 'MobilePhone', 'Add', 'Update','Success','Failure', 'InputTelephone', 'Country', 'AreaCode', 'PhoneNumber','Extension','Ok']
                });
            }
            $scope.closeEdit=function(){

            };
            $scope.goBack=function(){
                $state.go('desktop.businessPartnerContactList',{businessPartnerId:$stateParams.businessPartnerId});
                //$state.go('desktop.businessPartner');
            };
            function getTelephoneOptions(){
                var data=$scope.contact,options={};
                options.count=0;
                if(data.telephone.length){
                    options.count++;
                    options.telephone=true;
                }
                if(data.mobile.length){
                    options.count++;
                    options.mobile=true;
                }
                if(data.telephone2.length){
                    options.count++;
                    options.telephone2=true;
                }
                if(data.fax.length) {
                    options.count++;
                    options.fax = true;
                }
                return options;
            }
            function saveContact(companyCode,contact,base){
                var data=$scope.contact;
                var options={
                    "Contact": {
                        "MainItemId" : contact.id,
                        "MainItemVersion" : 0,
                        "ContactToSave" : {
                            "Id": contact.id,
                            "BusinessPartnerFk": $stateParams.businessPartnerId,
                            "SubsidiaryDescription": "",
                            "FirstName" : data.firstName,
                            "FamilyName" : data.familyName,
                            "Email" : data.email,
                            "Version": contact.version,
                            "ContactRoleDescription": ""
                        }
                    }
                };
                if(base.telephone&&data.telephone.length>0){
                    options.Contact.TelephoneToSave={
                        "Id": base.telephone.id,
                        "AreaCode": data.entity.AreaCode,
                        "CountryFk":data.entity.country.id,
                        "PhoneNumber": data.entity.PhoneNumber,
                        "Extention": data.entity.Extention,
                        "Telephone":data.entity.Telephone,
                        "version": 0,
                        "Pattern": ""
                    };
                }
                if(base.telephone2&&data.telephone2.length>0){
                    options.Contact.Telephone2ToSave={
                        "Id": base.telephone2.id,
                        "AreaCode": data.entity2.AreaCode,
                        "CountryFk":data.entity2.country.id,
                        "PhoneNumber":data.entity2.PhoneNumber,
                        "Extention": data.entity2.Extention,
                        "Telephone":data.entity2.Telephone,
                        "version": 0,
                        "Pattern": ""
                    };
                }
                if(base.mobile&&data.mobile.length>0){
                    options.Contact.MobileToSave={
                        "Id": base.mobile.id,
                        "AreaCode": "",
                        "CountryFk":base.mobile.countryFk,
                        "PhoneNumber": data.mobile,
                        "Extention": "",
                        "Telephone":"",
                        "version": 0,
                        "Pattern": ""
                    };
                }

                if(base.fax&&data.fax.length>0){
                    options.Contact.TeleFaxToSave={
                        "Id": base.fax.id,
                        "AreaCode": "",
                        "CountryFk":base.fax.countryFk,
                        "PhoneNumber": data.fax,
                        "Extention": "",
                        "Telephone":data.fax,
                        "version": 0,
                        "Pattern": ""
                    };
                }
                contactDetailDataService.saveContact(options).then(function(rs){
                    hideLoading();
                    $ionicPopup.alert({title:$scope.translate.businessPartner.Success});
                    $state.go('desktop.businessPartnerContactList',{businessPartnerId:$stateParams.businessPartnerId});
                },function(err){
                    hideLoading();
                    //failure
                    $ionicPopup.alert({title:$scope.translate.businessPartner.Failure});
                });
            }
            $scope.addPhone=function(event){
                 $scope.status.telephone2=true;
            };
            $scope.checkInput = function () {
                if (isValid()) {
                    return '';
                }
                else {
                    return 'button-disable'
                }
            };
            function isValid(){
                var data=$scope.contact;
                $scope.status.add=false;
                if(data.firstName.length){
                    $scope.status.add=true;
                }
                if(data.familyName.length){
                    $scope.status.add=true;
                }
                if(data.telephone.length){
                    $scope.status.add=true;
                }
                if(data.telephone2.length){
                    $scope.status.add=true;
                }
                if(data.fax.length){
                    $scope.status.add=true;
                }
                if(data.email&&data.email.length){
                    $scope.status.add=true;
                }
                return $scope.status.add;
            }
            $scope.add=function(data){
                if($scope.status.add){
                    showLoading();
                    var companyCode=JSON.parse(localStorage.getItem("companyName")).code;
                    contactDetailDataService.createContact({
                        "BpId":$stateParams.businessPartnerId
                    }).then(function(response){
                        hideLoading();
                        var telephoneOptions=getTelephoneOptions();
                        if(telephoneOptions.count){
                            contactDetailDataService.createBase({
                            },telephoneOptions).then(function(base){
                                saveContact(companyCode,response,base);
                            },function (err){
                                hideLoading();
                                $ionicPopup.alert({title:$scope.translate.businessPartner.Success});
                                console.log(err);
                            });
                        }
                        else{
                            saveContact(companyCode,response,{});
                        }

                    },function(err){
                        hideLoading();
                        $ionicPopup.alert({title:$scope.translate.businessPartner.Failure});
                    });
                }
            };
            function init() {
                loadTranslations();
            }
            init();
            $scope.$on('$destroy', function () {
                platformTranslateService.translationChanged.unregister(loadTranslations);
            });
            function closePop(){

            }
            var popBox;
            function openAddCountryBox(){
                $scope.translate=$scope.translate?$scope.translate:{};
                $scope.translate.country={
                    "InputTelephone":$scope.translate.businessPartner.InputTelephone,
                    "Country":$scope.translate.businessPartner.Country,
                    "AreaCode":$scope.translate.businessPartner.AreaCode,
                    "PhoneNumber":$scope.translate.businessPartner.PhoneNumber,
                    "Extension":$scope.translate.businessPartner.Extension,
                    "Telephone":$scope.translate.businessPartner.Telephone,
                    "Ok":$scope.translate.businessPartner.Ok
                };
                popBox=$ionicPopup.show({
                    templateUrl: 'business-partner/partials/add-country-box.html',
                    cssClass:'showBy-box country-box',
                    scope:$scope
                });
               /* $scope.select=function(id){
                    popBox.close();
                }*/
                closePopupService.register(popBox,closePop);
            }
            var countryData;
            $scope.selectTelephone=function(type){
                if(type===1&&$scope.contact.entity){
                    $scope.entity=$scope.contact.entity;
                }
                else if(type===2&&$scope.contact.entity2){
                    $scope.entity=$scope.contact.entity2;
                }
                else{
                    $scope.entity={
                        currentTelephoneType:null,
                        displayText:'',
                        AreaCode:'',
                        PhoneNumber:'',
                        Extention:'',
                        Telephone:'',
                        country:{//record
                            id:null,
                            areaCode:null,
                            description:null
                        }
                    };
                }
                showLoading();
                $scope.entity.currentTelephoneType=type;
                var companyCode=JSON.parse(localStorage.getItem("companyName")).code;
                businessPartnerContactListDataService.loadCountriesByFilter({
                    "SearchText": ""
                }).then(function(data){
                    hideLoading();
                    countryData=data;
                    $scope.countryData=angular.copy(data);
                    $scope.status.searchBox=$scope.entity.country.areaCode?false:true;
                    openAddCountryBox();
                },function(err){
                    hideLoading();
                    console.log(err);
                });

            };
            function formatTelephone(){
                $scope.entity.Telephone=$scope.entity.country.areaCode+($scope.entity.AreaCode.length?'('+$scope.entity.AreaCode+')':'')+$scope.entity.PhoneNumber+($scope.entity.Extention?'-'+$scope.entity.Extention:'');
            };
            $scope.onChange=function(displayText){
                $scope.status.searchBox=true;
                if(countryData&&displayText){
                    $scope.countryData=countryData.filter(function(item){
                        if(!item.description)return false;
                        return ~item.description.toLowerCase().indexOf(displayText.toLowerCase());
                    });
                    $ionicScrollDelegate.$getByHandle('country-handle').scrollTop();
                }
            };
            $scope.selectCountry=function(record){
                $scope.status.searchBox=false;
                //save record
                $scope.entity.country.id=record.id;
                $scope.entity.country.areaCode=record.areaCode;
                $scope.entity.country.description=record.description;
                //set text
                $scope.entity.displayText=record.description;
                formatTelephone();
            };
            $scope.changeTelephone=function(){
                formatTelephone();
            };
            $scope.editValue=function(){
                $scope.status.searchBox=!$scope.status.searchBox;
            };
            $scope.hideCountry=function(event){
                if(event.target&&event.target.classList&&Array.prototype.indexOf.call(event.target.classList,'display-country')<0){
                    $scope.status.searchBox=false;
                }
            };
            $scope.setTelephone=function(){
                if($scope.entity.currentTelephoneType===1){
                    $scope.contact.entity=angular.copy($scope.entity);
                    $scope.contact.telephone=$scope.entity.Telephone;
                }
                else if($scope.entity.currentTelephoneType===2){
                    $scope.contact.entity2=angular.copy($scope.entity);
                    $scope.contact.telephone2=$scope.entity.Telephone;
                }
                popBox.close();
            };
        }

    ])
    ;
})(angular);
