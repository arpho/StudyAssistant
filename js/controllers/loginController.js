angular.module('studyAssistant.controllers')
.controller('LoginCtrl',['$scope','User','Utility','Activity','$state',function($scope,User,Utilities,Activity,$state, $timeout, $stateParams, ionicMaterialInk){
    $scope.loginData.rememberCredentials = (Utilities.getLocalValue('rememberCredentials',false)=='true')
    $scope.loginData.email = Utilities.getLocalValue('email')
    $scope.loginData.password = Utilities.getLocalValue('password')
    if (!$scope.loginData.rememberCredentials)
    $scope.loginData = {} //l'utente non vuole che vengano ricordate le credenziali, ma se precedentemente le ricordava,queste potrebbero essere presenti sul sistema
    $scope.doLogin = function(){
    if (!$scope.loginData.email || !$scope.loginData.password)
        Utilities.notify('inserisci password e email')
    else {
           //console.log($scope.loginData)
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
            $state.go('app.activity')
            //carico i tasks da firebase
            // ottengo il riferimento a firebase
            var ref = Utilities.getAuth()
            // creo la funzione di callback per i tasks
            var taskCback = function(data){
                Activity.setRawTasks(data.val())
                console.log('ricevuti i tasks',data.val())



            }


           }
           }
        User.validateUser($scope.loginData.email,$scope.loginData.password,loginCback)
    }
    }
}])