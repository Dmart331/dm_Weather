"use strict";
angular.module('starter', ['ionic', 'starter.directives' , 'starter.controllers', 'starter.services' , 'angularMoment' ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // .state('tab.alarm', {
  //   url: '/Alarm',
  //   views: {
  //     'tab-alarm': {
  //       templateUrl: 'templates/tab-alarm.html',
  //       controller: 'AlarmCtrl'
  //     }
  //   }
  // })

  .state('tab.reddit', {
    url: '/reddit',
    views: {
      'tab-reddit': {
        templateUrl: 'templates/tab-reddit.html',
        controller: 'RedditCtrl'
      }
    }
  })

  .state('tab.weather', {
      url: '/Weather',
      views: {
        'tab-weather': {
          templateUrl: 'templates/tab-weather.html',
          controller: 'WeatherCtrl'
        }
      }
    })
    .state('tab.Weather-Detail', {
      url: '/Weather/Weather-Detail',
      views: {
        'tab-weather': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'WeatherCtrl'
        }
      }
    })

  .state('tab.traffic', {
    url: '/traffic',
    views: {
      'tab-traffic': {
        templateUrl: 'templates/tab-traffic.html',
        controller: 'TrafficCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/reddit');

});