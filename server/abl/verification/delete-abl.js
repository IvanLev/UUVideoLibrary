const path = require("path");
const Ajv = require("ajv").default;
const VerificationDao = require("../../dao/verification-dao");
let dao = new VerificationDao(
    path.join(__dirname, "..", "..", "storage", "verification.json")
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
            const videoId = req.body.id;
            await dao.deleteVideo(videoId);
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
