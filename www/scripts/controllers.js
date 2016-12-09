"use strict";
angular.module('starter.controllers', ['angularMoment'])

.controller('RedditCtrl', function($scope, $location, $http) {
        $scope.changeView = function(view){
            $location.path(view); 
          }
          $scope.stories = []
          function loadStories(params, callback){
            var stories = [];
             $http.get('https://www.reddit.com/r/all/new/.json', {params: params})
          .success(function(response){
            angular.forEach(response.data.children, function(child){
              stories.push(child.data);
            });
            callback(stories)
          });
          }
          $scope.loadOlderStories = function(){
            var params = {};
            if($scope.stories.length > 0){
              params['after'] = $scope.stories[$scope.stories.length - 1].name;
            }
            loadStories(params, function(olderStories){
              $scope.stories = $scope.stories.concat(olderStories);
              $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$apply()
            });
          }
          $scope.loadNewStories = function(){
            var params = {'before': $scope.stories[0].name};
            loadStories(params, function(newStories){
              $scope.stories = newStories.concat($scope.stories);
              $scope.$broadcast('scorll.refreshComplete');
            })

          }
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