import connection from "../dbStrategy/postgres.js";
import urlSchema from "../schemas/urlsSchema.js";
import Trim from "trim";
import  { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

const shortenUrl = async (req, res) => {
    const url = req.body;
    const authorization = Trim(req.headers.authorization?.replace("Bearer", ""));
    const {error: errorUrlSchema} = urlSchema.validate(url, { abortEarly: false });

    if (errorUrlSchema) {
        return res.status(422).send(errorUrlSchema.details);
    };

    try {
        const validateTokenAuthorization = await connection.query(`
            SELECT * FROM sessions WHERE token = $1`,
            [authorization]
        );

        jwt.verify(authorization, process.env.SECRET, async function (err, decoded){
            if (validateTokenAuthorization.rowCount < 1 || !authorization || err) {
                return res.sendStatus(401);
            };
        });

        const urlObject = {
            userId: validateTokenAuthorization.rows[0].userId,
            url: url.url,
            shortUrl: nanoid(),
            visits: 0
        };
        
        await connection.query(`
            INSERT INTO urls ("userId", url, "shortUrl", visits)
            VALUES ($1, $2, $3, $4)`,
            [urlObject.userId, urlObject.url, urlObject.shortUrl, urlObject.visits]
        );

        res.status(201).send({shortUrl: urlObject.shortUrl});
    } catch (error) {
        res.status(500).send(error);
    };
};

const getUrls = async (req, res) => {
    const id = req.params.id

    try {
        const url = await connection.query(`
            SELECT id, "shortUrl", url FROM urls WHERE id = $1`,
            [id]
        );

        if (url.rowCount < 1) {
            return res.sendStatus(404);
        };

        res.status(200).send(url.rows[0]);
    } catch (error) {
        res.status(500).send(error);
    };
};

export { shortenUrl, getUrls };