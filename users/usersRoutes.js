const router = require("express").Router();
const Users = require("./usersModel");

router.get("/", (req, res) => {
  Users.getAll()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
