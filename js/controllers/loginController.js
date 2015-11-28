angular.module('studyAssistant.controllers')
.controller('LoginCtrl',['$scope','User','Utility','Activity',function($scope,User,Utilities,Activity, $timeout, $stateParams, ionicMaterialInk){
    $scope.loginData.rememberCredentials = (Utilities.getLocalValue('rememberCredentials',false)=='true')
    $scope.loginData.email = Utilities.getLocalValue('email')
    $scope.loginData.password = Utilities.getLocalValue('password')
    if (!$scope.loginData.rememberCredentials)
    $scope.loginData = {} //l'utente non vuole che vengano ricordate le credenziali, ma se precedentemente le ricordava,queste potrebbero essere presenti sul sistema
    $scope.doLogin = function(){
    if (!$scope.loginData.email || !$scope.loginData.password)
        console.log('inserisci password e email')
    else {
           console.log($scope.loginData)
           var loginCback = function(){
           if (User.isLogged()) {
                // memorizzo le credenziali di accesso
            if ($scope.loginData.rememberCredentials){
                Utilities.setLocalValue('rememberCredentials',true)
                Utilities.setLocalValue('email',$scope.loginData.email)
                Utilities.setLocalValue('password',$scope.loginData.password)
            }
            else
            Utilities.setLocalValue('rememberCredentials',false)
            //carico i tasks da firebase
            // ottengo il riferimento a firebase
            var ref = Utilities.getActivitiesRef()
            // creo la funzione di callback per i tasks
            var taskCback = function(data){
                Activity.setRawTasks(data.val())
                console.log('ricevuti i tasks')
            }
            //recupero i tasks da firebase
            Activity.retrieveTasks(ref,taskCback)

           }
           }
        User.validateUser($scope.loginData.email,$scope.loginData.password,loginCback)
    }
    }
}])