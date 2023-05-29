const express = require("express");
const router = express.Router();

const SignupAbl = require("../abl/auth/signup-abl");
const SigninAbl = require("../abl/auth/signin-abl");
// const GetAbl = require("../abl/video/get-abl");
// const LoadAbl = require("../abl/video/load-abl");
// const UpdateAbl = require("../abl/video/update-abl");
// const DeleteAbl = require("../abl/video/delete-abl");
// const ListAbl = require("../abl/video/list-abl");

router.post("/signup", async (req, res) => {
    await SignupAbl(req, res);
});

router.post("/signin", async (req, res) => {
    await SigninAbl(req, res);
});

// router.get("/get", async (req, res) => {
//     await GetAbl(req, res);
// });

// router.get("/load", async (req, res) => {
//     await LoadAbl(req, res);
// });

// router.post("/update", async (req, res) => {
//     await UpdateAbl(req, res);
// });

// router.post("/delete", async (req, res) => {
//     await DeleteAbl(req, res);
// });

// router.get("/list", async (req, res) => {
//     await ListAbl(req, res);
// });

module.exports = router;
