const path = require("path");
const JWT = require("../helper/jwt-token");
const UserDao = require("../dao/user-dao");
let dao = new UserDao(
  path.join(__dirname, "..", "storage", "users.json")
);

async function authMiddleware(req, res, next) {
  try {
    let token = req.headers['authorization'];
    token = token.replace('Bearer ', '');
    const payload = JWT.verify(token);
    const user = await dao.getUserBy({ id: payload.sub });
    req.user = user;
    next();
  } catch(e) {
    res.status(401).send({ errorMessage: "access denied" })
  }
}

module.exports = authMiddleware