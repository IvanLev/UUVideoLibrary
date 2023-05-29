const path = require("path");
const Ajv = require("ajv").default;
const UserDao = require("../../dao/user-dao");
const JWT = require("../../helper/jwt-token");
let dao = new UserDao(
    path.join(__dirname, "..", "..", "storage", "users.json")
);

let schema = {
    type: "object",
    properties: {
        login: { type: "string" },
        password: { type: "string" }
    },
    required: ["login", "password"],
};

async function SigninAbl(req, res) {
    try {
        const ajv = new Ajv();
        const valid = ajv.validate(schema, req.body);
        if (valid) {
            let signinData = req.body;
            let user = await dao.getUserBy({ login: signinData.login });
            const password = user?.password || '';
            const match = signinData.password === password

            if(user && match) {
                const newToken = JWT.create({ sub: user.id });
                user.token = newToken;
                await dao.updateUser(user);
                const { firstName, lastName, role, token, comments, films, id, imgPath } = user;
                res.status(200).send({ firstName, lastName, role, token, comments, films, id, imgPath });
            } else {
                res.status(403).send({
                    errorMessage: "incorect login or password",
                    reason: ajv.errors,
                });
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

module.exports = SigninAbl;
