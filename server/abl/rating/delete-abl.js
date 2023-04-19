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

async function DeleteAbl(req, res) {
    const ajv = new Ajv();
    const valid = ajv.validate(schema, req.body);
    try {
        if (valid) {
            const ratingId = req.body.id;
            await dao.deleteRating(ratingId);
            res.json({});
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
