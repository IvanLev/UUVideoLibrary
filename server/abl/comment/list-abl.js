const path = require("path");
const CommentDao = require("../../dao/comment-dao");
let dao = new CommentDao(
    path.join(__dirname, "..", "..", "storage", "comments.json")
);

async function ListAbl(req, res) {
    try {
        const { video_id } = req.query;
        if(video_id) {
            const commentList = await dao.listComments(video_id);
            res.json(commentList);
        } else {
            res.status(400).send({
                errorMessage: "invalid request",
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = ListAbl;
