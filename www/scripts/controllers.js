"use strict";
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $location) {
        $scope.changeView = function(view){
            $location.path(view); // path not hash
        }
    })

.controller('WeatherCtrl', function($scope, Weather) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  Weather.getWeather()
                  .then((weather) => {
                  $scope.weather = weather;
          console.log("Weather" , $scope.weather[0].current_observation.temp_f)
          })
          })



.controller('ChatDetailCtrl', function($scope, $stateParams, Weather) {
  $scope.chat = Weather.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $ionicLoading) {
 
    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
            var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);
        });
 
        $scope.map = map;
    });
 
});