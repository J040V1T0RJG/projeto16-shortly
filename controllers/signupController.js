import connection from "../dbStrategy/postgres.js";
import signupSchema from "../schemas/signupSchema.js";
import bcrypt from "bcrypt";

const createSignup = async (req, res) => {
    const newUser = req.body;
    const { error: errorSignupSchema } = signupSchema.validate(newUser, { abortEarly: false});
    const encryptedPassword = bcrypt.hashSync(newUser.password, 10);
    const differentPasswords = (newUser.password !== newUser.confirmPassword);

    if (errorSignupSchema || differentPasswords ) {
        return res.status(422).send(errorSignupSchema?.details);
    };

    try {
        const result = await connection.query(`
            SELECT * FROM users WHERE email = $1`,
            [newUser.email]
        );

        if (result.rowCount > 0) {
            return res.sendStatus(409);
        };
        
        await connection.query(`
            INSERT INTO users (name, email, password) 
            VALUES ($1, $2, $3)`, 
            [newUser.name, newUser.email, encryptedPassword]
        );

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    };
};


export { createSignup };