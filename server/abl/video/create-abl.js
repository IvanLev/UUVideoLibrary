const path = require("path");
const Ajv = require("ajv").default;
const VideoDao = require("../../dao/video-dao");
let dao = new VideoDao(
    path.join(__dirname, "..", "..", "storage", "videos.json")
);

let schema = {
    type: "object",
    properties: {
        name: { type: "string" },
        genreId: { type: "string" },
        videoLink: { type: "string" },
        description: { type: "string" },
        preview: { type: "string" },
    },
    required: ["name", "genreId", "videoLink", "description", "preview"],
};

async function CreateAbl(req, res) {
    try {
        const ajv = new Ajv();
        const valid = ajv.validate(schema, req.body);
        if (valid) {
            let video = req.body;
            video = await dao.createVideo(video);
            const video_id = video.id
            res.json(video);
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

module.exports = CreateAbl;
