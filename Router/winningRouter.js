var express = require('express')
const cors = require('cors');
var multer = require('multer');
var router = express.Router();
const bodyParser = require('body-parser');
const { editContestWinningList, addContestWinningList, getContestWinningList } = require('../controller/winningController');

var forms = multer();

router.use(cors());

// Configuring body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(forms.array());



router.post('/add', addContestWinningList)
router.put('/:contest_id', editContestWinningList)

router.get('/:contest_id', getContestWinningList);


module.exports = router;