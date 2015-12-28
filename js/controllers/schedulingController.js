angular.module('studyAssistant.controllers')
.controller('schedulingController',['$scope','User','$state','Scheduling',function($scope,User,$state,Scheduling){
    console.log("scheduling c'è")
    if(!User.isLogged()){ // utente non loggato
            console.log('utente non loggato')
            $state.go('app.login')
        }
}])