const db = require('../data/db config');

module.exports = {
    add,
    find,
    findBy,
    findById
}

async function add(user){
    return db('users')
    .insert(user)
    .returning("id")
    .then(ids => {
        const id = ids[0]
        return findById(id)
    });
}

function find(){
    return db('users').orderBy("id")
}

function findBy(filter){
    return db("users").where(filter).orderBy("id");
}

function findById(id){
    return db("users").where({ id }).first();
}