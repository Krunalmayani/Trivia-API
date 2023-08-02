var express = require("express");
const app = express()
const multer = require('multer')
const path = require('path')
const cors = require("cors");
const bodyParser = require('body-parser');
const { getAllContest,
    getContestCategory,
    deleteContest,
    deletContestCategory,
    addNewContest,
    updateContest,
    addNewContestCategory,
    updateContestCategory,
} = require("../controller/contestController");
const { body } = require('express-validator');


//use express static folder
app.use(cors());
app.use(express.static("uploads"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, path.join(__dirname, '../uploads/'));

    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});



app.get("/", getAllContest);
app.get("/contest-category", getContestCategory);

app.post("/add-contest", [
    body('content_name', "Fill the Content Name feild").notEmpty(),
    body('start_date', "Fill the Start Date feild").notEmpty(),
    body('total_quiz', "Fill the Total Quiz feild").notEmpty(),
    body('category_type', "Fill the Category Type feild").notEmpty(),
    body('entry_fee', "Fill the Entry Fee feild").notEmpty(),
    body('total_pool_prize', "Fill the Total Pool Prize feild").notEmpty(),
    body('max_spot_entry', "Fill the Max Spot Entry feild").notEmpty(),
    body('win_ratio', "Fill the Win Ratio feild").notEmpty(),
    body('is_active', "Fill the Staus feild").notEmpty(),
], addNewContest)

app.post("/add-contest-category", upload.array('images', 2), addNewContestCategory);

app.put("/update-contest", [
    body('content_name', "Fill the Content Name feild").notEmpty(),
    body('start_date', "Fill the Start Date feild").notEmpty(),
    body('end_date', "Fill the End Date feild").notEmpty(),
    body('total_quiz', "Fill the Total Quiz feild").notEmpty(),
    body('category_type', "Fill the Category Type feild").notEmpty(),
    body('entry_fee', "Fill the Entry Fee feild").notEmpty(),
    body('total_pool_prize', "Fill the Total Pool Prize feild").notEmpty(),
    body('max_spot_entry', "Fill the Max Spot Entry feild").notEmpty(),
    body('win_ratio', "Fill the Win Ratio feild").notEmpty(),
    body('is_active', "Fill the Staus feild").notEmpty(),
], updateContest)

app.put("/update-contest-category", [
    body('category_name', "Fill the Quiz Category Name feild").notEmpty(),
    body('is_active', "Fill the Staus feild").notEmpty(),
], updateContestCategory)

app.delete("/delete-contest/:contest_id", deleteContest);
app.delete("/delete-contest-category/:category_id", deletContestCategory);

module.exports = app;