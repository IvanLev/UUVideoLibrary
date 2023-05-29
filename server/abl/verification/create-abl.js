const path = require("path");
const Ajv = require("ajv").default;
const VerificationDao = require("../../dao/verification-dao");
let dao = new VerificationDao(
    path.join(__dirname, "..", "..", "storage", "verification.json")
);

let schema = {
    type: "object",
    properties: {
        creator: { type: "string" },
        name: { type: "string" },
        link: { type: "string" },
        genreId: { type: "string" },
        description: { type: "string" }
    },
    required: ["name", "link", "genreId", "creator"],
};

async function CreateAbl(req, res) {
    try {
        const ajv = new Ajv();
        const valid = ajv.validate(schema, req.body);
        if (valid) {
            let video = req.body;
            video = await dao.createVideo(video);
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
