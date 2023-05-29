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

async function SignupAbl(req, res) {
    try {
        const ajv = new Ajv();
        const valid = ajv.validate(schema, req.body);
        if (valid) {
            const signupData = req.body;
            let user = await dao.getUserBy({ login: signupData.login });

            if(!!user) {
                res.status(400).send({
                  errorMessage: "user already exists",
                  params: req.body,
                  reason: ajv.errors,
                });
            } else {
                user = await dao.createUser(signupData);
                res.json(user);
            }
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

module.exports = SignupAbl;
