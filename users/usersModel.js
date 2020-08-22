const db = require("../data/dbConfig");

module.exports = {
  getAll,
  getById,
  getBy,
  add,
  update,
  remove,
};

function getAll() {
  return db("users");
}

function getById(id) {
  return db("users").where({ id }).first();
}

function getBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function add(user) {
  return db("users")
    .insert(user)
    .returning("id")
    .then(([id]) => {
      return getById(id);
    });
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(() => {
      return getById(id);
    });
}

function remove(id) {
  let removedUser = null;

  getById(id).then((user) => {
    removedUser = user;
  });

  return db("users")
    .where({ id })
    .del()
    .then(() => {
      return removedUser;
    });
}
