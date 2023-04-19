const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/genre/create-abl");
const GetAbl = require("../abl/genre/get-abl");
const UpdateAbl = require("../abl/genre/update-abl");
const DeleteAbl = require("../abl/genre/delete-abl");
const ListAbl = require("../abl/genre/list-abl");

router.post("/create", async (req, res) => {
    await CreateAbl(req, res);
});

router.get("/get", async (req, res) => {
    console.info("Genre get");
    await GetAbl(req, res);
});

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
