var express = require('express')
const cors = require('cors');
var multer = require('multer');
var router = express.Router();
const bodyParser = require('body-parser');
const { body } = require('express-validator');
const { signIn, getAllUsers } = require('../controller/authController');

var forms = multer();

router.use(cors());

// Configuring body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(forms.array());

router.post('/signin', [
    body('user_name', "Invalid user name").trim(),
    body('email', "Invalid email address").escape().trim().isEmail(),
    body('password', "The Password must be of minimum 6 characters length").notEmpty().trim().isLength({ min: 6 }),
], signIn);

router.get('/Hello', function (req, res) {
    res.send("Hello world!");
});


module.exports = router;