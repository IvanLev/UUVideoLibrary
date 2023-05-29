const express = require("express");
const router = express.Router();


const GetAbl = require("../abl/user/get-abl");
const UpdateAbl = require("../abl/user/update-abl");
const authMiddleware = require("../middlewares/auth-middleware");
const multerMiddleware = require("../middlewares/multer-middleware");

router.get("/get", async (req, res) => {
    await GetAbl(req, res);
});

router.post("/test", multerMiddleware, (req, res) => {
    console.log(req.file);
    res.json(req.file);
})

router.post("/update", authMiddleware, multerMiddleware, async (req, res) => {
    await UpdateAbl(req, res);
});


module.exports = router;
