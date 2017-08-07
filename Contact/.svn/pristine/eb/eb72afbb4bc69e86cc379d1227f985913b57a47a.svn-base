/**
 * Created by edw on 2016/9/5.   aaaaaa
 */
( function(angular){
    'use strict';

    var moduleName = 'App.business.partner';
    angular.module(moduleName).controller('businessPartnerMapController', ['$scope','$stateParams','$http',function($scope,$stateParams,$http){
        function Init(){
            $http.get(globals.server+'/basics/common/systemoption/map').success(function(data,status){
                console.log(data.GoogleKey);
                var key='AIzaSyATKBhVqIulVmVb_OrYwenAtKUVGwjs3n4';
                var key1=data.GoogleKey;
                $.getScript('http://maps.google.cn/maps/api/js? ='+key1,function(){
                    if($stateParams.data.latitude && $stateParams.data.longitude){
                        getLocationByLatitude($stateParams.data.latitude,$stateParams.data.longitude);
                    }else{
                        getLocationByGeocoding($stateParams.data.addressLine);
                    }
                });
            }).error(function(data,status){
                console.log(error);
            });
        }

        function loadsMapkeyString(key){
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://maps.googleapis.com/maps/api/js?key='+key;
            document.body.appendChild(script);
        }

        function getLocationByLatitude(latitude,longitude){
            var myLatLng = {lat: latitude, lng: longitude};
            var map = new google.maps.Map(document.getElementById('myMapBp'), {
                zoom: 15,
                center: myLatLng
            });
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Hello World!'
            });
            marker.setMap(map);
        }

        function getLocationByGeocoding(address){
            var map = new google.maps.Map(document.getElementById('myMapBp'), {
                zoom: 15
            });
            var geocoder = new google.maps.Geocoder();
            // var address='CN 510000 Guangzhou, Guangzhou LiWan District Liwan Road No.88 Room 815';
            geocoder.geocode({'address': address}, function(results, status) {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                    marker.setMap(map);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }

        //Bing maps V7
        //function defaultLocation(map){
        //        var latlon = map.getCenter();
        //        map.setView({ zoom: 10, center: new Microsoft.Maps.Location(latlon.latitude, latlon.longitude) })
        //    }
        //     function  defaultLocationLL(map,latitude,longitude){
        //    map.setView({ zoom: 10, center: new Microsoft.Maps.Location(latitude, longitude) })
        //}

        //function loadMapByPoint(map,latitude,longitude) {
        //    Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
        //        var searchManager = new Microsoft.Maps.Search.SearchManager(map);
        //        var reverseGeocodeRequestOptions = {
        //            location: new Microsoft.Maps.Location(latitude, longitude),
        //            callback: function (answer, userData) {
        //                map.setView({ bounds: answer.bestView });
        //                map.entities.push(new Microsoft.Maps.Pushpin(reverseGeocodeRequestOptions.location));
        //                document.getElementById('printoutPanel').innerHTML =
        //                    answer.address.formattedAddress;
        //            }
        //        };
        //        searchManager.reverseGeocode(reverseGeocodeRequestOptions);
        //    });
        //
        //}

        //Bing maps V7
        //function loadMapByAddress(map,str) {
        //    Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
        //        var searchManager = new Microsoft.Maps.Search.SearchManager(map);
        //        var requestOptions = {
        //            bounds: map.getBounds(),
        //            where:str,
        //            callback: function (answer, userData) {
        //                map.setView({ bounds: answer.results[0].bestView });
        //                map.entities.push(new Microsoft.Maps.Pushpin(answer.results[0].location));
        //            }
        //        };
        //        searchManager.geocode(requestOptions);
        //    });
        //
        //}

        Init();

    }]);

} )(angular);