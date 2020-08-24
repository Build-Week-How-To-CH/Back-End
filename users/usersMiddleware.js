const Users = require("./usersModel");

module.exports = {
  validateUserId,
  validateUser,
};

function validateUserId(req, res, next) {
  const id = req.params.id;

  Users.getById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ error: `User with id ${id} does not exist` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

function validateUser(req, res, next) {
  const { username, password, isAdmin } = req.body;

  if (!username || !password || isAdmin === null || isAdmin === undefined) {
    res
      .status(400)
      .json({ error: "Please provide required username, password, isAdmin" });
  } else {
    next();
  }
}
