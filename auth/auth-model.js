
const db = require('../database/db-config');

const bcrypt = require('bcryptjs');


function findBy(filter){

    return db('users')
        .where(filter)
        .select("id", "username", "password", "is_farmer");
}


async function addUser(user){

    user.password = await bcrypt.hash(user.password, 2)

    const [id] = await db('users')
                    .insert(user, 'id')

    return findById(id);
}

function findById(id){

    return db('users')
        .where( { id } )
        .first( "id", "username");
}

function truncate(table){

    return db(table).truncate();
}

module.exports = {
    
    findBy,
    addUser,
    truncate
    
}

