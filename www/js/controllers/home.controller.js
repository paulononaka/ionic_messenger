(function(){
  angular.module('starter')
    .controller('HomeController', ['$scope', '$state', 'localStorageService', 'SocketIOService', HomeController]);

  function HomeController($scope, $state, localStorageService, SocketIOService){
    
    $scope.login = function(username){
      localStorageService.set('user', username);
      ScocketIOService.emit('chat:join', { user: username });
      $state.go('chat');
    };

  };

})();
