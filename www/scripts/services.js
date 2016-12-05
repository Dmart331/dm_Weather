angular.module('starter.services', [])

.factory('Chats', function($http , $window) {
//get weather api call//
  let getWeather = () => {
    let weather = [];
    return new Promise( (resolve, reject) => {
      $http.get(`http://api.wunderground.com/api/7e327ac0450943ac/conditions/q/TN/Nashville.json`)
      .success( (weatherObject) => {
        let weatherCollection = weatherObject;
          weather.push(weatherCollection);
        resolve(weather);
      })
      .error( (error) => {
        reject(error);
      });
    });

  };
  return {getWeather};
});
