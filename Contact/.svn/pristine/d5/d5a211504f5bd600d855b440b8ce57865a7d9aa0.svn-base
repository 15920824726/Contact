/**
 * Created by edw on 2016/6/23.
 */
(function (angular) {
    'use strict';
    var moduleName = 'App.project';
    angular.module(moduleName).controller('projectDetailsController',
        ['$scope', '$stateParams', 'platformTranslateService','projectListDataService','phoneHelper','$state',
            function ($scope, $stateParams, platformTranslateService,projectListDataService,phoneHelper,$state) {

                $scope.translate = platformTranslateService.instant({
                    projectDetail: ['status', 'address', 'phoneNumber', 'telefax',"Telephone","OtherTelephone",
                        'mobile', 'email', 'customer',"Customer", "CustomerContact","ContactRole","message"]
                });

                $scope.projectDetailData = {};
                $scope.projectName = '';
                $scope.deviceHelper = phoneHelper;

                $scope.method = function (){
                    var a = 'a';
                };

           $scope.skipMap=function(address){
                    var data={};
                    data.latitude=address.latitude?address.latitude:'';
                    data.longitude=address.longitude?address.longitude:'';
                    data.addressLine=address.addressLine;
                    $state.go('desktop.projectMap',{data:data});

                    // $scope.clickMap=true;
                    //var map = null;
                    //map = new Microsoft.Maps.Map(document.getElementById('myMap'), {credentials: 'AtLnXnaSDb3184ihKIeIhcAuD5XVf-WEvNArjpoHwAklH-zM0boxks77BE1CBQFG'});
                    //map.setView({zoom: 12, center: new Microsoft.Maps.Location(47.609771, -122.2321543125)});

                }


                function Init() {
                    $scope.projectName = $stateParams.data.projectNo+" - "+$stateParams.data.projectName;
                    if($stateParams.data.firstName!="" || $stateParams.data.familyName!="" ){
                        $scope.contactName=$stateParams.data.firstName+" "+$stateParams.data.familyName;
                    }

                  //  $stateParams.data.email=$stateParams.data.email&&jQuery.trim($stateParams.data.email).length>0?$stateParams.data.email:null;
                    $scope.selectCompamy=  JSON.parse(localStorage.getItem('companyName')).name;

                    $scope.projectDetailData = $stateParams.data;
                    //company text
                    //var selectedname=globals.getSelectedCompanyNameKey();
                    //var obj=JSON.parse(localStorage.getItem(selectedname));
                    //$scope.selectcompanyname=obj.code+" "+obj.name;
                }

                Init();

            }]);


})(angular);