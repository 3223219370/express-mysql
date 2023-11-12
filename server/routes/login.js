var express = require("express");
var router = express.Router();
const pool = require("../db/db");
const jwt= require('../utils/jwt')
router.post("/", async function (req, res, next) {
  const { username, password } = req.body;
  const query = `SELECT * FROM mytable WHERE name = ? AND password = ? ;`;
  const [data] = await pool.query(query, [username,password]);
  console.log('ddata-->',data);
  if (data?.length) {
    // 生成token
    const token = jwt.creat({username, password});
    res.header('Authorization',token );
    res.send({
      success:true
    });
  } else {
    res.send({
      success:false
    });
  }
});
module.exports = router;
