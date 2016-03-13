(function(){
  angular.module('starter')
  .controller('ChatController', ['$scope', '$state', 'localStorageService', 'SocketIOService', 'moment', '$ionicScrollDelegate', ChatController]);

  function ChatController($scope, $state, localStorageService, SocketIOService, moment, $ionicScrollDelegate){

    $scope.me = localStorageService.get('user');
    $scope.chat = 'devsbeer';
    $scope.messages = [];

    $scope.isMe = function(user){
      if($scope.me === user){
        return true;
      }
      return false;
    };

    $scope.sendMessage = function(){
      var msg = {
        'type': 'message',
        'user': $scope.me,
        'text': $scope.message,
        'time': moment()
      };
      $scope.messages.push(msg);
      SocketIOService.emit('send:message', msg);
      $ionicScrollDelegate.scrollBottom();
      $scope.message = '';
    };

    $scope.leave = function(){
      var msg = {
        'user': $scope.me
      };
      SocketIOService.emit('chat:leave', msg);
      $state.go('home');
    };

    $scope.humanize = function(timestamp){
      return moment(timestamp).fromNow();
    };

    SocketIOService.on('message', function(msg){
      msg.type = 'message';
      $scope.messages.push(msg);
      $ionicScrollDelegate.scrollBottom();
    });

    SocketIOService.on('join', function(msg){
      msg.type = 'join';
      msg.text = msg.user + " entrou";
      msg.time = moment();
      $scope.messages.push(msg);
      $ionicScrollDelegate.scrollBottom();
    });

    SocketIOService.on('leave', function(msg){
      msg.type = 'leave';
      msg.text = msg.user + " saiu";
      msg.time = moment();
      $scope.messages.push(msg);
      $ionicScrollDelegate.scrollBottom();
    });

  }

})();
