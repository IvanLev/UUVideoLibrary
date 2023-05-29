const path = require("path");
const Ajv = require("ajv").default;
const RatingDao = require("../../dao/rating-dao");
let dao = new RatingDao(
    path.join(__dirname, "..", "..", "storage", "ratings.json")
);

let schema = {
    type: "object",
    properties: {
        video_id: { type: "string" },
    },
    required: ["video_id"],
};

async function CreateAbl(req, res) {
    try {
        const ajv = new Ajv();
        const valid = ajv.validate(schema, req.body);
        if (valid) {
            let rating = req.body;
            rating.likes = 0;
            rating.dislikes = 0;
            rating.rating = 0;
            rating = await dao.createRating(rating);
            res.json(rating);
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
