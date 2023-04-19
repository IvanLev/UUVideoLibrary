const path = require("path");
const GenreDao = require("../../dao/genre-dao");
let dao = new GenreDao(
    path.join(__dirname, "..", "..", "storage", "genres.json")
);

async function ListAbl(req, res) {
    try {
        const genreList = await dao.listGenres();
        res.json(genreList);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = ListAbl;
