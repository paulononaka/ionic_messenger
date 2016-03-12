(function(){
  angular.module('starter')
    .controller('HomeController', ['$scope', '$state', 'localStorageService', 'SocketIOService', HomeController]);

  function HomeController($scope, $state, localStorageService, SocketIOService){
    
    $scope.login = function(username){
      localStorageService.set('user', username);
      SocketIOService.emit('chat:join', { user: username });
      $state.go('chat');
    };

  };

})();
