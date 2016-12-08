"use strict";
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $location, $http) {
        $scope.changeView = function(view){
            $location.path(view); 
          }
          $scope.stories = []
          $http.get('https://www.reddit.com/me/m/space.json')
          .success(function(response){
            angular.forEach(response.data.children, function(child){
              $scope.stories.push(child.data);
            });
          });
    })

.controller('WeatherCtrl', function($scope, $http) {
          $scope.weather = []
          $http.get('http://api.wunderground.com/api/7e327ac0450943ac/conditions/q/TN/Nashville.json')
          .success( (weatherObject) => {
          $scope.weatherCollection = weatherObject;
          $scope.weather.push($scope.weatherCollection);
      })
    })




// .controller('ChatDetailCtrl', function($scope, $stateParams, Weather) {
//   console.log("doing it");
//   $scope.chat = Weather.get($stateParams.chatId);
// })

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