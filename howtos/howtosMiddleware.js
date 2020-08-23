const Howtos = require("./howtosModel");
const Users = require("../users/usersModel");

module.exports = {
  validateHowtoId,
  validateHowto,
};

function validateHowtoId(req, res, next) {
  const id = req.params.id;

  Howtos.getById(id)
    .then((howto) => {
      if (howto) {
        req.howto = howto;
        next();
      } else {
        res.status(404).json({ error: `Howto with id ${id} does not exist` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

function validateHowto(req, res, next) {
  const { user_id, title, category, content } = req.body;

  if (!user_id || !title || !category || !content) {
    res.status(400).json({
      error:
        "Please provide all required fields: user_id, title, category, content",
    });
  } else {
    Users.getById(user_id)
      .then((user) => {
        if (user) {
          next();
        } else {
          res
            .status(404)
            .json({
              error: `User with id ${user_id} does not exist. Please provide a valid user id to post howto`,
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
}
