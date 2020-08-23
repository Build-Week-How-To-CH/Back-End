const bcrypt = require("bcryptjs");

const rounds = parseInt(process.env.HASH_ROUNDS) || 8;

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "admin", password: bcrypt.hashSync("ThisShouldGetHashed", rounds)},
        {username: "khalil", password: bcrypt.hashSync("ThisShouldGetHashed", rounds)},
      ]);
    });
};
