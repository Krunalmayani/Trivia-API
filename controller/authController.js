
const { validationResult } = require("express-validator");
const connection = require("../db").promise();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



exports.signIn = async (req, res, next) => {
    const { user_name, email, password } = req.body;


    try {
        const [row] = await connection.execute(
            "SELECT * FROM authsignin WHERE (`email`=? or `user_name`=?) ",
            [email, user_name]
        );


        const passMatch = await bcrypt.compare(password, row[0].password_hash);

        if (!passMatch) {
            return res.json({ success: false, message: "Incorrect password", });
        }
        if (passMatch) {
            const theToken = jwt.sign({ id: row[0].id, email }, "the-super-strong-secrect");
            console.log('theToken  :', theToken);

            if (theToken) {
                const [result] = await connection.execute(
                    "UPDATE authsignin SET access_token=?, last_login=?  WHERE `id`=? ",
                    [theToken, new Date(), row[0].id]
                );

                if (result.affectedRows === 1) {
                    const [col] = await connection.execute(
                        "SELECT * FROM users WHERE (`email`=? or `user_name`=?) and `id`=? ",
                        [email, user_name, row[0].id]
                    );
                    return res.status(200).json({
                        success: true,
                        status: "success",
                        message: "SignIn in successfully 😊",
                        token: theToken,
                        data: col[0],
                    });
                }
            }
            res.status(201).json(theToken);
        }
    } catch (error) {
        next(error);
    }

    return res.status(200)

};


