import connection from "../dbStrategy/postgres.js";
import Trim from "trim";
import jwt from "jsonwebtoken";

const getUser = async (req, res) => {
    const authorization = Trim(req.headers.authorization?.replace("Bearer", ""));

    try {
        const validateTokenAuthorization = await connection.query(`
            SELECT * FROM sessions  WHERE token = $1`,
            [authorization]
        );

        jwt.verify(authorization, process.env.SECRET, async function (err, decoded){
            if (validateTokenAuthorization.rowCount < 1 || !authorization || err) {
                return res.sendStatus(401);
            };
        });

        const checkExistingUser = await connection.query(`
            SELECT * FROM users WHERE id = $1`,
            [validateTokenAuthorization.rows[0].userId]
        );

        if (checkExistingUser.rowCount < 1) {
            return res.sendStatus(404)
        };

        const { rows: userDataArray } = await connection.query(`
            SELECT 
                users.id, 
                users.name,
                SUM(urls.visits) AS "visitCount",
                array_to_json(array_agg(urls)) AS "shortenedUrls"
            FROM users
            JOIN urls
                ON urls."userId" = users.id
            WHERE users.id = $1
            GROUP BY users.id`,
            [checkExistingUser.rows[0].id]
        );

        res.status(200).send(userDataArray);
    } catch (error) {
        res.status(500).send(error);
    };
};


export { getUser };