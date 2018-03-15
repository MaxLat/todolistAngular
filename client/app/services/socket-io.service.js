angular.module('moduletodo').
factory('mySocket', function (socketFactory) {
  return socketFactory();
})