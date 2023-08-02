const { validationResult } = require("express-validator");
const connection = require("../db").promise();


exports.getAllContest = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [row] = await connection.execute('select * from contest')

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

exports.getContestCategory = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [row] = await connection.execute('select * from contest_category')

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

exports.addNewContest = async (req, res) => {

    const errors = validationResult(req);

    const { content_name, start_date, end_date, total_quiz, category_type, entry_fee, total_pool_prize, max_spot_entry, win_ratio, is_active } = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [rows] = await connection.execute(
                "INSERT INTO contest (`content_name`, `start_date`, `end_date`, `total_quiz`, `category_type`, `entry_fee`, `total_pool_prize`, `max_spot_entry`,`win_ratio`, `is_active`) VALUES(?,?,?,?,?,?,?,?,?,?)",
                [content_name, start_date, end_date, total_quiz, category_type, entry_fee, total_pool_prize, max_spot_entry, win_ratio, is_active]
            );

            if (rows.affectedRows === 1) {
                const [row] = await connection.execute('select * from contest WHERE contest_id=?', [rows?.insertId])

                return res.json({ success: true, status: 'success', message: 'Contest successfully Inserted !', data: row[0] })
            } else {
                return res.json({ success: false, message: 'Contest Not Inserted !' })
            }
        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        return res.json({ success: false, error })
    }

}

exports.addNewContestCategory = async (req, res) => {
    const errors = validationResult(req);
    const { category_name, is_active } = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const url = req.protocol + '://' + req.get('host') + '/contest/'
    if (!req.files) {
        return res.json({ success: false, message: 'Image is Not upload!' })

    } else {
        const token = req?.headers?.authorization?.split(" ")[1];
        try {
            if (token) {
                const [rows] = await connection.execute(
                    "INSERT INTO  contest_category (`category_name`,`category_icon`,`category_image`,`is_active`) VALUES(?,?,?,?)",
                    [category_name, url + req.files[0].filename, url + req.files[1].filename, is_active]
                );
                if (rows.affectedRows === 1) {
                    const [row] = await connection.execute('select * from contest_category WHERE category_id=?', [rows?.insertId])
                    return res.json({ success: true, status: 'success', message: 'Contest Category successfully Inserted !', data: row[0] })
                } else {
                    return res.json({ success: false, message: 'Contest Category Not Inserted !' })
                }
            } else {
                return res.json({ success: false, status: 'error', message: "auth Token not found" });
            }
        } catch (error) {
            return res.json({ success: false, error })
        }
    }

}

exports.updateContest = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { contest_id, content_name, start_date, end_date, total_quiz, category_type, entry_fee, total_pool_prize, max_spot_entry, win_ratio, is_active } = req.body;

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [rows] = await connection.execute(
                "UPDATE contest SET content_name=?, start_date=?, end_date=?, total_quiz=?, category_type=?, entry_fee=?, total_pool_prize=?, max_spot_entry=?, win_ratio=?, is_active=? WHERE contest_id=?",
                [content_name, start_date, end_date, total_quiz, category_type, entry_fee, total_pool_prize, max_spot_entry, win_ratio, is_active, contest_id]
            );

            if (rows.affectedRows === 1) {
                const [row] = await connection.execute('select * from contest WHERE contest_id=?', [contest_id])

                return res.json({ success: true, status: 'success', message: 'Contest successfully Update !', data: row[0] })
            } else {
                return res.json({ success: false, message: 'Contest Not update !' })
            }
        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        return res.json({ success: false, error })
    }

}

exports.updateContestCategory = async (req, res) => {
    const errors = validationResult(req);
    const { category_name, is_active, category_id } = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [rows] = await connection.execute(
                "UPDATE contest_category SET category_name=?,is_active=?  WHERE category_id=?", [category_name, is_active, category_id]
            );
            if (rows.affectedRows === 1) {
                const [row] = await connection.execute('select * from contest_category WHERE category_id=?', [category_id])

                return res.json({ success: true, status: 'success', message: 'Contest Category successfully Updated !', data: row[0] })
            } else {
                return res.json({ success: false, message: 'Contest Category Not Updated !' })
            }
        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        return res.json({ success: false, error })
    }
}

exports.deleteContest = async (req, res) => {

    const { contest_id } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [row] = await connection.execute("DELETE FROM contest WHERE contest_id=?", [contest_id])

            return res.json({ success: true, status: 'success', message: 'Question successfully DELETED !', })
        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        return res.json({ success: false, error })
    }
}

exports.deletContestCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { category_id } = req.params;
    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {

            const [row] = await connection.execute("DELETE FROM contest_category WHERE category_id=?", [category_id])

            return res.json({ success: true, status: 'success', message: 'Question Categorysuccessfully DELETED !', })
        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        return res.json({ success: false, error })
    }

}
