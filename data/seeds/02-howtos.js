exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("howtos")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("howtos").insert([
        {
          user_id: 3,
          title: "How to Win a Game of Chess",
          category: "games",
          content:
            "Step 1: Tell your opponent that you are a grand master in order to psych them out. Step 2: If your opponent calls your bluff, try your best to win. Step 3: If you start getting close to losing, flip the board and say that you're late for a chess meeting. Step 4: Checkmate.",
        },
        {
          user_id: 3,
          title: "How to Start a New Life",
          category: "travel",
          content:
            "Step 1: Destroy your passport. Step 2: Steal someone else's passport and paste your own photo on theirs with an Elmers glue stick. Step 3: Fly to Argentina and start your new life as a wheat farmer.",
        },
        {
          user_id: 3,
          title: "How to Make a Sandwich",
          category: "food",
          content:
            "Step 1: Get 2 slices of bread. Step 2: spead peanutbutter on one slice, jelly on the other. Step 3: Combine and Enjoy!",
        },
        {
          user_id: 3,
          title: "How to Change a Tire",
          category: "automotive",
          content:
            "Step 1: Place jack under vehicle and jack up until the desired tire to change is off the ground. Step 2: Remove the lug nuts from the tire. Step 3: Remove old tire and replce it with the new one. Step 4: Tighten the lug nuts. Step 5: Lower the vehicle and you are good to go!",
        },
        {
          user_id: 3,
          title: "How to Start a Fire",
          category: "outdoor",
          content:
            "Step 1: Pile up your wood in fireplace Step 2: add lighter fluid Step 3: light a match and throw it in the lighter fluid and enjoy!",
        },
      ]);
    });
};
