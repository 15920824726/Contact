/**
 * Created by hot on 2016-6-15.
 */

var globals = {//jshint ignore:line
	modules: [],
	appBaseUrl: window.location.host+window.location.pathname.replace('index.html',''),
	server: 'https://itwo40-int.rib-software.com/itwo40/Daily/services',
	//server:'https://116.6.216.43:91/Cloud5D/V1New/services',
	//server:'http://rib-cn-dev506-2/Cloud5D/V1/services',
	//mikeserver:'https://rib-cn-dev506-2/Cloud5D/V1/services',
	identityServer: 'https://itwo40-int.rib-software.com/itwo40/daily/identityserver',//core/connect/token',
	userInfo: null
};



var app = {//jshint ignore:line
	productVersion: '0.0.1',
	productName: 'Contact APP',
	translations: {}
};

var globalLanguages = [//jshint ignore:line
	{language: 'de', languageName: 'German', languageName$tr$: 'platform.loginLanguageGerman', culture: 'de-de'},
	{language: 'en', languageName: 'English', languageName$tr$: 'platform.loginLanguageEnglish', culture: 'en-gb'},
	{language: 'cn', languageName: 'Chinese', languageName$tr$: 'platform.loginLanguageChinese', culture: 'zh-cn'}
];

var serviceURL = utils.getUrlQueryString('service');//jshint ignore:line
if (serviceURL) {
	globals.appBaseUrl = serviceURL + '/';
}

window.addEventListener('native.keyboardshow', keyboardShowHandler);

function keyboardShowHandler(e){
	if($('.tab-nav.tabs')){
		$('.tab-nav.tabs').hide()
	}
}


window.addEventListener('native.keyboardhide', keyboardHideHandler);

function keyboardHideHandler(e){
	if($('.tab-nav.tabs')){
		$('.tab-nav.tabs').show();
	}
}

