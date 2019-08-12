var express = require('express');
var router = express.Router();
const mysql = require('mysql'); // 1. 드라이버 등록

/* GET login page. */
router.get('/', function (req, res, next) {
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "fitchain",

  });
  conn.connect((err) => {
    if (err) {
      return console.error(err.message);
    }

    const sql_del = `delete from member where id = ?`;
    console.log(sql_del);

    // 4. SQL문 전송
    conn.query(sql_del,[req.session.userId], (err, results, fields) => {
      if (err) {
        console.error(err.message);
        res.json(JSON.stringify(result));
      } else {

        console.log("탈퇴됨 :" + results);

        req.session.regenerate((err) => {
          res.render('fitchain_login_register');
        });
      }
      conn.end((err) => {
        if (err) {
          return console.error(err.message);
        }
      });
    }); //conn.query
  }); //conn.conect
});




module.exports = router;
