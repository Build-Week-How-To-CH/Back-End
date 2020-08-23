
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {title: 'How to make a database', contents: 'Step 1: Choose a database. Step 2: Go to youtube. step 3: Watch a video to figure out how to make a database.', user_id: '1'},
        {title: 'How to get rich quick', contents: 'Step 1: Buy a farm. Step 2: Buy magic beans. step 3: wait for a bean stalk to grow. step 4: steal a goose that lays golden eggs. step 5: profit', user_id: '2'},
      ]);
    });
};
