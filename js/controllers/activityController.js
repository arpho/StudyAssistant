angular.module('studyAssistant.controllers')
.controller('ActivityCtrl', ['Utility','User','Activity','$scope','$timeout','ionicMaterialMotion', 'ionicMaterialInk','$state',function(Utility,User,Activity,$scope, /*$stateParams,*/ $timeout, ionicMaterialMotion, ionicMaterialInk,$state) {
  /*  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();*/
    if(!User.isLogged()){ // utente non loggato
        console.log('utente non loggato')
        $state.go('app.login')
    }
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    var normalizer = function(rawTasks){
        var tasks = []
             for (var key in rawTasks){ // per comodità aggiungo a tutti i task il campo key
                var val = rawTasks[key]
                val.key = key
                tasks.push(val)
             }
        return tasks
    }
    $scope.activities = Activity.getTasks(normalizer)
    console.log($scope.activities)

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
}])