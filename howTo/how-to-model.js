const db = require('../data/db config');

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove,
}

function find(){
    return db('posts as a')
        .join('users as b', 'a.user_id', '=', 'b.id')
        .select('a.*', 'b.username');
}

function findBy(filter){
    return db('posts as a')
    .join('users as b', 'a.user_id', '=', 'b.id')
    .select('a.*', 'b.username')
    .where(filter)
    .orderBy("id");
}

function findById(id){
    return db('posts as a')
    .join('users as b', 'a.user_id', '=', 'b.id')
    .select('a.*', 'b.username')
    .where({ id }).first();
}

async function add(user){
    return db('posts')
    .insert(user)
    .returning('id')
    .then(ids => {
        const id = ids[0]
        return findById(id)
    });
}

function update(changes, id){
    return db('posts')
    .where({ id })
    .update(changes)
    .then(() => {
        return findById()
    });
}

function remove(id){
    return db('posts').where({ id }).del(); 
}