/**
 * Created by edw on 2016/6/29.
 */
(function (angular) {
    'ues strict';
    var moduleName = 'App.favorite';

    angular.module(moduleName).controller('favoriteDetailController',
        ['$scope', '$stateParams', '$translate','phoneHelper',
            function ($scope, $stateParams, $translate,phoneHelper) {

                $scope.favoriteContactsDetailData = {};

                var translatePrefix = 'favoriteDetail.';

                $scope.translate = {
                    "favoriteDetail": {
                        "email": "",
                        "mobile": "",
                        "fax": "",
                        "telephone": "",
                        "OtherTelephone":"",
                        "message":""
                    }
                };

                $scope.deviceHelper = phoneHelper;
                function refreshTranslation() {
                    for (var item in $scope.translate.favoriteDetail) {
                        $scope.translate.favoriteDetail[item] = $translate.instant(translatePrefix + item);
                    }
                }

                function init() {
                    //debugger;
                    refreshTranslation();
                    var app = $stateParams;
                    if($stateParams.data.Name!=null && $stateParams.data.Name!=" "){
                        $scope.isShow=true;
                        $scope.favoriteContactsDetailData = $stateParams.data;

                    }else if($stateParams.data.Email!="" ||$stateParams.data.MobilePattern!="" || $stateParams.data.TelefaxPattern!=""
                       || $stateParams.data.Telephone2Pattern!="" ||$stateParams.data.TelephonePattern!="" ){
                        $scope.isShow=true;
                        $scope.favoriteContactsDetailData = $stateParams.data;
                    }
                    else {
                        $scope.isShow=false;
                    }
                }

                init();


            }]);


})(angular)