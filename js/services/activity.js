angular.module('studyAssistant.services')
.service('Activity', [ 'User',function(User) {

  var rawTasks = {} // conterrà l'oggetto val dei dati ottenuti da firebase
  this.setRawTasks = function(tasks){
    rawTasks = tasks
  }
  
 /*
 recupera i tasks da firebase
 @parameter oggetto di reference per firebase ottenuto da utility
 @parameter funzione di callback
 return null
 */
 this.retrieveTasks = function(ref,cback){
                        ref.child('tasks').child(User.getUid()).orderByChild('lastTime').on("value", cback, function (errorObject) {
                            console.log("The read failed: " + errorObject.code);
                        })
    
    
 }

 this.getTasks = function(){
     var tasks = []
     for (var key in rawTasks){ // per comodità aggiungo a tutti i task il campo key
        var val = rawTasks[key]
        val.key = key
        tasks.push(val)
     }
     return tasks
 }
}])
