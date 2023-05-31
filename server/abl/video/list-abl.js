const path = require("path");
const Ajv = require("ajv").default;
const VideoDao = require("../../dao/video-dao");
let dao = new VideoDao(
    path.join(__dirname, "..", "..", "storage", "videos.json")
);

let schema = {
    properties: {
        genre: { type: 'string' },
        search: { type: 'string' },
        count: { type: 'string' }
    },
};

async function ListAbl(req, res) {
    try {
        const ajv = new Ajv();
        const valid = ajv.validate(schema, req.query);
        if (valid) {
            let {genre, search, count} = req.query;
            genre = genre || "";
            search = search || "";
            const videoList = await dao.filterVideos(genre, search, count);
            res.json(videoList);
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
