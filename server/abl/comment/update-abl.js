const path = require("path");
const Ajv = require("ajv").default;
const CommentDao = require("../../dao/comment-dao");
let dao = new CommentDao(
    path.join(__dirname, "..", "..", "storage", "comments.json")
);

let schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        author: { type: "string" },
        content: { type: "string" },
        likes: { type: "number" },
        dislikes: { type: "number" },
    },
    required: ["id"],
};

async function UpdateAbl(req, res) {
    try {
        const ajv = new Ajv();
        let comment = req.body;
        const valid = ajv.validate(schema, comment);
        if (valid) {
            comment = await dao.updateComment(comment);
            res.json(comment);
        } else {
            res.status(400).send({
                errorMessage: "validation of comment failed",
                params: comment,
                reason: ajv.errors,
            });
        }
    } catch (e) {
        if (e.message.startsWith("comment with given id")) {
            res.status(400).json({ error: e.message });
        }
        res.status(500).send(e);
    }
}

module.exports = UpdateAbl;
