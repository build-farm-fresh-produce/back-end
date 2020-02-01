
const db = require('../database/db-config');

const bcrypt = require('bcryptjs');


function find(){

    return db('products');
    
}

async function addProduct(productData){

    const { farm_id, quantity_in_stock } = productData
    
    //delete quantity_in_stock from JSON 
    //as to not break productData insert
    delete productData['quantity_in_stock']

    const [id] = await db('products')
                    .insert(productData)

    
    const inventoryData = {
        farm_id: farm_id,
        product_id: id,
        quantity_in_stock:quantity_in_stock
    }
    //Insert Product inventory into inventory table
    const [inventory_id] = await db('inventory')
                            .insert(inventoryData)

    return findById(id);
}


function findById(id){

    return db('products')
        .where( { id } )
        .first();
}


function update(changes, id){
    
    return db('products')
        .where({ id })
        .update( changes )
        

}

function remove(id){

    return db('products')
        .where( { id } )
        .del()
}

module.exports = {
    
    find,
    findById,
    addProduct,
    update,
    remove
    
}

