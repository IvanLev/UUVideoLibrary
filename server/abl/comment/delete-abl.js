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
    },
    required: ["video_id"],
};

async function DeleteAbl(req, res) {
    const ajv = new Ajv();
    const valid = ajv.validate(schema, req.body);
    try {
        if (valid) {
            const videoId = req.body.video_id;
            await dao.deleteComment(videoId);
            res.json({ video_id: videoId });
        } else {
            res.status(400).send({
                errorMessage: "validation of input failed",
                params: req.body,
                reason: ajv.errors,
            });
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = DeleteAbl;
