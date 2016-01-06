angular.module('studyAssistant.controllers')
.controller('schedulingController',['$scope','User','$state','Scheduling','$ionicPopup',function($scope,User,$state,Scheduling, $ionicPopup){
    console.log("scheduling c'è")

    if(!User.isLogged()){ // utente non loggato
            console.log('utente non loggato')
            $state.go('app.login')
        }
     else{
     /*
     viene invocata dalla direttiva dhxscheduler per settare lo scheduler nel suo parent
     */
        $scope.setScheduler = function(scheduler){
            $scope.scheduler = scheduler
        }
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
              if(!scheduling.name){ //non è stato definito il nome
                    scheduling.name = 'noname'
                     var myPopup = $ionicPopup.show({
                        template: '<input type="text" ng-model="activeScheduling.name">',
                        title: 'definisci un nome per la programmazione',
                        //subTitle: '',
                        scope: $scope,
                        buttons: [
                          {
                            text: '<b>Save</b>',
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
              }
              if(Scheduling.exists(scheduling.id,$scope.schedulingList))
                 Scheduling.update($scope.schedulingList,scheduling)
              else
                $scope.schedulingList.push(scheduling) // è un nuovo scheduling non presente in lista
              console.log('schedulingList',$scope.schedulingList)
        }
        $scope.newEvent = function(){
           var id = $scope.scheduler.addEventNow();
            console.log('id',id)
        }
        $scope.newScheduling = function() {
            console.log('new scheduling')
        }
            console.log('novità')
        }
     }
])