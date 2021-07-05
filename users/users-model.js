const db = require("../data/dbConfig.js");
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js')



module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find(token) {
    var grab;
    jwt.verify(token, secrets.jwtSecret, (error,decodedToken) => {
            grab = decodedToken;
    })

  return db("users")
  .select("id", "username","department")
  .where("department",grab.department)
  

}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
