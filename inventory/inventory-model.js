const db = require('../database/db-config');

function find(){

    return db('inventory');
}


async function addProduct(productData){

    const [id] = await db('products')
                    .insert(productData)

    return findById(id);
}


function findById(id){

    return db('products')
        .where( { id } )
        .first();
}


module.exports = {
    
    find,
    addFarm

}

