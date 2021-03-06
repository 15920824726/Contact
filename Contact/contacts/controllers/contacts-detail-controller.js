/**
 * Created by hot on 2016-6-15.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.contacts';
    /**
     * contact detail controllers
     */
    angular.module(moduleName).controller('contactDetailController',
        ['$scope','$rootScope','$ionicScrollDelegate',
            '$stateParams',
            '$cordovaCamera',
            'contactDetailDataService',
            '$ionicActionSheet',
            'commonContactlistDataService',
            'platformTranslateService',
            '$timeout',
            'commonFavoriteDataService',
            'phoneHelper',
            '$ionicPopup','contactDetailSummaryService','contactImgDataService','appBaseDataService','closePopupService','businessPartnerContactListDataService',
            '$ionicHistory','$ionicLoading',
            function ($scope,$rootScope,$ionicScrollDelegate,
                      $stateParams,
                      $cordovaCamera,
                      contactDetailDataService,
                      $ionicActionSheet,
                      commonContactlistDataService,
                      platformTranslateService,
                      $timeout,
                      commonFavoriteDataService,
                      phoneHelper ,$ionicPopup,contactDetailSummaryService,
                      contactImgDataService,appBaseDataService,closePopupService,businessPartnerContactListDataService,
                      $ionicHistory,$ionicLoading) {
                appBaseDataService.initController($scope);
                function loadTranslations() {
                    $scope.translate = platformTranslateService.instant({
                        contactDetail: ['Telephone','OtherTelephone', 'Mobile', 'message', 'Fax', 'Email', 'Favorite', 'Edit','addFtSuccess','removeFt'
                            , 'FirstName', 'FamilyName', 'MobilePhone', 'Add', 'Update','Success','Failure', 'InputTelephone', 'Country', 'AreaCode', 'PhoneNumber','Extension','Ok']
                    });
                }
                $scope.status={
                    telephone2:false,
                    add:false,
                    searchBox:false
                };
                $scope.addPhone=function(event){
                    $scope.status.telephone2=true;
                };
                //contactBasicControllerService.initController($scope);
                $scope.deviceHelper = phoneHelper;
                //$scope.contact = commonContactlistDataService.getItemById($stateParams.contactId);
                $scope.contact={};
                $scope.imageData='';
                $scope.subsidiaryDescription='';
                $scope.contactRole='';
                $scope.photos={

                };

                $scope.contactEdit = {
                    FirstName: 'Roy',
                    FamilyName: 'Yang',
                    TelephonePattern: '02080235667',
                    Telephone2Pattern: '02035303026',
                    MobilePattern: '13480235677',
                    TelefaxPattern: '02037388990',
                    Email: 'info@33.com'
                };
                //console.log($scope.contact);

                var pictureSourceType = {
                    PHOTOLIBRARY: 0,
                    CAMERA: 1
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

                /**
                 * choose favorite contact
                 */
                $scope.favorite = function (contact) {
                    var db = initDB();
                    var newobj={
                        imageData:'',
                        FamilyName:'',
                        FirstName:'',
                        role:'',
                        Email:'',
                        MobilePattern:'',
                        TelephonePattern:'',
                        Telephone2Pattern:'',
                        TelefaxPattern:''

                    };
                    newobj.bpname=$stateParams.bpName?$stateParams.bpName:'';
                    newobj.imageData=contact.imageData;
                    if(contact.basicInfo){
                        newobj.FamilyName=contact.basicInfo.familyName!=null?contact.basicInfo.familyName:'';
                        newobj.FirstName=contact.basicInfo.firstName!=null?contact.basicInfo.firstName:'';
                        newobj.role= contact.basicInfo.contactRoleDescription!=null?contact.basicInfo.contactRoleDescription:'';
                        $scope.contactRole=newobj.role;
                        newobj.Email=contact.basicInfo.email!=null?contact.basicInfo.email:'';
                        newobj.subsidiaryDescription=contact.basicInfo.subsidiaryDescription?contact.basicInfo.subsidiaryDescription:'';
                    }
                    if(contact.mobile){
                        newobj.MobilePattern=contact.mobile.phoneNumber;
                    }
                    if(contact.telephone){
                        newobj.TelephonePattern=contact.telephone.telephone;
                    }
                    if(contact.telephone2){
                        newobj.Telephone2Pattern=contact.telephone2.telephone;
                    }
                    if(contact.teleFax){
                        newobj.TelefaxPattern=contact.teleFax.telephone;
                    }
                //    commonFavoriteDataService.DropTable(db);
                    if (db) {
                        var selectSQL = 'SELECT * FROM contactsList WHERE  ContextId = ?';
                        try {
                            db.transaction(function (ctx, result) {
                                ctx.executeSql(selectSQL, [$stateParams.contactId], function (ctx, result) {
                                    console.log("if has delete,else insert");
                                    if (result.rows.length >= 1) {
                                        commonFavoriteDataService.websqlDeleteOneDataById(db, $stateParams.contactId);
                                        var mypopup=$ionicPopup.alert( {
                                            scope:$scope,
                                            template:'<p style="text-align: center;font-size: larger" ng-bind="translate.contactDetail.removeFt"></p>',
                                            buttons:null,
                                            title:'Tips:'
                                        });
                                        $('.popup-container .popup .popup-head').css('background-color','#0167b1');
                                        $('.popup-container .popup .popup-body').css('background-color','inherit');
                                        mypopup.then(function(res){
                                            console.log("Deleted from favorite");
                                        });
                                        $timeout(function(){
                                            mypopup.close();
                                            $('#contactFavoriteBtn').css('color','black');
                                        } ,1500);

                                    } else {
                                        commonFavoriteDataService.websqlInsertData(db, newobj, $stateParams.contactId);
                                        var mypopup=$ionicPopup.alert( {
                                            scope: $scope,
                                            template:'<p style="text-align: center;font-size: larger" ng-bind="translate.contactDetail.addFtSuccess"></p>',
                                            buttons:null,
                                            title:'Tips:'
                                        });
                                        $('.popup-container .popup .popup-head').css('background-color','#0167b1');
                                        $('.popup-container .popup .popup-body').css('background-color','inherit');
                                        mypopup.then(function(res){
                                           // $('.popup-container .popup .popup-head h3').css('color','#fff');
                                            console.log("Has Been add");
                                        });
                                        $timeout(function(){
                                            mypopup.close();
                                            $('#contactFavoriteBtn').addClass('add'+$stateParams.contactId);
                                            $('#contactFavoriteBtn').css('color','red');
                                        } ,1500);
                                    }
                                }, function (ctx, result) {
                                    console.log(result);
                                    console.log("false");
                                })
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                };

                /*
                 * detail edit status
                 */
                $scope.detailEdit = false;

                /*
                 * return contactlist
                 */
                $scope.backContactList=function(){
                    $rootScope.$broadcast('BackContactList');
                    $ionicHistory.goBack();
                }

                /**
                 * change detail status
                 */
                $scope.edit = function () {
                    $scope.detailEdit = !$scope.detailEdit;
                };

                /**
                 * choose photo
                 */
                $scope.choose = function () {
                    $scope.hideSheet = $ionicActionSheet.show({
                        buttons: [{
                            text: 'Take a photo'
                        }, {
                            text: 'Select a photo'
                        }],
                        cancelText: 'Cancel',
                        buttonClicked: function (index) {
                            switch (index) {
                                case 0:
                                    $scope.takePhoto(pictureSourceType.CAMERA);
                                    break;
                                case 1:
                                    $scope.takePhoto(pictureSourceType.PHOTOLIBRARY);
                                    break;
                            }
                        }
                    })
                };

                /**
                 * take photo
                 * @param photoType: camera or photo library
                 */
                $scope.takePhoto = function (photoType) {
                    try {
                        var options = {
                            quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.CAMERA,
                            allowEdit: true,
                            encodingType: Camera.EncodingType.JPEG,
                            targetWidth: 100,
                            targetHeight: 100,
                            popoverOptions: CameraPopoverOptions,
                            saveToPhotoAlbum: false
                        };

                        if (photoType === pictureSourceType.CAMERA) {
                            options.sourceType = Camera.PictureSourceType.CAMERA;
                        } else {
                            options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
                        }

                        $cordovaCamera.getPicture(options).then(function (imageData) {
                            $scope.imageDataBase64 = imageData;
                            $scope.contact.imageData = "data:image/jpeg;base64," + imageData;
                            $scope.hideSheet();
                        }, function (err) {
                            // error
                            $scope.hideSheet();
                        });
                    } catch (error) {
                        console.log(error);
                        $scope.hideSheet();
                    }

                };

                /**
                 * save contact
                 *
                 * @param blobContent: image database64
                 */
                $scope.saveContact = function (blobContent) {
                    return contactDetailDataService.saveContactBlob($scope.contact.Id, blobContent);
                };

                /**
                 * update contact detail
                 */
                function updateContact(companyCode,data,base){
                    var db = initDB();
                    if(!data.basicInfo) return;
                    var options={
                        "Contact": {
                            "MainItemId" : data.basicInfo.id,
                            "MainItemVersion" : data.basicInfo.version,
                            "ContactToSave" : {
                                "Id": data.basicInfo.id,
                                "businessPartnerFk": data.basicInfo.businessPartnerFk,
                                "FirstName" : data.basicInfo.firstName,
                                "FamilyName" : data.basicInfo.familyName,
                                "Email" : data.basicInfo.email,
                                "Version": data.basicInfo.version,
                                'bpname':$stateParams.bpName,
                                'subsidiaryDescription':data.basicInfo.subsidiaryDescription,
                                'role':data.basicInfo.contactRoleDescription
                            }
                        }
                    };
                    var telephone;
                    $scope.subsidiaryDescription=data.basicInfo.subsidiaryDescription;
                    $scope.contactRole=data.basicInfo.contactRoleDescription;
                    if(data.telephone&&data.telephone.id){
                        telephone=data.telephone;
                    }
                    else if(base.telephone){
                        telephone=base.telephone;
                    }
                    if(telephone&&data.telephone){
                        options.Contact.TelephoneToSave={
                            "Id":telephone.id,
                            "AreaCode": data.telephone.areaCode,
                            "Extention": data.telephone.extention,
                            "Telephone":data.telephone.telephone,
                            "PhoneNumber":data.telephone.phoneNumber,
                            "version": telephone.version,
                            "CountryFk":telephone.countryFk
                        };
                    }
                    var telephone2;
                    if(data.telephone2&&data.telephone2.id){
                        telephone2=data.telephone2;
                    }
                    else if(base.telephone2){
                        telephone2=base.telephone2;
                    }
                    if(telephone2&&data.telephone2){
                        options.Contact.Telephone2ToSave={
                            "Id":telephone2.id,
                            "AreaCode": data.telephone2.areaCode,
                            "Extention": data.telephone2.extention,
                            "Telephone":data.telephone2.telephone,
                            "PhoneNumber":data.telephone2.phoneNumber,
                            "version": telephone2.version,
                            "CountryFk":telephone2.countryFk
                        };
                    }

                    var mobile;
                    if(data.mobile&&data.mobile.id){
                        mobile=data.mobile;
                    }
                    else if(base.mobile){
                        mobile=base.mobile;
                    }
                    if(mobile&&data.mobile){
                        options.Contact.MobileToSave={
                            "id":mobile.id,
                            "telephone":"",
                            "PhoneNumber":data.mobile.phoneNumber,
                            "version": mobile.version,
                            "CountryFk":mobile.countryFk
                        };
                    }

                    var fax;
                    if(data.teleFax&&data.teleFax.id){
                        fax=data.teleFax;
                    }
                    else if(base.fax){
                        fax=base.fax;
                    }
                    if(fax&&data.teleFax){
                        options.Contact.TeleFaxToSave={
                            "Id":fax.id,
                            "Telephone":data.teleFax.telephone,
                            "PhoneNumber":data.teleFax.telephone,
                            "version": fax.version,
                            "CountryFk":fax.countryFk
                        };
                    }
                    var photo;
                    if(data.photo&&data.photo.id){
                        photo=data.photo;
                    }
                    else if(base.photo){
                        photo=base.photo;
                    }
                    if($scope.imageDataBase64&&photo&&data.basicInfo){
                        options.Contact.ContactPhotoToSave={
                               "id": photo.id,
                                "OwnerId": data.basicInfo.id,
                                "Photo": $scope.imageDataBase64,
                                "version":photo.version
                        }
                    }
                    contactDetailDataService.saveContact(options).then(function(rs){
                        hideLoading();
                        detailDataCallback(rs,true);
                        $scope.imageDataBase64=null;
                        $scope.detailEdit = false;
                        if(rs.basicInfo ){
                            $scope.contact.basicInfo.version=rs.basicInfo.version;
                            if(rs.mobile){
                                $scope.contact.mobile.version=rs.mobile.version;
                            }
                            if(rs.teleFax){
                                $scope.contact.teleFax.version=rs.teleFax.version;
                            }
                            if(rs.telephone){
                                $scope.contact.telephone.version=rs.telephone.version;
                            }
                            if(rs.telephone2){
                                $scope.contact.telephone2.version=rs.telephone2.version;
                            }
                        }
                        if (db) {
                            var selectSQL = 'SELECT * FROM contactsList WHERE  ContextId = ?';
                            try {
                                db.transaction(function (ctx, result) {
                                    ctx.executeSql(selectSQL, [$stateParams.contactId], function (ctx, result) {
                                        if (result.rows.length >= 1) {
                                            //first Delete ,second Add
                                            commonFavoriteDataService.websqlDeleteOneDataById(db, $stateParams.contactId);
                                            var newobj={
                                                imageData:'',
                                                FamilyName:'',
                                                FirstName:'',
                                                role:'',
                                                Email:'',
                                                MobilePattern:'',
                                                TelephonePattern:'',
                                                Telephone2Pattern:'',
                                                TelefaxPattern:'',
                                                bpname:'',
                                                subsidiaryDescription:''
                                            };

                                            newobj.FamilyName=rs.contactToSave.familyName?rs.contactToSave.familyName:"";
                                            newobj.FirstName=rs.contactToSave.firstName?rs.contactToSave.firstName:"";
                                            newobj.role=$scope.contactRole?$scope.contactRole:'';
                                            newobj.Email=rs.contactToSave.email?rs.contactToSave.email:"";
                                            newobj.MobilePattern=rs.mobileToSave?rs.mobileToSave.phoneNumber:"";
                                            newobj.TelephonePattern=rs.telephoneToSave?rs.telephoneToSave.telephone:"";
                                            newobj.Telephone2Pattern=rs.telephone2ToSave?rs.telephone2ToSave.telephone:"";
                                            newobj.TelefaxPattern=rs.teleFaxToSave?rs.teleFaxToSave.telephone:"";
                                            newobj.imageData= $scope.imageData;
                                            newobj.bpname=$scope.bpname?$scope.bpname:'';
                                            newobj.subsidiaryDescription=$scope.subsidiaryDescription?$scope.subsidiaryDescription:'';

                                            commonFavoriteDataService.websqlInsertData(db, newobj, $stateParams.contactId);
                                        }
                                    })
                                })

                            }catch (error) {
                                console.log(error);
                            }
                        }
                        $ionicPopup.alert({title:$scope.translate.contactDetail.Success});
                        //refresh
                       // $state.go('desktop.businessPartnerContactList',{businessPartnerId:$stateParams.businessPartnerId});
                    },function(err){
                        $scope.detailEdit = false;
                        hideLoading();
                        //Failure
                        $ionicPopup.alert({title:$scope.translate.contactDetail.Failure});
                    });
                }
                function getTelephoneOptions(){
                    var data=$scope.contact,options={};
                    options.count=0;
                    if(data.telephone&&!data.telephone.version){
                        options.count++;
                        options.telephone=true;
                    }
                    if(data.mobile&&!data.mobile.version){
                        options.count++;
                        options.mobile=true;
                    }
                    if(data.telephone2&&!data.telephone2.version){
                        options.count++;
                        options.telephone2=true;
                    }
                    if(data.teleFax&&!data.teleFax.version) {
                        options.count++;
                        options.fax = true;
                    }
                    if($scope.imageDataBase64&&!$scope.photos.id) {
                        options.count++;
                        options.photo = true;
                    }
                    return options;
                }
                $scope.update = function (userInfoForm) {
                    if (userInfoForm.$valid) {
                    showLoading();
                       var companyCode=JSON.parse(localStorage.getItem("companyName")).code;
                        if($scope.imageDataBase64&&$scope.photos.id){
                            $scope.contact.photo={
                                id:$scope.photos.id,
                                version:$scope.photos.version,
                                Photo:$scope.imageDataBase64
                            };
                        }
                        var telephoneOptions=getTelephoneOptions();
                        if(telephoneOptions.count) {
                            contactDetailDataService.createBase({
                                "OwnerId":$stateParams.contactId
                            },telephoneOptions).then(function(base){
                                updateContact(companyCode,$scope.contact,base);
                            },function(err){
                                hideLoading();
                                $ionicPopup.alert({title:$scope.translate.contactDetail.Failure});
                            });
                        }
                        else{
                            updateContact(companyCode,$scope.contact,{});
                        }
                    }
                };



                /**
                 * close edit panel
                 */
                $scope.closeEdit = function () {
                    $scope.detailEdit = false;
                    $timeout(function () {
                        $scope.$apply();
                    });
                };

                function  TestIdExistFromWebSql(db){
                    var selectSQL = 'SELECT * FROM contactsList WHERE  ContextId = ?';
                    try {
                        db.transaction(function(ctx,result  ){
                            ctx.executeSql( selectSQL,[$stateParams.contactId],function(ctx,result){
                                console.log("get one information from table sucessful");
                                if (result.rows.length >= 1) {
                                    $('#contacts-detail #contactFavoriteBtn').css('color','red');
                                }else {
                                    $('#contacts-detail #contactFavoriteBtn').css('color','black');
                                }
                            } ,function(ctx,result){
                                console.log(result)
                                console.log("get one information from table false");
                            })
                        });

                    }catch(error) {
                        console.log('error');
                    }
                }

                function initDB() {
                    try {
                        var db = openDatabase('ContactApp', '1.0', 'ContactApp', 5 * 1024 * 1204);
                        if (db) {
                            commonFavoriteDataService.websqlCreateTable(db);
                            TestIdExistFromWebSql(db);
                        }
                    } catch (error) {
                        console.log(error);
                    }

                    return db;
                }

                $scope.options={
                    Id: $stateParams.contactId,
                    CompanyCode:''
                };

                $scope.skipMessage=function (tel) {
                    window.location.href="sms"+tel;
                }

                $scope.imgOptions={
                    CompanyCode : '',
                    OwnerId: $stateParams.contactId,
                    UseThumbnail:false
                };
                function getImageData(options){
                   $scope.imageData=  "data:image/png;base64,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";
                    contactImgDataService.getImagData(options).then(function(res){
                        if(res && res.photo){
                            $scope.photos=res;
                            $scope.imageData='data:image/png;base64,'+ res.photo;
                        }
                    },function(){
                        console.log("error");
                        return "error";
                    } )
                }



                function formatDetail(rs){
                    if(rs.contactToSave){
                        rs.basicInfo=rs.contactToSave;
                    }
                    if(rs.mobileToSave){
                        rs.mobile=rs.mobileToSave;
                    }
                    if(rs.teleFaxToSave){
                        rs.teleFax=rs.teleFaxToSave;
                    }
                    if(rs.telephoneToSave){
                        rs.telephone=rs.telephoneToSave;
                    }
                    if(rs.telephone2ToSave){
                        rs.telephone2=rs.telephone2ToSave;
                    }
                }
                function detailDataCallback(response,format){
                    if(format){
                        formatDetail(response);
                    }
                    //$scope.contact=response;
                    //hideLoading();
                    $scope.status.telephone2=$scope.contact.telephone2?true:false;
                    //$scope.contact.imageData=$scope.imageData;
                    if($scope.contact.telephone){
                        $scope.contact.entity={
                            currentTelephoneType:null,
                            displayText:'',
                            AreaCode:$scope.contact.telephone.areaCode,
                            PhoneNumber:$scope.contact.telephone.phoneNumber,
                            Extention:$scope.contact.telephone.extention,
                            Telephone:$scope.contact.telephone.telephone,
                            country:{//record
                                id:$scope.contact.telephone.countryFk,
                                areaCode:null,
                                description:null
                            }
                        };
                    }
                    if($scope.contact.telephone2){
                        $scope.contact.entity2={
                            currentTelephoneType:null,
                            displayText:'',
                            AreaCode:$scope.contact.telephone2.areaCode,
                            PhoneNumber:$scope.contact.telephone2.phoneNumber,
                            Extention:$scope.contact.telephone2.extention,
                            Telephone:$scope.contact.telephone2.telephone,
                            country:{//record
                                id:$scope.contact.telephone2.countryFk,
                                areaCode:null,
                                description:null
                            }
                        };
                    }
                }
                function LoadData(){
                    showLoading();
                    $scope.options.CompanyCode= JSON.parse(localStorage.getItem("companyName")).code;
                    $scope.imgOptions.CompanyCode= JSON.parse(localStorage.getItem("companyName")).code;
                   // getImageData($scope.imgOptions);
                    contactDetailSummaryService.getContactDetail($scope.options).then(function(response){
                        console.log(response);
                        $scope.contact=response;
                        $scope.imageData=   "data:image/png;base64,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";
                        $scope.contact.imageData=$scope.imageData;
                        detailDataCallback(response);
                        contactImgDataService.getImagData($scope.imgOptions).then(function(res){
                            if(res && res.photo){
                                $scope.photos=res;
                                $scope.imageData='data:image/png;base64,'+ res.photo;
                                $scope.contact.imageData=$scope.imageData;
                            }
                            hideLoading();
                            //detailDataCallback(response);
                        },function(){
                            hideLoading();
                            console.log("error");
                            return "error";
                        } )

                    },function(error){
                        hideLoading();
                        console.log(error);
                    });
                }

                function init() {
                    loadTranslations();
                    initDB();
                    $scope.bpname= $stateParams.bpName;
                    LoadData();
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
                        "InputTelephone":$scope.translate.contactDetail.InputTelephone,
                        "Country":$scope.translate.contactDetail.Country,
                        "AreaCode":$scope.translate.contactDetail.AreaCode,
                        "PhoneNumber":$scope.translate.contactDetail.PhoneNumber,
                        "Extension":$scope.translate.contactDetail.Extension,
                        "Telephone":$scope.translate.contactDetail.Telephone,
                        "Ok":$scope.translate.contactDetail.Ok
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
                        var rs=data.filter(function(item){
                            if(!item.description)return false;
                            return item.id==$scope.entity.country.id?true:false;
                        });
                        if(rs.length){
                            $scope.entity.country.areaCode=rs[0].areaCode;
                            $scope.entity.country.description=rs[0].description;
                            $scope.entity.displayText=rs[0].description;
                        }
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
                        $scope.contact.telephone=$scope.contact.telephone||{};
                        $scope.contact.telephone.areaCode=$scope.entity.AreaCode;
                        $scope.contact.telephone.countryFk=$scope.entity.country.id;
                        $scope.contact.telephone.extention=$scope.entity.Extention;
                        $scope.contact.telephone.phoneNumber=$scope.entity.PhoneNumber;
                        $scope.contact.telephone.telephone=$scope.entity.Telephone;
                    }
                    else if($scope.entity.currentTelephoneType===2){
                        $scope.contact.entity2=angular.copy($scope.entity);
                        $scope.contact.telephone2=$scope.contact.telephone2||{};
                        $scope.contact.telephone2.areaCode=$scope.entity.AreaCode;
                        $scope.contact.telephone2.countryFk=$scope.entity.country.id;
                        $scope.contact.telephone2.extention=$scope.entity.Extention;
                        $scope.contact.telephone2.phoneNumber=$scope.entity.PhoneNumber;
                        $scope.contact.telephone2.telephone=$scope.entity.Telephone;
                    }
                    popBox.close();
                };
            }
        ]);

})(angular);
