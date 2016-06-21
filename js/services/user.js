angular.module('studyAssistant.services', [])
.service('User', [ 'Utility','PouchDbService',function(Utility,PouchDb) {
    var user = {};
    user.logged
    var baseUrl = 'https://studywod.firebaseio.com//'; //TODO da eliminare
    var auth = Utility.getAuth();
    this.setUsername = function(username){
        user.username = username
    }

    function authDataCallback(authData) {
                    if (authData) {
                        auth.child("users").child(authData.uid).once("value", function (utente) { //aggiungo l'utente alla lista di utenti in firebase alprimo login
                        user.logged = true
                        user.uid = authData.uid
                        user.image = authData.password.profileImageURL
                        // configuro l'oggetto user da aggiungere al db di firebase
                            newUser = utente.val() || { // se l'utente è già presente lo riscrivo uguale
                                provider : authData.provider,
                                name : getName(authData)
                            }
                                // save the user's profile into the database so we can list users,
                                // use them in Security and Firebase Rules, and show profiles
                                auth.child("users").child(authData.uid).set(newUser);
                        })

                    } else {
                        console.log("User is logged out"); //TODO popup
                    }
                }


    this.validateUser = function (mail, password, cback) {
                        auth.onAuth(authDataCallback); //invocato al login
                        console.log('validating user')
                        auth.authWithPassword({
                             email : mail,
                             password : password
                        }, cback)
    
                   }
    this.setUid = function(uid){
    user.uid = uid
    }

    this.createUser = function(email,password,cback){
        auth.createUser({'email':email,'password':password},cback)
    }

    this.getUid = function(){
        return user.uid
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
