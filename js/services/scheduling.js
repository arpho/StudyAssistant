angular.module('studyAssistant.services')
.service("Scheduling",[function(){
/*ottiene da firebase i recall relativi ad un task
    @param: ref al progetto su firebase
    @param: scheduleId
    @paream: function callback funzione che prende come parametro un errorObject
*/
    this.getScheduling = function(ref,userKey,cback){
        ref.child('scheduling').child(userKey).on("value", cback, cback)
    }
/*
crea,aggiorna gli scheling  di un utente
@param ref al progetto su firebase
@param scheduleId:: String
@param lista dei recall::[{recall:""}]
@param funzione invocata all'avvenuta sincronizzazione con firebase, alla funzione è passato un oggwetto errorObject in caso di errore, altrimenti null
*/
    this.Upsert = function(ref,userKey,scheduling,cback){
        ref.child('scheduling').child(userKey).set(scheduling,cback)
    }
    /*
    @param sundayIsFirst  boolean se false il primo giorno della settimana è lunedì altrimenti domenica
    @return int primo giorno della settimana corrente
    */
    this.getWeeksFirstDay = function(sundayFirst){
    var curr = new Date()
    if (!sundayFirst) firstDay = 1 // lunedì
    else  firstDay = 0 // domenica
    return curr.getDate() - curr.getDay() + firstDay
    }
}])
