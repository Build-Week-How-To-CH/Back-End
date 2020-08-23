const db = require("../data/dbConfig");

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};

function getAll() {
  return db("howtos as h")
    .join("users as u", "u.id", "h.user_id")
    .select(
      "h.id",
      "h.title",
      "u.username as author",
      "h.user_id",
      "h.category",
      "h.content"
    );
}

function getById(id) {
  return db("howtos as h")
    .join("users as u", "u.id", "h.user_id")
    .select(
      "h.id",
      "h.title",
      "u.username as author",
      "h.user_id",
      "h.category",
      "h.content"
    )
    .where({ "h.id": id })
    .first();
}

function add(howto) {
  return db("howtos")
    .insert(howto)
    .returning("id")
    .then(([id]) => {
      return getById(id);
    });
}

function update(id, changes) {
  return db("howtos")
    .where({ id })
    .update(changes)
    .then(() => {
      return getById(id);
    });
}

function remove(id) {
  let removedHowto = null;

  getById(id).then((howto) => {
    removedHowto = howto;
  });

  return db("howtos")
    .where({ id })
    .del()
    .then(() => {
      return removedHowto;
    });
}
