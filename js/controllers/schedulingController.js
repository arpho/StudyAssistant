angular.module('studyAssistant.controllers')
.controller('schedulingController',['$scope','User','$state','Scheduling',function($scope,User,$state,Scheduling){
    console.log("scheduling c'è")

    if(!User.isLogged()){ // utente non loggato
            console.log('utente non loggato')
            $state.go('app.login')
        }
     else{
        $scope.events = [
                { id:1, text:"Task A-12458",
                  start_date: new Date(2015, 11, 30, 9, 0),
                  end_date: new Date(2015, 11, 30, 16, 0) },
                { id:2, text:"Task A-83473",
                  start_date: new Date(2015,11, 28, 9, 0),
                  end_date: new Date(2015, 11, 30, 16, 0) }
              ];
        $scope.newEvent = function(){console.log('new vent',Scheduling.getWeeksFirstDay(),Scheduling.getWeeksFirstDay(true))}
     }
}])