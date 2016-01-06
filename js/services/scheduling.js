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

    /* controlla che lo scheduling sia presente nella lista
    @param [scheduling] lista di scheduling
    @param identificativo scheduling
    @return true se nellalista è presente uno scheduling con lo stesso id*/
    this.exists = function(lista,id){
        var out = false
        for (var s in lista)
            if ( lista[s].id ==id)
                out = true // se è presente il valore di out è true
        return out
    }

    /*normalizza una lista di eventi
     trasforma la lista di eventi ritornatada dhxscheduler
     nel formato corretto per esseree salvato su firebase
     @param [events] lista eventi di dhxScheduler
     @return [events] lista di eventi per firebase
     */
     this.normalizeEvents = function(events){
     var out = []
     for (var e in events){
     var event = {}
     event.day = events[e]._sday
     event.start_time_hours = events[e].start_date.getHours()
     event.start_time_minutes = events[e].start_date.getMinutes()
     event.end_time_hours = events[e].end_date.getHours()
     event.end_time_minutes = events[e].end_date.getMinutes()
     event.text = events[e].text
     out.push(event)

     }
     return out
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
