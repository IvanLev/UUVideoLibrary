const path = require("path");
const Ajv = require("ajv").default;
const UserDao = require("../../dao/user-dao");
const { use } = require("../../controller/verification-controller");
let dao = new UserDao(
    path.join(__dirname, "..", "..", "storage", "users.json")
);

let schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        login: { type: "string" },
        password: { type: "string" },
        imgPath: { type: "string" },
        comments: { 
            type: "object",
            properties: {
                likes: { type: "array" },
                dislikes: { type: "array" },
            }  
        },
        films: { 
            type: "object",
            properties: {
                likes: { type: "array" },
                dislikes: { type: "array" },
            }  
        }

    },
    required: ["id"],
};

async function UpdateAbl(req, res) {
    try {
        const ajv = new Ajv();
        let user = {...req.body, id: req.user.id };
        if(req?.file?.filename) {
            user.imgPath = req.file.filename;
        }
        const valid = ajv.validate(schema, user);
        if (valid) {
            user = await dao.updateUser(user);
            const { firstName, lastName, role, token, comments, films, imgPath, id } = user;
            res.status(200).send({ firstName, lastName, role, token, comments, films, imgPath, id });
        } else {
            res.status(400).send({
                errorMessage: "incorect data for update",
                params: user,
                reason: ajv.errors,
            });
        }
    } catch (e) {
        if (e.message.startsWith("user with given id")) {
            console.log(e.message);
            res.status(400).json({ error: e.message });
        }
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = UpdateAbl;
