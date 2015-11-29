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

 this.createTask = function (ref,task, cback) {
     				ref.child("tasks").child(User.getUid()).push(task, cback);
     			}
/*
ritorna i   task contenuti in rawTasks, normalizzati secondo la funzione passata come parametro
@param funzione normalizzatrice:: {}-> custom object
@return custom object
*/
 this.getTasks = function(normalizer){
     return normalizer(rawTasks)
     }
 }
])
