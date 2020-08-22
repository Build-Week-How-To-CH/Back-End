exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "user", password: "asd", isAdmin: false },
        { username: "admin", password: "asd", isAdmin: true },
        { username: "christian", password: "asd", isAdmin: true },
      ]);
    });
};
