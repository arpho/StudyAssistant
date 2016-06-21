angular.module('studyAssistant.services')
.service('PouchDbService',function(){
    var remoteCouch = false,
    dbsCache= {}; // cache dei db creati dall'applicazione
    /*
    @param: string dbName
    @return: ritorna un database con nome dbName, se già creato in precedenza ritorna lo stesso oggetto, altrimenti ne
     crea uno nuovo 
    @version: 0.9.1
    @author: Giuseppe D'Amico
    @return:{Db: db,'nuovo':boolean} nuovo è true se appena creato, false se recuperato dalla cache
    */
    this.getDb = function(db_name){
        var db, nuovo = false;
        if(dbsCache[db_name]) {
             db = dbsCache[db_name]
        }
        else{
            db = new PouchDB('db_name');
            nuovo = true;
        }
        return {'Db':db,'nuovo':nuovo}
    }
    /*
    questa funzione inserisce un item in un db
    @param PouchDb: il database su cui scrivere
    @param {}: item da inserire nel db,
    @note: un item sprovvisto di  un campo _id, viene considerato nuovo inserimento e ne viene cerato uno univoco
    @param Result:function( result):  funzione che gestisce la risposta
    @param Err: function(err): funzione che gestisce la failure

    */
    this.put = function(db,item,Result,Err){
    item._id = item._id||new Date().toISOString();
    //db.put(item).then(Result(result)).catch(Err(err));
    // se modifico un documento devo  passare _rev per evitare conflitti
    db.get(item._id).then(function(doc){
        Item = item;
        Item._rev = doc._rev;
    return db.put(Item).then(Result(result)).catch(Err(err))
    })

    }
})