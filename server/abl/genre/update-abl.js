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
        name: { type: "string" },
    },
    required: ["id"],
};

async function UpdateAbl(req, res) {
    try {
        const ajv = new Ajv();
        let genre = req.body;
        const valid = ajv.validate(schema, genre);
        if (valid) {
            genre = await dao.updateGenre(genre);
            res.json(genre);
        } else {
            res.status(400).send({
                errorMessage: "validation of input failed",
                params: genre,
                reason: ajv.errors,
            });
        }
    } catch (e) {
        if (e.message.startsWith("genre with given id")) {
            res.status(400).json({ error: e.message });
        }
        res.status(500).send(e);
    }
}

module.exports = UpdateAbl;
