const path = require("path");
const Ajv = require("ajv").default;
const VideoDao = require("../../dao/video-dao");
let videoDao = new VideoDao(
    path.join(__dirname, "..", "..", "storage", "videos.json")
);
const RatingDao = require("../../dao/rating-dao");
let ratingDao = new RatingDao(
    path.join(__dirname, "..", "..", "storage", "ratings.json")
);
const GenreDao = require("../../dao/genre-dao");
let genreDao = new GenreDao(
    path.join(__dirname, "..", "..", "storage", "genres.json")
);

let schema = {
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"],
};

async function LoadAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.id ? req.query : req.body;

        const valid = ajv.validate(schema, body);
        if (valid) {
            // get video
            const videoId = body.id;
            const video = await videoDao.getVideo(videoId);
            if (!video) {
                res
                    .status(400)
                    .send({ error: `video with id '${videoId}' doesn't exist` });
                return
            }

            // get video ratings
            const ratingList = await ratingDao.listRatings();
            const videoRating = ratingList.find(
                (rating) => rating.videoId === videoId
            );

            // get genres
            const genreList = await genreDao.listGenres();
            const videoGenre = genreList.find(
                (genre) => video.genreId === genre.id
            );

            video.genre = videoGenre.name;

            res.json({ ...video})
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

module.exports = LoadAbl;
