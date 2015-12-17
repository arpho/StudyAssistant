angular.module('studyAssistant.services')
.service("Recall",[function(){
/*ottiene da firebase i recall relativi ad un task
    @param: ref al progetto su firebase
    @param: taskId
    @paream: function callback funzione che prende come parametro un errorObject
*/
    this.getRecalls = function(ref,taskKey,cback){
        ref.child('recalls').child(taskKey).on("value", cback, cback)
    }
/*
crea,aggiorna i recalls di un task
@param ref al progetto su firebase
@param taskId:: String
@param lista dei recall::[{recall:""}]
@param funzione invocata all'avvenuta sincronizzazione con firebase, alla funzione è passato un oggwetto errorObject in caso di errore, altrimenti null
*/
    this.createUpdate = function(ref,taskKey,recalls,cback){
        ref.child('recalls').child(taskKey).set(recalls,cback)
    }
}])
