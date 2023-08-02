var express = require('express')
const cors = require('cors');
var multer = require('multer');
var router = express.Router();
const bodyParser = require('body-parser');
const { body } = require('express-validator');
const { getAllQuiz, getQuizCategory, addNewQuiz, addNewQuizCategory, updateQuizCategory, updateQuiz, deleteQuizCategory, deleteQuiz } = require('../controller/quizController');

var forms = multer();

router.use(cors());

// Configuring body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(forms.array());

router.get("/", getAllQuiz);
router.get("/quiz-category", getQuizCategory);

router.post("/add-quiz-category", [
    body('category_name', "Fill the Quiz Category Name feild").notEmpty(),
    body('is_active', "Fill the Staus feild").notEmpty(),
], addNewQuizCategory);

router.put("/update-quiz-category", [
    body('category_name', "Fill the Quiz Category Name feild").notEmpty(),
    body('is_active', "Fill the Staus feild").notEmpty(),
], updateQuizCategory);

router.delete("/delete-quiz/:quiz_id", deleteQuiz);

router.delete("/delete-quiz-category/:quiz_category_id", deleteQuizCategory);

router.post("/add-quiz", [
    body('question', "Fill the Question feild").notEmpty(),
    body('option_1', "Fill the Option 1 feild").notEmpty(),
    body('option_2', "Fill the Option 2 feild").notEmpty(),
    body('option_3', "Fill the Option 3 feild").notEmpty(),
    body('option_4', "Fill the Option 4 feild").notEmpty(),
    body('correct_answer', "Fill the Correct Answer feild").notEmpty(),
    body('quiz_category', "Fill the Quiz Category feild").notEmpty(),
    body('difficulty', "Fill the Difficulty feild").notEmpty(),
    body('is_active', "Fill the Staus feild").notEmpty(),
], addNewQuiz)

router.put("/update-quiz", [
    body('question', "Fill the Question feild").notEmpty(),
    body('option_1', "Fill the Option 1 feild").notEmpty(),
    body('option_2', "Fill the Option 2 feild").notEmpty(),
    body('option_3', "Fill the Option 3 feild").notEmpty(),
    body('option_4', "Fill the Option 4 feild").notEmpty(),
    body('correct_answer', "Fill the Correct Answer feild").notEmpty(),
    body('quiz_category', "Fill the Quiz Category feild").notEmpty(),
    body('difficulty', "Fill the Difficulty feild").notEmpty(),
    body('is_active', "Fill the Staus feild").notEmpty(),
], updateQuiz)


module.exports = router;