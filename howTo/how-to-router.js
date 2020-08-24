const router = require('express').Router();
const HowTo = require('../howTo/how-to-model');

router.get("/", (req, res) => {
    HowTo.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get how to posts" });
        });
})

router.get("/user/:id", (req, res) => {
    const userId = req.params.id;

    HowTo.findByUser(userId)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get how to posts" });
        });
})

router.get("/:id", (req, res) => {
    const id = req.params.id;

    HowTo.findById(id)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get how to posts" });
        });
})

router.post("/", (req, res) => {
    const body = req.body;

    HowTo.add(body)
        .then(posts => {
            res.status(201).json({ posts });
        })
        .catch(err =>{
            res.status(500).json({ message: "Failed to create a new how to posts" });
        });
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    HowTo.findById(id)
        .then(post => {
            if(post){
                HowTo.update(changes, id)
                    .then(updatedPost => {
                        res.status(200).json(updatedPost)
                    })
                    .catch(err => {
                        res.status(500).json({ message: err });
                    });
            }else {
                res.status(404).json({ message: 'Could not find how to post with given id' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update how to post' });
        });
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    HowTo.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end()
      } else {
        res.status(404).json({ message: 'Could not find how to post with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete how to post' });
    });
  });

module.exports = router;