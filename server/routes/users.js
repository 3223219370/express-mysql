var express = require('express');
var router = express.Router();
const pool = require('../db/db')
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const [data] = await pool.query('select * from mytable')
  res.send(data);
});
router.post('/add', async function(req, res, next ) {
  const { name, age,password } = req.body;
  const [result] = await pool.query('INSERT INTO mytable (name, age,password) VALUES (?, ?,?)', [name, age,password]);
  res.send(result);
})
router.post('/modify', async function(req, res, next ) {
  const { name, age,id } = req.body;
  const [result] = await pool.query('UPDATE mytable SET name = ?, age = ? WHERE id = ?', [name, age, id]);
  res.send(result);
})
router.post('/delete', async function(req, res, next ) {
  const { id } = req.body;
  const [result] = await pool.query('DELETE FROM mytable WHERE id =?', [id]);
  res.send(result);
})
module.exports = router;
