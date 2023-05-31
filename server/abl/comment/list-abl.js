const path = require("path");
const Ajv = require("ajv").default;
const CommentDao = require("../../dao/comment-dao");
let dao = new CommentDao(
    path.join(__dirname, "..", "..", "storage", "comments.json")
);

let schema = {
    properties: {
        video_id: { type: 'string' },
    },
    required: ["video_id"],
};

async function ListAbl(req, res) {
    try {
        const ajv = new Ajv();
        const valid = ajv.validate(schema, req.query);
        if (valid) {
            const {video_id} = req.query;
            if (video_id) {
                const commentList = await dao.listComments(video_id);
                res.json(commentList);
            } else {
                res.status(400).send({
                    errorMessage: "invalid request",
                });
            }
        } else {
            res.status(400).send({
                errorMessage: "validation of input failed",
                params: req.query,
                reason: ajv.errors,
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = ListAbl;
