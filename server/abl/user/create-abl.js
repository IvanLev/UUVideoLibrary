const path = require("path");
const Ajv = require("ajv").default;
const UserDao = require("../../dao/user-dao");
let dao = new UserDao(
    path.join(__dirname, "..", "..", "storage", "users.json")
);

let schema = {
    type: "object",
    properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        login: { type: "string" },
        password: { type: "string" }
    },
    required: ["firstName", "lastName", "login", "password"],
};

async function CreateAbl(req, res) {
    try {
        const ajv = new Ajv();
        const valid = ajv.validate(schema, req.body);
        if (valid && !userIsExist) {
            let user = req.body;
            const userIsExist = await dao.checkIsUserExist(user.login);

            if(userIsExist) {
                res.status(400).send({
                  errorMessage: "user already exists",
                  params: req.body,
                  reason: ajv.errors,
                });
            }
            user = await dao.createUser(user);
            res.json(user);
        } else {
            res.status(400).send({
                errorMessage: "validation of input failed",
                params: req.body,
                reason: ajv.errors,
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = CreateAbl;
