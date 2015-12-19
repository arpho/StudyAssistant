angular.module('studyAssistant.controllers')
.controller('ActivityCtrl', ['Utility','User','Activity','$scope','$timeout','ionicMaterialMotion', 'ionicMaterialInk','$state','$ionicActionSheet','Recall',function(Utility,User,Activity,$scope, /*$stateParams,*/ $timeout, ionicMaterialMotion, ionicMaterialInk,$state,$ionicActionSheet,Recall) {
  /*  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();*/
    $scope.recall

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
        $scope.deleteRecall = function(id){
            console.log('delete recall',id)
            delete $scope.task.recalls[id]
            if($scope.task.recalls.length ==0)
            $scope.subTitleRecalls = " non sono stati definiti recalls"
            else
                $scope.subTitleRecalls = ""
        }
        $scope.addRecall = function(e)
        {
        console.log("adding recall",$scope.task.recall)

        $scope.task.recalls.push({recall:$scope.task.recall})
        $scope.subTitleRecalls = "" // di sucuro c'è almeno un recall
        /*var param = {
                         template: '<input type="text" ng-model="recall">'
                         ,title: 'inserisci il recall'
                         ,subTitle: 'conviene che  sia semplice'
                         ,scope: $scope
                         , buttons:[
                                        {text:'Canc'}
                                        ,{
                                            text: 'add'
                                            ,type:'button-positive'
                                            ,onTap:function(e){
                                            if(!$scope.recall)
                                                e.preventDefault()
                                            else{
                                            console.log('recall',$scope.recall)
                                            }
                                            }
                                        }

                         ]
                    }*/
        //Utility.showPopup(param)
        }
        $scope.view = function(key){
            var task = Utility.retrieveTask(key,Activity.getTasks(normalizer))
            ,ref = Utility.getAuth()
            $scope.task = task
            $scope.task.recall = '' // azzero il recall
            var recallCback = function(data){

            $scope.task.recalls = data.val()|| []
            if($scope.task.recalls.length ==0)
                $scope.subTitleRecalls = " non sono stati definiti recalls"
            }
            // carico i recalls del task
            Recall.getRecalls(ref,task.key,recallCback)
            $scope.action = 'Modifica'
            $scope.doAction = function(){
                console.log("doAction update")
                task = angular.copy($scope.task) //rimuovo i campi di ng-repeat
                // rimuovo i campi recalls  che verranno salvati in un'altra posizione
                var recalls = $scope.task.recalls
                if (recalls ){
                    Recall.createUpdate(ref,$scope.task.key,recalls,function(){
                        console.log('inseriti i recalls')
                    })

                }
                Activity.updateTask(ref,angular.copy($scope.task))
                $scope.closeModal()
            }

            Utility.showModal('templates/taskPopup.html','slide-in-up',$scope)
        }
        var applyDone= function(task,today){
            task.lastTime = today
                        task.rep++
                        task.history.push(today)
                        task.nextTime = Utility.formatDate(Utility.addDays(new Date(),Activity.getDays(task.rep)))
                        Activity.updateTask(ref,angular.copy(task))
                        Utility.notify("prossima volta "+ task.nextTime)
        }

        $scope.done = function(key){
        var today = Utility.formatDate(new Date())
        var task = Utility.retrieveTask(key,Activity.getTasks(normalizer))
        if(task.nextTime==today){
            applyDone(task,today)
        }
        else{
        Utility.confirmPopup('Attenzione '+task.activity+'?'
                ,'questa attività non è prevista per oggi, vuoi segnarla come fatta comunque??'
                ,function(){applyDone(task,today)}
                ,function(){console.log('no non vuole')})

        }
        }
        //recupero i tasks da firebase
        Activity.retrieveTasks(ref,taskCback)
    }
    $scope.itemBackground = function(key){
        var today = Utility.formatDate(new Date())
        var task = Utility.retrieveTask(key,Activity.getTasks(normalizer))
        if (task.lastTime==today)
            return 'balanced-bg'
        else
            return 'stable-bg'
    }

    $scope.moveItem = function(item, fromIndex, toIndex) {
        //Move the item in the array
        $scope.task.recalls.splice(fromIndex, 1); //cancello l'oggetto dalla posizione di partenza
        $scope.task.recalls.splice(toIndex, 0, item); //inserisco l'oggetto nella posizione di arrivo
        console.log("move",$scope.task.recalls, item)
      }

    /*sembra ci sia un baco in ng-class che non lavora bene quando nello stesso oggetto c'è un campo class
    quindi implemento il mio ngClass
    @param classi costanti nell'oggetto
    @param chiave del task
    @return classi costanti + la classe variabile
    */
    $scope.itemClass = function(constClass,key){
        return constClass +" "+ $scope.itemBackground(key)
    }
    $scope.viewRecall = function(recall,index){
    //$scope.updatedRecall = recall
    var param = {
                             template: '<input type="text" ng-model="updatedRecall">'
                             ,title: 'modifica '
                             ,scope: $scope
                             , buttons:[
                                            {text:'ann'}
                                            ,{
                                                text: 'modifica'
                                                ,type:'button-positive'
                                                ,onTap:function(e){
                                                //if(!$scope.updatedRecall)
                                                  //  e.preventDefault()
                                                //else{
                                                console.log('recall',$scope.updatedRecall)

                                                }
                                            }

                             ]
                        }
            Utility.showPopup(param)
    }

    $scope.getIcon = function(key){
        var task = Utility.retrieveTask(key,Activity.getTasks(normalizer))
        var out= 'img/task.jpg'
        ,today = Utility.formatDate(new Date())
        if(task.lastTime==today)
            out = 'img/task_done.jpg'

        return out
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