document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	document.addEventListener('backbutton', eventBackButton, false); //返回键
	//document.addEventListener("menubutton", eventMenuButton, false);  //menu
	document.addEventListener('online', hideNetWorkTips, false);
	document.addEventListener('offline', showNetWorkTips, false);
}

function eventBackButton() {
	navigator.notification.confirm(window.controltower.i18n.AndroidLanguage.ExitPrompt, showConfirm, window.controltower.i18n.AndroidLanguage.Exit, window.controltower.i18n.AndroidLanguage.Done + ',' + window.controltower.i18n.AndroidLanguage.Cancel);
}

//function eventMenuButton() {
//	//menu dosomething
//}

function showConfirm(button) {
	if (button == 1) {
		document.removeEventListener('backbutton', eventBackButton, false);
		navigator.app.exitApp();
	}
}

function showNetWorkTips() {
	document.getElementById('networkTips').style.display = 'block';
}
function hideNetWorkTips() {
	document.getElementById('networkTips').style.display = 'none';
}

window.callActivityPlugin = function (str, callback, failed) {
	cordova.exec(callback, failed, "CallActivityPlugin", "call", str);
};
