const path = require("path");
const VerificationDao = require("../../dao/verification-dao");
let dao = new VerificationDao(
    path.join(__dirname, "..", "..", "storage", "verification.json")
);

async function ListAbl(req, res) {
    try {
        const videoList = await dao.listVideos();
        res.json(videoList);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = ListAbl;
