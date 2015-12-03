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
        //recupero i tasks da firebase
        Activity.retrieveTasks(ref,taskCback)
    }
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.customFilter = function(value){
    var discriminator = {}
    discriminator[0] = function(task){
    console.log('discriminator 0')
        var out
        ,today = Utility.formatDate(new Date())
        if( task.nextTime ==today|| task.lastTime == today) out = task
    return out
    }
    discriminator[1] = function(task){
        var out,tomorrow = Utility.formatDate(Utility.addDays(new Date(),1))
        if (task.nextTime==tomorrow) out = task
    console.log('discriminator 1',task)
    return out
    }
    discriminator[2] = function(value){
    console.log('discriminator 2',value)
        return value
    }
    if ($scope.activeFilter && discriminator[$scope.activeFilter])// se ilfiltro è definito applico il filtro, altrimenti ritorno il task
       {
        out = discriminator[$scope.activeFilter](value)
            console.log('activeFilter',$scope.activeFilter)
       }
    else out = value


    return out
    }
    $scope.activeFilter
    $scope.$watch('activeParam',function(newValue,oldValue){
        console.log('activeFilter changed from '+oldValue+' to '+newValue)
    })
    $scope.$parent.setHeaderFab('right');
    $scope.$on('settedFilter',function(event,data){
        $scope.activeFilter = data // aggiorno il filtro attivo
    })
    $scope.selectFilter = function(){
        var filterSheet = $ionicActionSheet.show({
            buttons:[
                {text:'Wod(work of day)'}
                ,{text:'Wot(Work of tomorrow)'}
                ,{text:'All'}
            ]
            ,buttonClicked:function(index){

                console.log('scelto:',index);
                //console.log('filterParam',$scope.filterParam)
                $scope.activeFilter = index
                filterSheet()
            }
        })
    }




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