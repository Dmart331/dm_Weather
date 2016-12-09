"use strict";
angular.module('starter.controllers', [])

.controller('RedditCtrl', function($scope, $location, $http) {
        $scope.changeView = function(view){
            $location.path(view); 
          }
          $scope.stories = []
          $http.get('https://www.reddit.com/r/space.json')
          .success(function(response){
            angular.forEach(response.data.children, function(child){
              $scope.stories.push(child.data);
            });
          });
    })

.controller('WeatherCtrl', function($scope, $http, Weather) {
          $scope.weather = []
          console.log(Weather.API_key)
          $http.get(`http://api.wunderground.com/api/${Weather.API_key}/conditions/q/TN/Nashville.json`)
          .success( (weatherObject) => {
          $scope.weatherCollection = weatherObject;
          $scope.weather.push($scope.weatherCollection);
      });
          
    })




.controller('ChatDetailCtrl', function($scope, Weather) {
  console.log("doing it");
})

.controller('TrafficCtrl', function($scope, $ionicLoading) {
  $scope.$on("$ionicView.enter", function(event, data){
    $ionicLoading.show({
    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
    duration:3000
    });
  });
  $scope.hide = function(){
    $ionicLoading.hide();
  }

    google.maps.event.addDomListener(window, 'load', function() {
        var mapOptions = {
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
            $scope.hide()
        });
 
        $scope.map = map;
    });
 
});