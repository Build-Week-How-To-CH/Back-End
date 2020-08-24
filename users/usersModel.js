const db = require("../data/dbConfig");

module.exports = {
  getAll,
  getById,
  getBy,
  getUserHowtos,
  add,
  update,
  remove,
};

function getAll() {
  return db("users").orderBy("id");
}

function getById(id) {
  return db("users").where({ id }).first();
}

function getBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function getUserHowtos(id) {
  return db("users as u")
    .join("howtos as h", "u.id", "h.user_id")
    .where({ "h.user_id": id })
    .select(
      "h.title",
      "u.username as author",
      "h.user_id",
      "h.category",
      "h.content"
    )
    .orderBy("id");
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
