(function (angular, tt) {
	'use strict';

	// Ionic Starter App
	var requiredModules = [
		'ionic',
		'ngCordova',
		'pascalprecht.translate',
		'platform',
		'Thinktecture.Authentication',
		'ngCordova',
		'ngIOS9UIWebViewPatch',
		'$cordovaNetWorkTips',
		'statusBarOverlay'
	].concat(globals.modules);

	angular.module('App', requiredModules)
		//enter
		.run(['$ionicPlatform',
			'$rootScope',
			'$state',
			'NetWorkTranslationDataService',
			'platformContextService',
			function ($ionicPlatform,
			          $rootScope, $state,
			          NetWorkTranslationDataService,
			          platformContextService) {
				//load translate data
				NetWorkTranslationDataService.registerNetWorkTranslation();

				//initialize Context
				platformContextService.initialize();
				$ionicPlatform.ready(function () {

					window.setTimeout(function () {
						jQuery('.loading-page').fadeOut(1500);
					}, 500);
					// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
					// for form inputs)
					if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
						cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
					}
					if (window.StatusBar) {
						// org.apache.cordova.statusbar required
						window.StatusBar.styleLightContent();
					}

				});

				//watch token for ajax response.status === 401
				$rootScope.$on('grantInValid', function () {
					$state.go('login');
				});

				//watch token response.status === 405
				$rootScope.$on('initialServer', function () {
					$state.go('login');
				});

				app.navigateTo = function (str, backUrl) {
					if (backUrl && str === 'login') {
						$state.go(str, {data: backUrl});
					}
					else {
						$state.go(str);
					}
				};

				$rootScope.$on(tt.authentication.logoutConfirmed, function () {
					$state.transitionTo('login');
				});

				$rootScope.$on(tt.authentication.authenticationRequired, function () {
					$state.transitionTo('login');
				});

				// $state Error
				$rootScope.$on('$stateChangeError', function (ev, toState, toParams, fromState, fromParams, error) {
					if (fromState.url === '^' && !tt.authentication.userLoggedIn) {
						ev.preventDefault();
						$state.get('login').error = {code: 123, description: 'Exception stack trace'};
						return $state.go('login');
					} else {
						console.log('$stateChangeError', toState.name, toParams, fromState, fromParams, error);
					}
				});

			}])

		// token authentication, loading bar are configured here. auto add Provider
		.config(['tokenAuthenticationProvider',
			function (tokenAuthenticationProvider) {
				tokenAuthenticationProvider.setUrl(globals.identityServer);
				tokenAuthenticationProvider.setBaseUrl(globals.appBaseUrl);
			}
		])

		.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
			function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
			//tab position in ios android
				ionic.Platform.isFullScreen = true;
			$ionicConfigProvider.tabs.position('bottom');

			$ionicConfigProvider.platform.ios.tabs.style('standard');
			$ionicConfigProvider.platform.ios.tabs.position('bottom');
			$ionicConfigProvider.platform.android.tabs.style('standard');
			$ionicConfigProvider.platform.android.tabs.position('standard');

			$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
			$ionicConfigProvider.platform.android.navBar.alignTitle('left');

			$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
			$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

			$ionicConfigProvider.platform.ios.views.transition('ios');
			$ionicConfigProvider.platform.android.views.transition('android');

			$urlRouterProvider.otherwise('/login');
		}])
		//translateProvider
		.config(function ($translateProvider) {
			$translateProvider.useLoader('$translatePartialLoader', {
				urlTemplate: '{part}/content/i18n/{lang}.json'
			});

			$translateProvider.fallbackLanguage('en');
			$translateProvider.translationNotFoundIndicator('X');
			var lastUsedLanguage = globals.readLastLanguageFromStorage();
			if (lastUsedLanguage) {
				$translateProvider.use(lastUsedLanguage.language);
			} else {
				$translateProvider.use('en');
			}
		})

		//edit load text
		.constant('$ionicLoadingConfig', {
			template: '<ion-spinner class="spinner-light"></ion-spinner>'
		});


	/**
	 *
	 * @returns {string}
	 */
	function getDefLanguageOptionsKey() {
		return globals.appBaseUrl + '-defLangOpts';
	}
	/**
	 *
	 * @returns {string}
	 */
	globals.getIdentityServerKey = function getIdentityServerKey() {
		return 'app.identityServer';
	};
	/**
	 *
	 * @returns {string}
	 */
	globals.getServerKey = function getServerKey() {
		return 'app.server';
	};
	/**
	 *
	 * @returns {string}
	 */
	globals.getSelectedCompanyNameKey = function getSelectedCompanyNameKey() {
		return 'companyName';
	};
	/**
	 *
	 * @returns {string}
	 */
	globals.getSelectedRoleNameKey = function getSelectedRoleNameKey() {
		return 'roleName';
	};
	/**
	 *
	 * @returns last language
	 */
	globals.readLastLanguageFromStorage = function readLastLanguageFromStorage() {
		var lastLanguage = localStorage.getItem(getDefLanguageOptionsKey());
		if (lastLanguage && lastLanguage !== 'undefined') {
			return JSON.parse(lastLanguage);
		}
		return null;
	};

	//
	// usage: globals.saveLastLanguageFromStorage ({language:'de', culture: 'de-de'})
	//
	globals.saveLanguageInfo2Storage = function saveLastLanguageFromStorage(languageOptions) {
		var lastLanguageKey = getDefLanguageOptionsKey();
		if (languageOptions) {
			localStorage.setItem(lastLanguageKey, JSON.stringify(languageOptions));
		}
	};

	/**
	 * interceptor http
	 */
		//ajax
	angular.module('App').factory('httpInterceptor', [
		'$q', '$rootScope','tokenAuthentication', function ($q, $rootScope,tokenAuthentication) {
			var interptor = {
				'responseError': function (response) {
					if (response.status > 200) {
						if (response.status === 401) {
							console.log('token missing');
							tokenAuthentication.clearToken();
							//$rootScope.$emit('grantInValid', response);
							return;
						}
						else if (response.status === 405) {
							console.log('server connect fail');
							tokenAuthentication.clearToken();
							//$rootScope.$emit('serverInvalid', response);
						}else if(response.status === 404){
							//alert(0);
							console.log('server connect fail 404');
							tokenAuthentication.clearToken();
							$rootScope.$broadcast('serverInvalid');
						}
						console.log('server connect fail');
					}
					console.log(response.data);
					//return response;
				}
			};
			return interptor;
		}
	]);

	angular.module('App').config(function ($httpProvider) {
		//add rule
		$httpProvider.interceptors.push('httpInterceptor');
	});
	//angular.module('App').controller('myCtrl',['$scope','$ionicModal',function($scope ,$ionicModal){
	//	$scope.language="English";
	//	$scope.languageData= [{text:"English"},{text:"German"},{text:"Chinese"}];
    //
    //
	//	$ionicModal.fromTemplateUrl( 'common/partials/common-setting.html' ,{
	//		scope:$scope,
	//		animation:'slide-in-up'
	//	}).then(function(modal){
	//		console.log("new okok");
	//		$scope.modal=modal;
	//	})
	//}])


})(angular, tt);//jshint ignore:line

