const path = require("path");
const RatingDao = require("../../dao/rating-dao");
let dao = new RatingDao(
    path.join(__dirname, "..", "..", "storage", "ratings.json")
);

async function ListAbl(req, res) {
    try {
        const ratingList = await dao.listRatings();
        res.json(ratingList);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = ListAbl;
