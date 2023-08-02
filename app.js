
var express = require("express");
const app = express()
const cors = require("cors");
const bodyParser = require('body-parser');


//use express static folder
app.use(cors());
app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const authRouter = require("./Router/authRouter");
const quizRouter = require("./Router/quizRouter");
const usersRouter = require("./Router/usersRouter")
const contestRouter = require("./Router/contestRouter");
const winningRouter = require("./Router/winningRouter");

app.get("/", function (req, res) {
    res.send("GET route on things !");
});

app.use("/auth", authRouter);
app.use("/user", usersRouter);
app.use("/quiz", quizRouter);
app.use("/contest", contestRouter);
app.use("/contest-winning", winningRouter)


const PORT = 2727;

app.listen(PORT, () => {
    console.log(`server is listening  on ${PORT} \n`);
});