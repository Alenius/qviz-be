const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: "qvis",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const getQuestions = async (questionId) => {
  const res = await pool.query(
    `SELECT * from quiz WHERE id=${questionId} ORDER BY id ASC`
  );
  return res.rows;
};

module.exports = {
  getQuestions,
};
