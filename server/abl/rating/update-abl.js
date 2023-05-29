const path = require("path");
const Ajv = require("ajv").default;
const RatingDao = require("../../dao/rating-dao");
let dao = new RatingDao(
    path.join(__dirname, "..", "..", "storage", "ratings.json")
);

let schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        rating: { type: "number" },
        likes: { type: "number" },
        dislikes: { type: "number" }
    },
    required: ["id"],
};

async function UpdateAbl(req, res) {
    try {
        const ajv = new Ajv();
        let rating = req.body;
        const valid = ajv.validate(schema, rating);
        if (valid) {
            rating = await dao.updateRating(rating);
            res.json(rating);
        } else {
            res.status(400).send({
                errorMessage: "validation of input failed",
                params: rating,
                reason: ajv.errors,
            });
        }
    } catch (e) {
        if (e.message.startsWith("rating with given id")) {
            res.status(400).json({ error: e.message });
        }
        res.status(500).send(e);
    }
}

module.exports = UpdateAbl;
