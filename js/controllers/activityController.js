angular.module('studyAssistant.controllers')
.controller('ActivityCtrl', ['Utility','User','Activity','$scope','$timeout','ionicMaterialMotion', 'ionicMaterialInk','$state',function(Utility,User,Activity,$scope, /*$stateParams,*/ $timeout, ionicMaterialMotion, ionicMaterialInk,$state) {
  /*  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();*/
    if(!User.isLogged()){ // utente non loggato
        console.log('utente non loggato')
        $state.go('app.login')
    }
    else{
        var ref = Utility.getAuth()
           var taskCback = function(data){
                            Activity.setRawTasks(data.val())
                            console.log('task callback ricevuti i tasks',data.val())
                var normalizer = function(rawTasks){
                        var tasks = []
                             for (var key in rawTasks){ // per comodità aggiungo a tutti i task il campo key
                                var val = rawTasks[key]
                                val.key = key
                                tasks.push(val)
                             }
                        return tasks
                    }
            //metto nello $scope i task normalizzati
            $scope.activities = Activity.getTasks(normalizer)
            console.log('lista tasks ',$scope.activities)

           }
        //recupero i tasks da firebase
        Activity.retrieveTasks(ref,taskCback)
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
    //$scope.activities = Activity.getTasks(normalizer)


    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
}])