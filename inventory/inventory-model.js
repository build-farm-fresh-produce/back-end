const db = require('../database/db-config');


function find(){

    return db('inventory');
}


async function addProduct(inventoryData){

    const [id] = await db('inventory')
                    .insert(inventoryData, 'id')

    return findById(id);
}


function findById(id){

    return db('inventory')
        .where( { id } )
        .first();
}


function update(changes, id){
    
    return db('inventory')
        .where({ id })
        .update( changes )
        

}


function remove(id){

    return db('inventory')
        .where( { id } )
        .del()
}

module.exports = {
    
    find,
    addProduct,
    findById,
    update,
    remove

}

