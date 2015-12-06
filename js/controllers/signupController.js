angular.module('studyAssistant.controllers')
.controller('SignupController', [
        '$scope', 'User', '$window', 'Utility','$state'
        ,function ($scope, user, $window, Utilities,$state) {
            $scope.user = {
                email : "",
                password : ""
            };
            $scope.loginData = {}
            $scope.createUser = function () {
                if($scope.loginData.password!= $scope.loginData.repeatedPassword){
                    Utilities.notify('le password sono diverse')
                }
                if (!Utilities.validateEmail($scope.loginData.email)){
                    Utilities.notify('Inserisci una mail valida')
                }
                if ($scope.loginData.password==$scope.loginData.repeatedPassword && Utilities.validateEmail){
                    Utilities.show('registering new user...')
                    var email = this.user.email;

                    var cback = function (error, loggedUser) {
                        if (!error) {
                            Utilities.hide();
                            user.setUid(loggedUser.uid)
                            //$window.location.href = ('#/bucket/list');
                        } else {
                            Utilities.hide();
                            if (error.code == 'INVALID_EMAIL') {
                                Utilities.notify('Invalid Email Address');
                                console.log('Invalid Email Address')
                            } else if (error.code == 'EMAIL_TAKEN') {
                                Utilities.notify('Email Address already taken');
                                console.log('Email Address already taken');
                            } else {
                                Utilities.notify('Oops something went wrong. Please try again later');
                            }
                        }
                    }
                    var password = $scope.loginData.password,
                    email = $scope.loginData.email;
                    user.createUser(email, password, cback);
                }
            }
        }
    ])
