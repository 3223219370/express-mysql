var express = require("express");
var router = express.Router();
const pool = require("../db/db");
/* GET users listing. */
router.post("/", async function (req, res, next) {
  const { userName, password } = req.body;
  const query = `SELECT * FROM mytable WHERE name = ? AND password = ?`;
  const [data] = await pool.query(query, [userName, password]);
  res.send({
    success:!!data?.length
  });
});
module.exports = router;
