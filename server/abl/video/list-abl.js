const path = require("path");
const VideoDao = require("../../dao/video-dao");
let dao = new VideoDao(
    path.join(__dirname, "..", "..", "storage", "videos.json")
);

async function ListAbl(req, res) {
    try {
        const videoList = await dao.listVideos();
        res.json(videoList);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = ListAbl;
