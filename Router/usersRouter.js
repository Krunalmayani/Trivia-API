var express = require('express')
const cors = require('cors');
var multer = require('multer');
var router = express.Router();
const bodyParser = require('body-parser');
const { body } = require('express-validator');
const { getAllUsers } = require('../controller/usersController');

var forms = multer();

router.use(cors());

// Configuring body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(forms.array());


router.get('/Hello', function (req, res) {
    res.send("Hello world!");
});
router.get('/all-users', getAllUsers);

module.exports = router;