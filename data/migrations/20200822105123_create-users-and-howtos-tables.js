exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("id");

      tbl.string("username", 155).notNullable().unique().index();
      tbl.string("password", 155).notNullable();
      tbl.boolean("isAdmin").notNullable().defaultTo(false);
    })
    .createTable("howtos", (tbl) => {
      tbl.increments("id");

      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl.string("title", 255).notNullable();
      tbl.string("category", 100).notNullable();
      tbl.string("content", 2000).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("howtos").dropTableIfExists("users");
};
