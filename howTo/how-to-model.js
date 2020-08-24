const db = require('../data/db config');

module.exports = {
    find,
    // findBy,
    findByUser,
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

//not working yet
// function findBy(filter){
//     return db('posts as a')
//     .join('users as b', 'a.user_id', '=', 'b.id')
//     .select('a.*', 'b.username')
//     .where(filter)
//     .orderBy("id");
// }

function findByUser(userId){
    return db('posts as a')
    .join('users as b', 'a.user_id', '=', 'b.id')
    .select('a.*', 'b.username')
    .where({ 'a.user_id': userId })
    .orderBy("id");
}

function findById(id){
    return db('posts as a')
    .join('users as b', 'a.user_id', '=', 'b.id')
    .select('a.*', 'b.username')
    .where({ 'a.id': id }).first();
}

async function add(post){
    return db('posts')
    .insert(post)
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
        return findById(id)
    });
}

function remove(id){
    return db('posts').where({ id }).del(); 
}