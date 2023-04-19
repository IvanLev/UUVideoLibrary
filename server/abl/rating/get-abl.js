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
    },
    required: ["id"],
};

async function GetAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.id ? req.query : req.body;

        const valid = ajv.validate(schema, body);
        if (valid) {
            const ratingId = body.id;
            const rating = await dao.getRating(ratingId);
            if (!rating) {
                res
                    .status(400)
                    .send({ error: `classroom with id '${ratingId}' doesn't exist` });
            }
            res.json(rating);
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

module.exports = GetAbl;
