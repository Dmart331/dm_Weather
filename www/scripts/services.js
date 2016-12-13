"use strict";
angular.module('starter.services', [])

.factory('Weather', function($http , $window) {
      let API_key = "7e327ac0450943ac",
       openAPI = 'd285e8e51b44d4734984b6ab9e4e94cb'
     return {API_key , openAPI};
    })