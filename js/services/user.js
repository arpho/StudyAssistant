angular.module('studyAssistant.services', [])
.service('User', [ function($scope) {
    var user = {}
    this.setUsername = function(username){
        user.username = username
    }

    this.setEmail = function(email){
        user.email = email
    }

    this.setPassword = function(password){
        user.password = password
    }

    this.setLogged = function(logged){
        user.logged = logged
    }

    this.isLogged = function(){
        return user.logged
    }

    this.getUserName = function(){
        return user.username
    }

    this.getEmail = function(){
        return user.email
    }

    this.getPassword = function(){
        return user.password
    }


}

	])
