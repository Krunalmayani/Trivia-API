const { validationResult } = require("express-validator");
const connection = require("../db").promise();

exports.getAllQuiz = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [row] = await connection.execute('select * from quiz')

            if (row.length > 0) {
                return res.json({ data: row, success: true, status: 'success' })
            } else {
                return res.json({ success: false, message: "Unauthorized accress !" });
            }
        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }

    } catch (error) {
        return res.json({ success: false, error })
    }
}

exports.getQuizCategory = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [row] = await connection.execute('select * from quiz_category')

            if (row.length > 0) {
                return res.json({ data: row, success: true, status: 'success' })
            } else {
                return res.json({ success: false, message: "Unauthorized accress !" });
            }
        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        return res.json({ success: false, error })
    }
}

exports.addNewQuiz = async (req, res) => {
    const errors = validationResult(req);
    const { question, option_1, option_2, option_3, option_4, correct_answer, quiz_category, difficulty, is_active } = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [rows] = await connection.execute(
                "INSERT INTO  quiz  (`question`, `option_1`, `option_2`, `option_3`, `option_4`, `correct_answer`, `quiz_category`, `difficulty`, `is_active`) VALUES(?,?,?,?,?,?,?,?,?)",
                [question, option_1, option_2, option_3, option_4, correct_answer, quiz_category, difficulty, is_active]
            );

            if (rows.affectedRows === 1) {

                const [row] = await connection.execute('select * from quiz WHERE quiz_id=?', [rows?.insertId])

                return res.json({ success: true, status: 'success', message: 'Question successfully Inserted !', data: row[0] })
            } else {
                return res.json({ success: false, message: 'Question Not Inserted !' })
            }
        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        return res.json({ success: false, error })
    }

}

exports.addNewQuizCategory = async (req, res) => {


    const errors = validationResult(req);
    const { category_name, is_active } = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [rows] = await connection.execute(
                "INSERT INTO  quiz_category (`category_name`,`is_active`) VALUES(?,?)", [category_name, is_active]
            );
            if (rows.affectedRows === 1) {
                const [row] = await connection.execute('select * from quiz_category WHERE quiz_category_id=?', [rows?.insertId])

                return res.json({ success: true, status: 'success', message: 'Question Category successfully Inserted !', data: row[0] })
            } else {
                return res.json({ success: false, message: 'Question Category Not Inserted !' })
            }
        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        return res.json({ success: false, error })
    }

}

exports.updateQuiz = async (req, res) => {

    const errors = validationResult(req);
    const { quiz_id, question, option_1, option_2, option_3, option_4, correct_answer, quiz_category, difficulty, is_active } = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [rows] = await connection.execute(
                "UPDATE quiz SET question=?, option_1=?, option_2=?, option_3=?, option_4=?, correct_answer=?, quiz_category=?, difficulty=?, is_active=?  WHERE quiz_id=?",
                [question, option_1, option_2, option_3, option_4, correct_answer, quiz_category, difficulty, is_active, quiz_id]
            );
            if (rows.affectedRows === 1) {

                const [row] = await connection.execute('select * from quiz WHERE quiz_id=?', [quiz_id])
                return res.json({ success: true, status: 'success', message: 'Question successfully Updated !', data: row[0] })
            } else {
                return res.json({ success: false, message: 'Question Not Updated !' })
            }
        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        return res.json({ success: false, error })
    }
}

exports.updateQuizCategory = async (req, res) => {


    const errors = validationResult(req);
    const { category_name, is_active, quiz_category_id } = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [rows] = await connection.execute(
                "UPDATE quiz_category SET category_name=?, is_active=?  WHERE quiz_category_id=?", [category_name, is_active, quiz_category_id]
            );
            if (rows.affectedRows === 1) {
                const [row] = await connection.execute('select * from quiz_category WHERE quiz_category_id=?', [quiz_category_id])

                return res.json({ success: true, status: 'success', message: 'Question Category successfully Updated !', data: row[0] })
            } else {
                return res.json({ success: false, message: 'Question Category Not Updated !' })
            }
        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        return res.json({ success: false, error })
    }


}

exports.deleteQuiz = async (req, res) => {

    const { quiz_id } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [row] = await connection.execute("DELETE FROM quiz WHERE quiz_id=?", [quiz_id])

            return res.json({ success: true, status: 'success', message: 'Question successfully DELETED !', })
        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        return res.json({ success: false, error })
    }
}

exports.deleteQuizCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { quiz_category_id } = req.params;

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [row] = await connection.execute("DELETE FROM quiz_category WHERE quiz_category_id=?", [quiz_category_id])

            return res.json({ success: true, status: 'success', message: 'Question Categorysuccessfully DELETED !', })
        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        return res.json({ success: false, error })
    }

}