const db = require("../data/dbConfig");

module.exports = {
  getAll,
  getById,
  add,
  // update,
  // remove,
};

function getAll() {
  return db("howtos as h")
    .join("users as u", "u.id", "h.user_id")
    .select(
      "h.id",
      "h.title",
      "u.username as author",
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
