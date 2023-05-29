const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/verification/create-abl");
const GetAbl = require("../abl/verification/get-abl");
// const LoadAbl = require("../abl/video/load-abl");
// const UpdateAbl = require("../abl/video/update-abl");
const DeleteAbl = require("../abl/verification/delete-abl");
const ListAbl = require("../abl/verification/list-abl");

router.post("/create", async (req, res) => {
    await CreateAbl(req, res);
});

router.get("/get", async (req, res) => {
    await GetAbl(req, res);
});


router.post("/delete", async (req, res) => {
    await DeleteAbl(req, res);
});

router.get("/list", async (req, res) => {
    await ListAbl(req, res);
});

module.exports = router;
