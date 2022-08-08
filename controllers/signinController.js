import connection from "../dbStrategy/postgres.js";
import signinSchema from "../schemas/signinSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import dayjs from "dayjs";


dotenv.config();

const signin = async (req, res) => {
    const user = req.body;
    const { error: errorSigninSchema } = signinSchema.validate(user, { abortEarly: false });

    if (errorSigninSchema) {
        return res.status(422).send(errorSigninSchema.details);
    };

    try {
        const checkExistingUser = await connection.query(`
            SELECT * FROM users WHERE email = $1`, 
            [user.email]
        );
        const samePassword = bcrypt.compareSync(user.password, checkExistingUser.rows[0]?.password); //comparar senha com undefined dá erro?

        if (checkExistingUser.rowCount < 1 || !samePassword) {
            return res.sendStatus(401);
        };

        let token = jwt.sign({id: `${checkExistingUser.rows[0].id}`}, process.env.SECRET, {expiresIn: 3600 });
        const now = dayjs().format("YYYY-MM-DD HH:mm:ss Z");
        const validateToken = await connection.query(`
            SELECT * FROM sessions WHERE "userId" = $1`,
            [checkExistingUser.rows[0].id]
        );
   
        if (validateToken.rowCount < 1) {
            await connection.query(`
                INSERT INTO sessions ("userId", session, token)
                VALUES ($1, $2, $3)`,
                [checkExistingUser.rows[0].id, now, token]
            );
        } else {
            const jwtverify =  jwt.verify(validateToken.rows[0].token, process.env.SECRET, async function (err, decoded){
                if (err) {
                    await connection.query(`
                        UPDATE sessions 
                        SET session = $1, token = $2 
                        WHERE id = $3`,
                        [now, token, validateToken.rows[0].id]
                    );
                } else {
                    token = validateToken.rows[0].token
                };
            });
        };

        res.status(200).send(token);
    } catch (error) {
        res.status(500).send(error);
    };
};

export { signin };