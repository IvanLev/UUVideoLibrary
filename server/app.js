const express = require('express')
const cors = require('cors');

const videoRouter = require("./controller/video-controller");
const genreRouter = require("./controller/genre-controller");
const ratingRouter = require("./controller/rating-controller");
const authRouter = require("./controller/auth-controller");
const commentRouter = require("./controller/comment-controller");
const userRouter = require("./controller/user-controller");
const verificationRouter = require("./controller/verification-controller");

const app = express()
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
    res.send('UUVideoLibrary backend server running!');
});

app.use("/video", videoRouter);
app.use("/genre", genreRouter);
app.use("/rating", ratingRouter);
app.use("/auth", authRouter);
app.use("/comment", commentRouter);
app.use("/user", userRouter);
app.use("/verification", verificationRouter);

app.use('/images', express.static('storage/images'));

app.get("/*", (req, res) => {
    res.send("Unknown path!");
});

//setting the port on which the HTTP server should run
app.listen(port, () => {
    console.log(`UUVideoLibrary server listening at http://localhost:${port}`);
});