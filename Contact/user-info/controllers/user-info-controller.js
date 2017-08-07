///**
// * Created by hot on 2016-6-15.
// */
//(function (angular) {
//	'use strict';
//
//	var moduleName = 'App.userInfo';
//	angular.module(moduleName).controller('userInfoController',
//		[
//			'$scope',
//			'userInfoDataService',
//			'$ionicPopup',
//			'$translate',
//			'$ionicActionSheet',
//			'$cordovaCamera',
//			'platformsDesService',
//			'$state',
//			'appBaseDataService',
//			'platformContextService',
//			'_',
//			'platformLogonService',
//			'platformTranslateService',
//			'tokenAuthentication',
//			'$timeout',
//			function ($scope,
//			          dataService,
//			          $ionicPopup,
//			          $translate,
//			          $ionicActionSheet,
//			          $cordovaCamera,
//			          platformsDesService,
//			          $state,
//			          appBaseDataService,
//			          platformContextService,
//			          _,
//			          logonService,
//			          platformTranslateService,
//			          tokenAuthentication,
//			          $timeout) {
//
//				var pictureSourceType = {
//						PHOTOLIBRARY: 0,
//						CAMERA: 1
//					},
//					hideSheet, feedBackMessage, title, phoneGapOnly, uploadFail,
//					photo = {
//						take: '',
//						choose: '',
//						cancel: ''
//					};
//
//				appBaseDataService.initController($scope);
//
//				//init data start
//				$scope.languages = angular.copy(logonService.getUiLanguages());
//				//get default languageId
//				$scope.languageId = platformContextService.getLanguage();
//
//				$scope.changePassword = false;
//
//				$scope.userInfo = {};
//
//				$scope.password = {
//					oldPassword: '',
//					newPassword: '',
//					confirmPassword: '',
//					onSave: function (userInfoForm) {
//						if (userInfoForm.$valid) {
//							savePassword();
//						}
//					},
//					onCancel: function () {
//						$scope.changePassword = false;
//					}
//				};
//				//button event start
//				$scope.uploadPicture = function () {
//					openActionSheet();
//				};
//
//				$scope.showChangePassword = function () {
//					if (!$scope.changePassword) {
//						$scope.changePassword = true;
//					}
//				};
//
//				function openActionSheet() {
//					hideSheet = $ionicActionSheet.show({
//						buttons: [
//							{
//								text: photo.take
//							},
//							{
//								text: photo.choose
//							}
//						],
//						titleText: title,
//						cancelText: photo.cancel,
//						cancel: function () {
//							hideSheet();
//						},
//						buttonClicked: function (index) {
//							//0 take 1 choose
//							var photoType = index === 0 ? pictureSourceType.CAMERA : pictureSourceType.PHOTOLIBRARY;
//							takePhoto(photoType);
//						}
//					});
//				}
//
//				function takePhoto(photoType) {
//
//					try {
//						var options = {
//							quality: 100,//50
//							destinationType: Camera.DestinationType.DATA_URL,
//							sourceType: Camera.PictureSourceType.CAMERA,
//							allowEdit: true,
//							encodingType: Camera.EncodingType.JPEG,
//							targetWidth: 100,
//							targetHeight: 100,
//							popoverOptions: CameraPopoverOptions,//jshint ignore:line
//							saveToPhotoAlbum: false
//						};
//
//						if (photoType === pictureSourceType.CAMERA) {
//							options.sourceType = Camera.PictureSourceType.CAMERA;
//						} else {
//							options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
//						}
//
//						$cordovaCamera.getPicture(options).then(function (imageData) {
//							savePhoto(imageData);
//						}, function () {
//							hideSheet();
//						});
//					} catch (error) {
//						closeActionSheet();
//					}
//				}
//
//				function savePhoto(imageData) {
//
//					//copy for save fail
//					var user = angular.copy($scope.userInfo);
//					user.icon = imageData;
//					hideSheet();
//					$scope.showLoading();
//					dataService.savePhoto(user).then(function () {
//						$scope.userInfo.icon = 'data:image/jpeg;base64,' + imageData;
//						dataService.replaceUserIcon(imageData);//store back to local storage
//						$scope.hideLoading();
//						hideSheet();
//					}, function () {
//						$scope.hideLoading();
//						openDialog(title, uploadFail);
//					});
//				}
//
//				function closeActionSheet() {
//					openDialog(title, phoneGapOnly);
//					hideSheet();
//				}
//
//				//save password
//				function savePassword() {
//
//					if (checkPasswordValid()) {
//						//check username and password
//						$scope.showLoading();
//						dataService.login($scope.userInfo.username,
//							platformsDesService.encrypt($scope.password.oldPassword))
//							.then(function () {
//								$scope.userInfo.password = platformsDesService.encrypt($scope.password.newPassword);
//								//save password
//								dataService.saveUser($scope.userInfo).then(function () {
//									//show success message
//									openDialog(feedBackMessage.title, feedBackMessage.successMessage);
//									//save to login user info
//									saveLoginUserInfo($scope.userInfo.username, $scope.password.newPassword);
//									delete $scope.userInfo.password;
//									$scope.hideLoading();
//								}, function () {
//									onLoginError();
//									//delete password in case of error
//									delete $scope.userInfo.password;
//								});
//							}, function () {
//								onLoginError();
//							});
//					}
//				}
//
//				function saveLoginUserInfo(userName, password) {
//					var user = dataService.getLoginUserInfo();
//					if (user) {
//						dataService.saveLoginUserInfo(userName, password);
//					}
//				}
//
//				function checkPasswordValid() {
//					if (!angular.equals($scope.password.newPassword, $scope.password.confirmPassword)) {
//						openDialog(feedBackMessage.title, feedBackMessage.unValidConPassword);
//						return false;
//					}
//					return true;
//				}
//
//				//show Complete
//				function openDialog(title, message) {
//					$ionicPopup.alert({
//						title: title,
//						template: message
//					});
//				}
//
//				function onLoginError() {
//					$scope.hideLoading();
//					openDialog(feedBackMessage.title, feedBackMessage.unValidOldPassword);
//				}
//
//				$scope.loginOut = function () {
//					//todo:1.clearToke,2.goto Login 3.
//					tokenAuthentication.logout();
//					$state.go('login');
//				};
//
//				$scope.changeLanguage = function (languageId) {
//					dataService.changeLanguage(languageId, $scope.languages);
//					$timeout(function () {
//						$scope.$apply();
//					});
//				};
//
//				function getAllTranslation() {
//					feedBackMessage = {
//						title: $translate.instant('userInfo.feedBackMessage.title'),
//						unValidConPassword: $translate.instant('userInfo.feedBackMessage.unValidConPassword'),
//						unValidOldPassword: $translate.instant('userInfo.feedBackMessage.unValidOldPassword'),
//						successMessage: $translate.instant('userInfo.feedBackMessage.successMessage')
//					};
//
//					title = $translate.instant('userInfo.photo.title');
//					phoneGapOnly = $translate.instant('userInfo.photo.phoneGapOnly');
//					uploadFail = $translate.instant('userInfo.photo.uploadFail');
//
//					$scope.userInfoTranslation = {
//						userInfo: {
//							loginName: $translate.instant('userInfo.loginName'),
//							loginAddress: $translate.instant('userInfo.loginAddress'),
//							loginPassword: $translate.instant('userInfo.loginPassword'),
//							change: $translate.instant('userInfo.change')
//						},
//						password: {
//							oldPassword: $translate.instant('userInfo.password.oldPassword'),
//							newPassword: $translate.instant('userInfo.password.newPassword'),
//							conPassword: $translate.instant('userInfo.password.conPassword'),
//							save: $translate.instant('userInfo.password.save'),
//							cancel: $translate.instant('userInfo.password.cancel')
//						},
//						language: {
//							changeLanguage: $translate.instant('userInfo.language.changLanguage')
//						}
//					};
//
//					photo.take = $translate.instant('userInfo.photo.take');
//					photo.choose = $translate.instant('userInfo.photo.choose');
//					photo.cancel = $translate.instant('userInfo.photo.cancel');
//					$scope.logOut = $translate.instant('login.loginOut');
//					app.headerTitle = platformTranslateService.instant({
//						main: ['appName']
//					}).main.appName;
//
//					$scope.$broadcast('headerChange', app.headerTitle);
//				}
//
//				function init() {
//					$scope.userInfo = dataService.getUserData();
//
//					if (!$scope.userInfo.icon) {
//						$scope.userInfo.icon = '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';
//					}
//					$scope.userInfo.icon = 'data:image/jpeg;base64,' + $scope.userInfo.icon;
//					// register translation changed event
//					platformTranslateService.translationChanged.register(getAllTranslation);
//					if (!$scope.userInfo) {
//						$state.go('login');
//					}
//					getAllTranslation();
//				}
//
//				init();
//
//				$scope.$on('$destroy', function () {
//					platformTranslateService.translationChanged.unregister(getAllTranslation);
//				});
//			}]);
//})(angular);