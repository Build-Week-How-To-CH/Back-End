const bcrypt = require("bcryptjs");

const rounds = parseInt(process.env.HASH_ROUNDS) || 8;

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "user",
          password: bcrypt.hashSync("password", rounds),
          isAdmin: false,
        },
        {
          username: "admin",
          password: bcrypt.hashSync("password", rounds),
          isAdmin: true,
        },
        {
          username: "christian",
          password: bcrypt.hashSync("password", rounds),
          isAdmin: true,
        },
      ]);
    });
};
