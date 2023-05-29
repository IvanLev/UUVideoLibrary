const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/comment/create-abl");
// const GetAbl = require("../abl/comment/get-abl");
// const LoadAbl = require("../abl/comment/load-abl");
const UpdateAbl = require("../abl/comment/update-abl");
const DeleteAbl = require("../abl/comment/delete-abl");
const ListAbl = require("../abl/comment/list-abl");

router.post("/create", async (req, res) => {
    await CreateAbl(req, res);
});


// router.get("/get", async (req, res) => {
//     await GetAbl(req, res);
// });

router.post("/update", async (req, res) => {
    await UpdateAbl(req, res);
});

router.post("/delete", async (req, res) => {
    await DeleteAbl(req, res);
});

router.get("/list", async (req, res) => {
    await ListAbl(req, res);
});

module.exports = router;
