angular.module('starter', [
    'ionic',
    'LocalStorageModule',
    'btford.socket-io',
    'angularMoment'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeController',
      templateUrl: 'templates/home.html'
    })
    .state('chat', {
      url: '/chat',
      controller: 'ChatController',
      templateUrl: 'templates/chat.html'
    });

  $urlRouterProvider.otherwise('/');

});
