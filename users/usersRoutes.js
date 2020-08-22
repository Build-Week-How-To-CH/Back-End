const router = require("express").Router();
const Users = require("./usersModel");
const bcrypt = require("bcryptjs");
const { validateUser, validateUserId } = require("./usersMiddleware");

// basic CRUD

router.get("/", (req, res) => {
  Users.getAll()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.post("/", validateUser, (req, res) => {
  const { username, password, isAdmin } = req.body;

  Users.getBy({ username })
    .then(([user]) => {
      if (user) {
        res.status(409).json({ error: "Username is already taken" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });

  const rounds = parseInt(process.env.HASH_ROUNDS) || 8;
  const hash = bcrypt.hashSync(password, rounds);

  Users.add({ username, password: hash, isAdmin })
    .then((user) => {
      res.status(201).json({ message: "User created successfully", user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Users.update(id, changes)
    .then((user) => {
      res
        .status(200)
        .json({ message: `User with id ${id} updated successfully`, user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then((deletedUser) => {
      res.status(200).json({
        message: `User with id ${id} successfully deleted`,
        deletedUser,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
