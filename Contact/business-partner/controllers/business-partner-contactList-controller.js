/**
 * Created by yar on 6/20/2016.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.business.partner';

    angular.module(moduleName).controller('businessPartnerContactListController',
        ['$scope', 'businessPartnerContactListDataService', '$timeout',
            '$ionicLoading', 'commonBusinessPartnerDataService', '$stateParams',
            '$cordovaContacts', '$ionicPopup', '$translate', 'bpSummaryContactsDataService', 'bpContactImgDataService',
            'closePopupService', '$state', 'contactDetailDataService', 'platformContextService','$q','platformTranslateService',
            function ($scope, businessPartnerContactListDataService, $timeout,
                      $ionicLoading, commonBusinessPartnerDataService, $stateParams,
                      $cordovaContacts, $ionicPopup, $translate, bpSummaryContactsDataService, bpContactImgDataService,
                      closePopupService, $state, contactDetailDataService, platformContextService,$q,platformTranslateService) {

                $scope.businessPartnerContactLists = [];

                $scope.options = "";
                $scope.newOptions = {
                    CompanyCode: '',
                    BpId: ''
                };
                $scope.imageData = '';
                $scope.imgOptions = {
                    CompanyCode: '',
                    OwnerId: ''

                };

                var localContactId = [],
                    itemLimitationTitle = $translate.instant('businessPartner.itemLimitationTitle'),
                    itemLimitationTemplate = $translate.instant('businessPartner.itemLimitationTemplate'),
                    popBox,
                //culture = platformContextService.culture,
                    cultures = {
                        'de-de': '49',
                        'en-gb': '+44',
                        'zh-hans': '+86'
                    };
                var culture = platformContextService.culture();

                function getCountryCode() {
                    return cultures[culture];
                }

                function itemLimitation() {
                    var alertPopup = $ionicPopup.alert({
                        title: itemLimitationTitle,
                        template: itemLimitationTemplate
                    });
                }

                $scope.skipCancel = function () {
                    $scope.options = $('#businessPartnerContactList div.list input').val('');
                    $scope.bsfunc();
                };
                //
                $scope.bsfunc = function (item) {
                    $scope.options = $('#businessPartnerContactList div.list input').val();
                    if ($scope.options == "") {
                        return true;
                    }
                    if (item.firstName.toLocaleLowerCase().indexOf($scope.options.toLocaleLowerCase()) >= 0 ||
                        item.familyName.toLocaleLowerCase().indexOf($scope.options.toLocaleLowerCase()) >= 0) {
                        return true;
                    } else {
                        return false;
                    }
                };

                function showLoading() {
                    var loadingOptions = {
                        duration: 1000
                    };
                    $ionicLoading.show(loadingOptions);
                }

                function hideLoading() {
                    $ionicLoading.hide();
                }

                function closePop() {

                }


                function addFromContact() {
                    $state.go('desktop.BusinessPartnerContactsFromLibrary',{'businessPartnerId':$stateParams.businessPartnerId});
                }

                function openAddContactBox() {
                    $scope.translate = $scope.translate ? $scope.translate : {};
                    $scope.translate.New = $translate.instant('businessPartner.New');
                    $scope.translate.FromContact = $translate.instant('businessPartner.FromContact');
                    popBox = $ionicPopup.show({
                        templateUrl: 'business-partner/partials/add-contact-box.html',
                        cssClass: 'showBy-box',
                        scope: $scope
                    });
                    $scope.select = function (id) {
                        if (id == 0) {
                            $state.go('desktop.addBusinessPartnerContact', {businessPartnerId: $stateParams.businessPartnerId});
                        }
                        else if (id == 1) {
                            addFromContact();
                            var options = {
                                filter: '',
                                multiple: true
                            };
                            try {
                                $cordovaContacts.find(options).then(function (data) {
                                    localContactListFilter(data);
                                    $scope.localContactList = data;
                                }, function (error) {
                                    console.log(error)
                                })
                            } catch (error) {
                                console.log(error);
                            }
                        }
                        popBox.close();
                    };
                    closePopupService.register(popBox, closePop);
                }

                $scope.showLocalContact = function () {
                    openAddContactBox();
                };

                function localContactListFilter(data) {
                    if (data && data.length > 0) {
                        data.forEach(function (item) {

                            item.imageData = 'data:image/png;base64,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';

                            if (item.name.FamilyName) {
                                item.familyName = item.name.FamilyName
                            } else {
                                item.familyName = item.name.givenName
                            }

                            if (item.emails && item.emails.length) {
                                item.emails = item.emails[0].value;
                            }

                            if (item.photos && item.photos.length) {
                                item.imageData = item.photos[0].value;
                            }

                            item.giveName = item.name.givenName || item.name.formatted || item.name.familyName ;

                            item.mobile = getPhone(item.phoneNumbers).mobile;

                            item.checked = false;

                            item.entity = {
                                PhoneNumber: getUsefulPhone(item.phoneNumbers)[0] ? getUsefulPhone(item.phoneNumbers)[0] : '',
                                Telephone: getCountryCode() + getUsefulPhone(item.phoneNumbers)[0] ? getUsefulPhone(item.phoneNumbers)[0] : '',
                                country: {//record
                                    id: getCountrieCodeId()
                                }
                            };
                            item.entity2 = {
                                PhoneNumber: getUsefulPhone(item.phoneNumbers)[1] ? getUsefulPhone(item.phoneNumbers)[1] : '',
                                Telephone: getCountryCode() + getUsefulPhone(item.phoneNumbers)[1] ? getUsefulPhone(item.phoneNumbers)[1] : '',
                                country: {//record
                                    id: getCountrieCodeId()
                                }
                            };

                        })
                    }
                }


                function getUsefulPhone(phones) {
                    var data = getPhone(phones).phone,
                        len,
                        i = 0,
                        result = [];
                    if (data && data.length > 0) {
                        len = data.length;
                        for (; i < len; i++) {
                            if (data[i] && result.length < 2) {
                                result.push(data[i].toString())
                            }
                        }
                    }
                    return result;
                }

                function getPhone(phones) {
                    var result = {
                        mobile: '',
                        phone: []
                    };
                    if (phones && phones.length > 0) {
                        var len = phones.length,
                            i = 0,
                            item;
                        for (; i < len; i++) {
                            item = phones[i];
                            if (item.type === 'mobile') {
                                result.mobile = item.value;
                            } else {
                                result.phone.push(item.value);
                            }
                        }
                    }
                    return result;
                }


                function localContactIdFilter(id, isAdd) {
                    var len = localContactId.length,
                        i = 0,
                        item;
                    var contact = getContactsBylocalContactId([id])[0];
                    if (isAdd) {
                        if (len >= 10) {
                            contact.checked = false;

                            return;
                        }
                        localContactId.push({'id': id});
                    } else {
                        for (; i < len; i++) {
                            item = localContactId[i];
                            if (item.id === id) {
                                localContactId.splice(i, 1);//remove current id
                                return;
                            }
                        }
                    }
                }

                $scope.selectLocalContact = function (id, isAdd) {
                    localContactIdFilter(id, isAdd);
                };

                function getTelephoneOptions(ContactItem) {
                    var data = ContactItem, options = {};
                    options.count = 0;
                    if (data.entity.Telephone) {
                        options.count++;
                        options.telephone = true;
                    }
                    if (data.mobile.length) {
                        options.count++;
                        options.mobile = true;
                    }
                    if (data.entity2.Telephone) {
                        options.count++;
                        options.telephone2 = true;
                    }
                    //if (data.fax.length) {
                    //    options.count++;
                    //    options.fax = true;
                    //}
                    return options;
                }


                function getCountrieCodeId() {
                    var companyCode = JSON.parse(localStorage.getItem("companyName")).code,
                        countryCode = getCountryCode(),
                        i = 0,
                        len;
                    //areaCode: "+376"
                    //id: 1
                    businessPartnerContactListDataService.loadCountriesByFilter({
                        "SearchText": ""
                    }).then(function (data) {
                        hideLoading();

                        len = data.length;
                        for (; i < len; i++) {
                            if (data[i].areaCode === countryCode) {
                                return data[i].id;
                            }
                        }

                    }, function (err) {
                        hideLoading();
                        console.log(err);
                    });
                }


                function getContactsBylocalContactId(ids) {
                    var result = [];
                    var idsLen = ids.length;
                    for (var j = 0; j < idsLen; j++) {
                        var len = $scope.localContactList.length,
                            i = 0,
                            item;
                        for (; i < len; i++) {
                            item = $scope.localContactList[i];
                            if (item.id === ids[j].id) {
                                result.push($scope.localContactList[i]);
                            }
                        }
                    }
                    return result;
                }

                function loadData() {
                    showLoading();
                    $scope.newOptions.CompanyCode = JSON.parse(localStorage.getItem("companyName")).code;
                    $scope.imgOptions.CompanyCode = JSON.parse(localStorage.getItem("companyName")).code;
                    $scope.newOptions.BpId = $stateParams.businessPartnerId;
                   $scope.selectbpname= commonBusinessPartnerDataService.returnBpName();
                    bpSummaryContactsDataService.getBpContactsSummary($scope.newOptions).then(function (data) {
                        if (data.length > 0) {
                            $scope.businessPartnerContactLists = data;
                            $scope.showBPContactListContent=true;
                        } else {
                            $scope.showBPContactListContent=false;
                            //$('#businessPartnerContactList ion-content.nodata').html('<p style="position: absolute;top:50%;width: 100%;text-align: center;font-size: x-large;color: rgb(169,169,169">No further Contact is listed to this Businesspartner</p>');
                            $('#businessPartnerContactList ion-content.nodata p').css({
                                "font-size": "x-large",
                                "color": "darkgray"
                            });
                        }

                    }, function () {
                        console.log("error");
                    })

                }

                function loadTranslations() {
                    $scope.translate = platformTranslateService.instant({
                        businessPartner: ['noDataMessage','toSearch']
                    });
                }

                $scope.$on('ngRepeatFinished', function () {
                    var nodeValue = $('#businessPartnerContactList div.list input').val();
                    if (nodeValue) {
                        var nodes = $('#businessPartnerContactList ion-list .contact-item-detail .contact-item-name');
                        if (nodes) {
                            var Pattern = new RegExp(nodeValue, "i");
                            for (var i = 0; i < nodes.length; i++) {
                                var value = Pattern.exec(jQuery(nodes[i]).text());
                                if (value) {
                                    var contactParrnt = jQuery(nodes[i]).text().replace(value[0], "<span style=\" color:red;font-weight: bold\">" + value[0] + "</span>");
                                    jQuery(nodes[i]).html(contactParrnt);
                                }

                            }
                        }
                    }
                });

                function init() {
                    $scope.options = "";
                    $scope.showBPContactListContent=true;
                    loadTranslations();
                    loadData();
                    getCountrieCodeId();
                }

                init();

            }]);
})(angular);