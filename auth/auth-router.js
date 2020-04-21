const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js')
const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
    const creds = req.body;

    function hashPass(creds) {
        var salt = bcrypt.genSaltSync(10);

        var hash = bcrypt.hashSync(creds.password,salt);
    return {
      ...creds,
      password: hash,
    };
  }
    
    //hash the creds.password
    //update the creds to use the hash

  Users.add(hashPass(creds))
    .then(saved => {
        res.status(201).json(saved)
    })
    .catch(err => res.send(err));
});

router.post("/login", (req, res) => {
    let {username,password} = req.body;

  Users.findBy({username})
    .then(([user]) => {
        if(user && bcrypt.compareSync(password,user.password)){
            //produce token
            const token = generateToken(user);
            //send token
            res.status(200).json({message:'Successfully Logged in!', token})
        } else {
            res.status(401).json({message: 'Nah dude lmao'})
        }
        
    })
    .catch(err => res.status(500).json({message: err.message}));
});

function generateToken(user) {

  const payload = {
    userId: user.id,
    username: user.username,
    message: 'Yolo my swaggies'
  }


  const options = {
    expiresIn: "1d",
  }

  return jwt.sign(payload, secrets.jwtSecret, options);



}

module.exports = router;
