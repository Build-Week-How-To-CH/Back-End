const router = require("express").Router();
const Howtos = require("./howtosModel");
const { validateHowto, validateHowtoId } = require("./howtosMiddleware");

router.get("/", (req, res) => {
  Howtos.getAll()
    .then((howtos) => {
      res.status(200).json({ howtos });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", validateHowtoId, (req, res) => {
  res.status(200).json({ howto: req.howto });
});

router.post("/", validateHowto, (req, res) => {
  const howto = req.body;

  Howtos.add(howto)
    .then((howto) => {
      res.status(201).json({ message: "Howto created successfully", howto });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/:id", validateHowtoId, validateHowto, (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Howtos.update(id, changes)
    .then((howto) => {
      res
        .status(200)
        .json({ message: `Howto with id ${id} successfully updated`, howto });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", validateHowtoId, (req, res) => {
  const id = req.params.id;

  Howtos.remove(id)
    .then((deletedHowto) => {
      res
        .status(200)
        .json({
          message: `Howto with id ${id} deleted successfully`,
          deletedHowto,
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
