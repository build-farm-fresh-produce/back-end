
const db = require('../database/db-config');

const bcrypt = require('bcryptjs');


function findBy(filter){

    return db('users')
        .where(filter)
        .select("id", "username", "password");
}


async function addUser(user){

    user.password = await bcrypt.hash(user.password, 2)

    const [id] = await db('users')
                    .insert(user)

    return findById(id);
}

function findById(id){

    return db('users')
        .where( { id } )
        .first( "id", "username");
}

module.exports = {
    
    findBy,
    addUser
    
}

