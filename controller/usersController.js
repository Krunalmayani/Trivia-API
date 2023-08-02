const { validationResult } = require("express-validator");
const connection = require("../db").promise();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.getAllUsers = async (req, res, next) => {
    const errors = validationResult(req);

    // let arr_id = ['1', '2', '3', '4', '5', '6', '7',]
    // let arr_id_join = arr_id.join(',')
    // let arr_id_split = arr_id_join.split(',');
    // // console.log('arr_id_join', arr_id_join);
    // console.log('arr_id_split', arr_id_split);
    // console.log('arr_id', `${arr_id}`);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [row] = await connection.execute('select * from users')

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