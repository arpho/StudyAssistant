angular.module('studyAssistant.controllers')
.controller('ActivityCtrl', ['Utility','User','Activity','$scope','$timeout','ionicMaterialMotion', 'ionicMaterialInk','$state','$ionicActionSheet',function(Utility,User,Activity,$scope, /*$stateParams,*/ $timeout, ionicMaterialMotion, ionicMaterialInk,$state,$ionicActionSheet) {
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
                            //console.log('task callback ricevuti i tasks',data.val())
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
            //console.log('lista tasks ',$scope.activities)

           }
        $scope.view = function(key){
            var task = Utility.retrieveTask(key,Activity.getTasks(normalizer))
            console.log('viewing',key)
            $scope.task = task
            $scope.action = 'Modifica'
            $scope.doAction = function(){
                task = angular.copy(task) //rimuovo i campi di ng-repeat
                Activity.updateTask(ref,task)
            }

            Utility.showModal('templates/taskPopup.html','slide-in-up',$scope)
        }
        $scope.done = function(key){
        var today = Utility.formatDate(new Date())
        var task = Utility.retrieveTask(key,Activity.getTasks(normalizer))
        task.lastTime = today
        task.rep++
        task.history.push(today)
        task.nextTime = Utility.formatDate(Utility.addDays(new Date(),Activity.getDays(task.rep)))
        Activity.updateTask(ref,angular.copy(task))
        Utilities.notify("prossima volta "+ task.nextTime)
        }
        //recupero i tasks da firebase
        Activity.retrieveTasks(ref,taskCback)
    }

    $scope.deleteTask = function(key){
        var task = Utility.retrieveTask(key,Activity.getTasks(normalizer))
        Utility.confirmPopup('cancellare '+task.activity+'?'
        ,'Vuoi proprio farlo?'
        ,function(){Activity.deleteTask(ref,key)}
        ,function(){console.log('no non vuole')})

    }
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.customFilter = function(value){
    var filter = {}
    filter[0] = function(task){
            var out
            ,today = Utility.formatDate(new Date())
            if( task.nextTime ==today|| task.lastTime == today) out = task
        return out
    }
    filter[1] = function(task){
        var out,tomorrow = Utility.formatDate(Utility.addDays(new Date(),1))
        if (task.nextTime==tomorrow) out = task
        return out
    }
    filter[2] = function(value){
        return value // li ritorno tutti
    }
    if (filter[$scope.activeFilter])// se ilfiltro è definito applico il filtro, altrimenti ritorno il task
       {
        out = filter[$scope.activeFilter](value)
       }
    else out = value


    return out
    }
    $scope.activeFilter
    $scope.$watch('activeParam',function(newValue,oldValue){
    })
    $scope.$parent.setHeaderFab('right');
    $scope.$on('settedFilter',function(event,data){
        $scope.activeFilter = data // aggiorno il filtro attivo
        console.log('impostato filtro',data)
    })




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