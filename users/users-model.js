const db = require('../data/db config');

module.exports = {
    add,
    findBy,
    findById
}

async function add(user){
    return db('users')
    .insert(user)
    .then(ids => {
        const id = ids[0]
        return findById(id)
    });
}

function findBy(filter){
    return db("users").where(filter).orderBy("id");
}

function findById(id){
    return db("users").where({ id }).first();
}