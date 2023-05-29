const path = require("path");
const Ajv = require("ajv").default;
const UserDao = require("../../dao/user-dao");
let dao = new UserDao(
    path.join(__dirname, "..", "..", "storage", "users.json")
);

let schema = {
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"],
};

async function GetAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.id ? req.query : req.body;

        const valid = ajv.validate(schema, body);
        if (valid) {
            const userId = body.id;
            const user = await dao.getUser(userId);
            if (!user) {
                res
                    .status(400)
                    .send({ error: `user with id '${userId}' doesn't exist` });
            }
            res.json(user);
        } else {
            res.status(400).send({
                errorMessage: "validation of input failed",
                params: body,
                reason: ajv.errors,
            });
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = GetAbl;
