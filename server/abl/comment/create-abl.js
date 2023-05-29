const path = require("path");
const Ajv = require("ajv").default;
const CommentDao = require("../../dao/comment-dao");
let dao = new CommentDao(
    path.join(__dirname, "..", "..", "storage", "comments.json")
);

let schema = {
    type: "object",
    properties: {
        video_id: { type: "string" },
        author: { type: "string" },
        content: { type: "string" }
    },
    required: ["video_id", "author", "content"],
};

async function CreateAbl(req, res) {
    try {
        const ajv = new Ajv();
        const valid = ajv.validate(schema, req.body);
        if (valid) {
            let comment = req.body;
            comment = await dao.createComment(comment);
            res.json(comment);
        } else {
            res.status(400).send({
                errorMessage: "validation of comment failed",
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
