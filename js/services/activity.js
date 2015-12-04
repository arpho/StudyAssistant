angular.module('studyAssistant.services')
.service('Activity', [ 'User','$ionicModal',function(User,$ionicModal) {

  var rawTasks = {} // conterrà l'oggetto val dei dati ottenuti da firebase
  this.setRawTasks = function(tasks){
    rawTasks = tasks
  }



			/*
			ritorna l'intervallo di tempo dopo il quale l'attività sarà rischedulata
			@param int numero di ripetizioni eseguite
			@return int intervallo in giorni
			 */
			this.getDays = function (rep) {
				intervals = {}
				intervals[0] = 1
					intervals[1] = 3
					intervals[2] = 7
					intervals[3] = 14
					intervals[4] = 30
					out = intervals[rep] || 30 // dopo la 5° ripetizione l'intervallo  è sempre 30 giorni
					return out
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

 this.deleteTask = function(ref,key){
    ref.child("tasks").child(User.getUid()).child(key).set(null)
 }


 this.updateTask = function(ref,task){
    var key = task.key
    //rimuovo il campo key
    delete task.key
    ref.child('tasks').child(User.getUid()).child(key).set(task)
    console.log('task updated')
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
