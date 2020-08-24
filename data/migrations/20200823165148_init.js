
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('id');
            tbl.string('username', 128).unique().notNullable();
            tbl.string('password', 128).notNullable();
        })
        .createTable('posts', tbl => {
            tbl.increments('id');
            tbl.string('title', 128).notNullable();
            tbl.text('contents', 128).notNullable();
            tbl.integer('user_id', 128)
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete("RESTRICT");
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("posts")
        .dropTableIfExists("users")
};
