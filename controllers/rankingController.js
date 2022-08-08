import connection from "../dbStrategy/postgres.js";

const getRanking = async (req, res) => {

    try {
        const { rows: rankingDataArray } = await connection.query(`
            SELECT 
                users.id, 
                users.name, 
                COUNT(urls."shortUrl") AS "linksCount", 
                SUM(urls.visits) AS "visitCount"
            FROM users
            JOIN urls
                ON users.id = urls."userId"
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10     
        `);

        res.status(200).send(rankingDataArray);
    } catch (error) {
        res.status(500).send(error);
    };
};

export { getRanking };