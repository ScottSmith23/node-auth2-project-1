const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  Users.find(req.headers.authorization)
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(403).json({ error: "User must be logged in to do that." }));
});


module.exports = router;
