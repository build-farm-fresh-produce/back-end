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

module.exports = {
    
    find,
    addFarm

}

