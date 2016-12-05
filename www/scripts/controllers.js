angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $location) {
        $scope.changeView = function(view){
            $location.path(view); // path not hash
        }
    })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  Chats.getWeather()
                  .then((weather) => {
                  $scope.weather = weather;
          console.log("Chats" , $scope.weather[0].current_observation.temp_f)
          })
          })



.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
