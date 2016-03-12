(function(){
  angular.module('starter')
    .service('SocketIOService', ['socketFactory', SocketIOService]);

  function SocketIOService(socketFactory){

    return socketFactory({
      ioSocket: io.connect('https://nameless-cove-97938.herokuapp.com')
    });
  }
})();
