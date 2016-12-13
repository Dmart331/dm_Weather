"use strict";
angular.module('starter.controllers', ['angularMoment', 'ngCordova'])






.controller('AlarmCtrl', function($scope) {

})

//------------------------{Reddit Controller}----------------------//

.controller('RedditCtrl', function($scope, $location, $http) {
    $scope.changeView = function(view) {
        $location.path(view);
    }
    $scope.stories = []

    function loadStories(params, callback) {
        var stories = [];
        $http.get('https://www.reddit.com/hot.json', {
                params: params
            })
            .success(function(response) {
                angular.forEach(response.data.children, function(child) {
                    stories.push(child.data);
                });
                callback(stories)
                if (stories.thumbnail === "self") {
                    stories.thumbnail = "../images/ionic.png"
                }
                console.log($scope.stories)
            });
    }
    $scope.loadOlderStories = function() {
        var params = {};
        if ($scope.stories.length > 0) {
            params['after'] = $scope.stories[$scope.stories.length - 1].name;
        }
        loadStories(params, function(olderStories) {
            $scope.stories = $scope.stories.concat(olderStories);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }
    $scope.loadNewStories = function() {
        var params = {
            'before': $scope.stories[0].name
        };
        loadStories(params, function(newStories) {
            $scope.stories = newStories.concat($scope.stories);
            $scope.$broadcast('scorll.refreshComplete');
            $scope.$apply();
        })
    }
})

//------------------------{Weather Controller}----------------------//

.controller('WeatherCtrl', function($scope, $http, Weather) {
    $scope.weather = [];
    $scope.newWeather = [];
    $scope.zipObj = {
        zip: ''
    };
    $scope.weatherDetail = [];

    // console.log(Weather.API_key);
    $scope.getWeather = function() {
        console.log("zip", $scope.zipObj.zip);
        $http.get(`http://api.wunderground.com/api/${Weather.API_key}/geolookup/q/${$scope.zipObj.zip}.json
        `)
            .success((weatherObject) => {
                $scope.weatherCollection = weatherObject;
                $scope.weather.push($scope.weatherCollection);
                console.log("weather", $scope.weather[0]);
                $http.get(`http://api.wunderground.com/api/${Weather.API_key}/conditions/q/${$scope.weather[0].location.state}/${$scope.weather[0].location.city}.json`)
                    .success((newWeatherObj) => {
                        $scope.newCollection = newWeatherObj;
                        $scope.newWeather.push($scope.newCollection);
                        $http.get(`https://api.darksky.net/forecast/3bcc733553a43c5d324d11d6a83e58c2/${$scope.weather[0].location.lat},${$scope.weather[0].location.lon}`)
                            .success((openObj) => {
                                $scope.openCollection = openObj;
                                $scope.weatherDetail.push($scope.openCollection);
                                console.log("Drew2", $scope.weatherDetail);
                            })
                    })
                console.log("new", $scope.newWeather);
            });
        $scope.weather = [];
        $scope.newWeather = [];
        $scope.zipObj = {
            zip: ''
        };

    }

})

//------------------------{Weather Detail Controller: TODO}----------------------//

.controller('ChatDetailCtrl', function($scope, Weather) {
    // $scope.weather = [];
    // $scope.newWeather = [];
    // $scope.zipObj = {zip: ''};
    // $scope.weatherDetail = [];

    //     // console.log(Weather.API_key);
    // $scope.getWeather = function(){
    //   console.log("zip", $scope.zipObj.zip);
    //  $http.get(`http://api.wunderground.com/api/${Weather.API_key}/geolookup/q/${$scope.zipObj.zip}.json
    //     `)
    //     .success((weatherObject) => {
    //         $scope.weatherCollection = weatherObject;
    //         $scope.weather.push($scope.weatherCollection);
    //         console.log("weather", $scope.weather[0]);
    //         $http.get(`http://api.wunderground.com/api/${Weather.API_key}/conditions/q/${$scope.weather[0].location.state}/${$scope.weather[0].location.city}.json`)
    //             .success((newWeatherObj) => {
    //                 $scope.newCollection = newWeatherObj;
    //                 $scope.newWeather.push($scope.newCollection);
    //                 $http.get(`https://api.darksky.net/forecast/3bcc733553a43c5d324d11d6a83e58c2/${$scope.weather[0].location.lat},${$scope.weather[0].location.lon}`)
    //                   .success((openObj) => {
    //                   $scope.openCollection = openObj;
    //                   $scope.weatherDetail.push($scope.openCollection);
    //                   console.log("Drew2", $scope.weatherDetail);
    //             })
    //              })
    //         console.log("new", $scope.newWeather);
    //     });
    //   $scope.weather= [];
    //   $scope.newWeather= [];
    //   $scope.zipObj = {zip: ''};

    // }
    console.log("Drewwwwwww");
})

//------------------------{Traffic Controller}----------------------//

.controller('TrafficCtrl', function($scope, $ionicLoading, $cordovaGeolocation) {
    $scope.$on("$ionicView.enter", function(event, data) {
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>',
            duration: 3000
        });
    });
    var options = {
        timeout: 10000,
        enableHighAccuracy: true
    };

    $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            setMap: map
        };

        

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        google.maps.event.addListenerOnce($scope.map, 'idle', function() {
            
            var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: latLng,
                
            });


            var infoWindow = new google.maps.InfoWindow({
                content: "Here I am!"
            });
            

            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.open($scope.map, marker);

    var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);
            });

        });
        //

    }, function(error) {
        console.log("Could not get location");
    });
});