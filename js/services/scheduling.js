angular.module('studyAssistant.services')
.service("Scheduling",['Utility',function(Utility){
/*ottiene da firebase i recall relativi ad un task
    @param: ref al progetto su firebase
    @param: scheduleId
    @paream: function callback funzione che prende come parametro un errorObject
*/
    this.retrieveScheduling = function(ref,userKey,cback){
        ref.child('scheduling').child(userKey).once("value", cback, cback)
    }
/*
crea,aggiorna gli scheling  di un utente
@param ref al progetto su firebase
@param scheduleId:: String
@param lista dei recall::[{recall:""}]
@param funzione invocata all'avvenuta sincronizzazione con firebase, alla funzione è passato un oggwetto errorObject in caso di errore, altrimenti null
*/
    this.upsert = function(ref,userKey,schedulingList,cback){
        ref.child('scheduling').child(userKey).set(schedulingList,cback)
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

/*formatta la data di un evento in modo che sia visibile nello scheduler
@param Date oggetto data del giorno new Date() primo giorno della settimana corrente
@param int giorno della settimana da 0 a 6
@param int ora
@param int minuti
@return String "16-06-2013 09:00"
*/
var formatDate = function(today,day,hours,minutes){
out = new Date()
out.setDate(today.getDate()+day)
out.setHours(hours)
out.setMinutes(minutes)

return out
}
        /*
        formatta un evento in modo che sia compatibile con dhxscheduler
        @param event così come scaricato da firebase
        @return event formattato per dhxscheduler
        */
        this.formatEvent = function(rawEvent){
            var event = {}
            //per dhxscheduler considera la domenica primo giorno della settimana, quindi sottraggo a day 1
            event.start_date = formatDate(new Date(),rawEvent.day-1,rawEvent.start_time_hours,rawEvent.start_time_minutes)
            event.end_date = formatDate(new Date(),rawEvent.day-1,rawEvent.end_time_hours,rawEvent.end_time_minutes)
            event.text = rawEvent.text
            console.log('evento formattato',event)
        return event
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
     sostituisce lo scheduling nella lista degli scheduling avente lo stesso id
     @param [scheduling] la lista di scheduling
     @param scheduling: scheduling aggiornato
     */
     this.update = function(schedulingList, schedule){
        for (var s in schedulingList){
            if (schedulingList[s].id== schedule.id)
                schedulingList[s] = schedule
        }
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
