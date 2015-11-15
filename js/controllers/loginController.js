angular.module('studyAssistant.controllers')
.controller('LoginCtrl',function($scope, $timeout, $stateParams, ionicMaterialInk){
    console.log('login')
    $scope.loginData = {}
    $scope.doLogin = function(){
    console.log($scope.loginData)
    if (!$scope.loginData.email || !$scope.password)
        console.log('inserisci password e email')
    }
})