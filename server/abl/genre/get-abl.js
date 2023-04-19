const path = require("path");
const Ajv = require("ajv").default;
const GenreDao = require("../../dao/genre-dao");
let dao = new GenreDao(
    path.join(__dirname, "..", "..", "storage", "genres.json")
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
            const genreId = body.id;
            const genre = await dao.getGenre(genreId);
            if (!genre) {
                res
                    .status(400)
                    .send({ error: `genre with id '${genreId}' doesn't exist` });
            }
            res.json(genre);
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
