
const { validationResult } = require("express-validator");
const connection = require("../db").promise();

exports.addContestWinningList = async (req, res, next) => {
    console.log('req?.body ::', req?.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { contest_id, rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8, rank9, rank10,
        prize1, prize2, prize3, prize4, prize5, prize6, prize7, prize8, prize9, prize10,
    } = req?.body

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [rows] = await connection.execute(
                "INSERT INTO winningList(`contest_id`,`rank1`,`rank2`,`rank3`,`rank4`,`rank5`,`rank6`,`rank7`,`rank8`,`rank9`,`rank10`,`prize1`,`prize2`,`prize3`,`prize4`,`prize5`,`prize6`,`prize7`,`prize8`,`prize9`,`prize10`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
                contest_id, rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8, rank9, rank10,
                prize1, prize2, prize3, prize4, prize5, prize6, prize7, prize8, prize9, prize10
            ]
            );
            if (rows.affectedRows === 1) {

                const [col] = await connection.execute("UPDATE contest SET is_winning=?  WHERE contest_id=?", [1, contest_id]);

                const [row] = await connection.execute('select * from winningList WHERE contest_id=?', [contest_id])

                return res.json({ success: true, status: 'success', message: 'Contest Winning List successfully Inserted !', data: row[0] })
            } else {
                return res.json({ success: false, message: 'Contest Winning List Not Inserted !' })
            }

        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        console.log('error ::', error);
        return res.json({ success: false, error })
    }



}
exports.editContestWinningList = async (req, res, next) => {
    const { contest_id } = req.params;
    console.log('contest_id ::', contest_id);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8, rank9, rank10,
        prize1, prize2, prize3, prize4, prize5, prize6, prize7, prize8, prize9, prize10,
    } = req?.body

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [rows] = await connection.execute(
                "UPDATE winningList SET rank1=?, rank2=?, rank3=?, rank4=?, rank5=?, rank6=?, rank7=?, rank8=?, rank9=?, rank10=?,prize1=?, prize2=?, prize3=?, prize4=?, prize5=?, prize6=?, prize7=?, prize8=?, prize9=?, prize10=?  WHERE contest_id=?",
                [rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8, rank9, rank10,
                    prize1, prize2, prize3, prize4, prize5, prize6, prize7, prize8, prize9, prize10, contest_id]
            );

            if (rows.affectedRows === 1) {
                const [row] = await connection.execute('select * from winningList WHERE contest_id=?', [contest_id])

                return res.json({ success: true, status: 'success', message: 'Contest Winning List successfully Update !', data: row[0] })
            } else {
                return res.json({ success: false, message: 'Contest Winning List Not update !' })
            }
        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        return res.json({ success: false, error })
    }
}

exports.getContestWinningList = async (req, res) => {
    const { contest_id } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        if (token) {
            const [row] = await connection.execute('select * from winningList  WHERE contest_id=?', [contest_id])


            return res.json({ data: row[0], success: true, status: 'success' })

        } else {
            return res.json({ success: false, status: 'error', message: "auth Token not found" });
        }
    } catch (error) {
        return res.json({ success: false, error })
    }
}
