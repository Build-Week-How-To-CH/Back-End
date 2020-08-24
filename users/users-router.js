const router = require('express').Router();
const Users = require('../users/users-model');

router.get("/", (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get users" });
        });
})

router.get("/:id", (req, res) => {
    const id = req.params.id;

    Users.findById(id)
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get users" });
        });
})

module.exports = router;