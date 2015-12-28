angular.module('studyAssistant.services')
.service("Scheduling",[function(){
/*ottiene da firebase i recall relativi ad un task
    @param: ref al progetto su firebase
    @param: scheduleId
    @paream: function callback funzione che prende come parametro un errorObject
*/
    this.getScheduling = function(ref,scheduleKey,cback){
        ref.child('scheduling').child(scheduleKey).on("value", cback, cback)
    }
/*
crea,aggiorna i recalls di un task
@param ref al progetto su firebase
@param scheduleId:: String
@param lista dei recall::[{recall:""}]
@param funzione invocata all'avvenuta sincronizzazione con firebase, alla funzione è passato un oggwetto errorObject in caso di errore, altrimenti null
*/
    this.Update = function(ref,scheduleKey,scheduling,cback){
        ref.child('scheduling').child(scheduleKey).set(scheduling,cback)
    }
}])
