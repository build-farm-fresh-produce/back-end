
const db = require('../database/db-config');

const bcrypt = require('bcryptjs');


function find(){

    return db('products');
    
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
    findById,
    addProduct
    
}

