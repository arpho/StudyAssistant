// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('studyAssistant', ['ionic', 'studyAssistant.controllers','studyAssistant.services','studyAssistant.directives','firebase', 'ionic-material', 'ionMdInput'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.activity', {
        url: '/activity'
        ,name:'activity'
        ,views: {
            'menuContent': {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityCtrl'
            }
            ,'fabContent': {
                template: '<button id="fab-activity" ng-click="newTask()" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout,$scope,$ionicModal,Activity,Utility) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                    $scope.newTask = function(){
                        $scope.task = {} // inserisco un nuovo task nello scope
                        $scope.action = 'Crea'// setto il testo del bottone sul popup

                        $scope.doAction = function(){
                        $scope.task.lastTime = Utility.formatDate(new Date())
                        $scope.task.nextTime = Utility.formatDate(Utility.addDays(new Date(),1)) /* quando creo il task
                        ipotizzo che sia la prima ripetizione quindi nextTime è l'indomani */
                        $scope.task.rep = 0
                        $scope.task.history = []
                        $scope.task.history.push($scope.task.lastTime)
                        console.log('creato task',$scope.task)
                        var ref = Utility.getAuth()
                        var cback = function(){
                            $scope.closeModal()// chiude il popup
                        }
                        Activity.createTask(ref,$scope.task,cback)
                        }
                        Utility.showModal('templates/taskPopup.html','slide-in-up',$scope)

                    }
                }
            }
        }
    })

    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html'
                ,controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.signup',{
        url:'/signup',
        views:{
            'menuContent':{
                templateUrl:'templates/signup.html'
                ,controller:'SignupController'
            }
            ,'fabContent': {
                             template: ''
                         }
        }
    })
    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    .state('app.scheduling', {
        url: '/scheduling',
        views: {
            'menuContent': {
                templateUrl: 'templates/scheduling.html',
                controller: 'schedulingController'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
}]);
