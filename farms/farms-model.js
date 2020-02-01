const db = require('../database/db-config');

function find(){

    return db('farms');
}

function addFarm(data){

    return db('farms')
    .insert(

        data

    )
}

function findById(id){

    return db('farms')
        .where( { id } )
        .first();
}

function update(changes, id){
    
    return db('farms')
        .where({ id })
        .update( changes )
        

}

function remove(id){

    return db('farms')
        .where( { id } )
        .del()
}

module.exports = {
    
    find,
    addFarm, 
    findById,
    update,
    remove

}

