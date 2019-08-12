var express = require('express');
var router = express.Router();
const mysql = require('mysql');

/* GET main page. */
router.get('/', function (req, res, next) {
  res.render('fitchain_myinfo_update',
    {
      loginState: req.session.loginState,
      userName: req.session.userName,
      send_coin: req.session.send_coin_user,
      charge_coin: req.session.charge_user
    });
});

router.post('/', function (req, res, next) {
  const result = { msg: '' };
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
    console.log("DB연결됨");
    console.log(req.body.charge_coin);

    const sql2 = `select charge_coin from member where id =? `;
    
    // ----------------------------------------------------------
    conn.query(sql2,[req.session.userId], (err, rs, fields) => {
      if (err) {
       
        console.log(err.message);
        result.msg = "ERROR발생";
        res.json(JSON.stringify(result));
      } else {
        req.session.charge_user = parseInt( req.body.charge_coin) + parseInt( rs[0].charge_coin);
        console.log(rs);
        console.log(req.session.charge_user);
      }

      const sql = `update member set charge_coin = ? where id = ?`;
      console.log(sql);
      // ----------------------------------------------------------
      conn.query(sql,[req.session.charge_user,req.session.userId], (err, rs, fields) => {
        if (err) {
          console.log(err.message);
          result.msg = "ERROR발생";
          res.json(JSON.stringify(result));
        } else {
          console.log("충전됨");
          res.redirect('/myinfo_update');
        }
      });

      conn.end((err) => {
        if (err) {
          return console.error(err.message);
        }
      });

    });
    



  });
});










module.exports = router;
