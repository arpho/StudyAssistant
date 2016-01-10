angular.module('studyAssistant.controllers')
.controller('schedulingController',['$scope','User','$state','Scheduling','$ionicPopup','Utility',function($scope,User,$state,Scheduling, $ionicPopup,Utility){

    if(!User.isLogged()){ // utente non loggato
            console.log('utente non loggato')
            $state.go('app.login')
        }
     else{

     var setScheduling = function(scheduling){
     $scope.activeScheduling = scheduling
     scheduler.clearAll()// ad ogni caricamento ripulisco lo scheduler
     for (var s in scheduling.events){
        scheduler.addEvent(Scheduling.formatEvent(scheduling.events[s]))
     }
     }
     /*
     viene invocata dalla direttiva dhxscheduler per settare lo scheduler nel suo parent
     */
        $scope.setScheduler = function(scheduler){
            $scope.scheduler = scheduler
        }
        var cbackGetScheduling = function(res){
            $scope.schedulingList =res.val()
            //if($scope.schedulingList.length==1){
                setScheduling($scope.schedulingList[0])
                //$scope.activeScheduling = $scope.schedulingList[0]
            //}
        }
        //carico gli scheduling dal server
        Scheduling.retrieveScheduling(Utility.getAuth(),User.getUid(),cbackGetScheduling)
        $scope.events = [
                /*{ id:1, text:"Task A-12458",
                  start_date: new Date(2016, 1, 06, 9, 0),
                  end_date: new Date(2016, 1, 06, 16, 0) },
                { id:2, text:"Task A-83473",
                  start_date: new Date(2015,11, 28, 9, 0),
                  end_date: new Date(2015, 11, 30, 16, 0) }*/
              ];
        $scope.saveScheduling = function(){
              $scope.activeScheduling = $scope.activeScheduling ||{}

              $scope.schedulingList = $scope.scheduLingList ||[]
              var scheduling = $scope.activeScheduling||{}
              scheduling.events = Scheduling.normalizeEvents($scope.scheduler.getEvents())
              scheduling.id = $scope.activeScheduling.id || new Date().getTime() // se è una modifica di uno scheduling già esistente conservo l'id,altrimenti lo creo
              //if(!scheduling.name){ //non è stato definito il nome
                    scheduling.name = $scope.activeScheduling.name ||'noname'
                     var myPopup = $ionicPopup.show({
                        template: '<input type="text" ng-model="activeScheduling.name">',
                        title: 'confermi questo nome per la programmazione?',
                        //subTitle: '',
                        scope: $scope,
                        buttons: [
                          {
                            text: '<b>Conferma</b>',
                            type: 'button-calm',
                            onTap: function(e) {
                                myPopup.close()
                              if (!scheduling.name) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                              } else {
                                return $scope.activeScheduling.name;
                              }
                            }
                          }
                        ]
                      })
                      myPopup.then(function(res) {
                          console.log('Tapped!', res);
                          scheduling.name = res
                        });
             // } // chiude if controllo nome
              if(Scheduling.exists($scope.schedulingList,scheduling.id))
                 Scheduling.update($scope.schedulingList,scheduling)
              else
                $scope.schedulingList.push(scheduling) // è un nuovo scheduling non presente in lista
              //console.log('schedulingList',$scope.schedulingList)
              var ref = Utility.getAuth()
                , cback = function(err){
                     if(err)
                     {
                        Utility.notify('qualcosa è andato storto')
                        console.log(err)
                     }
                }
              Scheduling.upsert(ref,User.getUid(),$scope.schedulingList,cback)
        }
        $scope.newEvent = function(){
           var id = $scope.scheduler.addEventNow();
            console.log('id',id)
        }
        $scope.newScheduling = function() {
            console.log('new scheduling')
            $scope.activeScheduling = {}
            $scope.activeScheduling.name = "Nuova programmazione"
            scheduler.clearAll()
        }
        }
     }
])