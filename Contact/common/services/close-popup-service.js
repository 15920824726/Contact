/**
 * Created by hot on 6/16/2016.
 */
(function (angular) {
    'use strict';

    angular.module('App.common').factory('closePopupService',
        [function () {
            var service = {};
            var currentPopup,closeFn;
            var htmlEl = angular.element(document.querySelector('html'));
            htmlEl.on('click', function (event) {
                if (event.target.nodeName === 'HTML') {
                    if (currentPopup) {
                        currentPopup.close();
                        if(closeFn){
                            closeFn();
                        }
                    }
                }
            });

            service.register = function (popup,closeCallBackFn) {
                currentPopup = popup;
                closeFn=closeCallBackFn;
            };
            return service;
        }]);
})(angular);