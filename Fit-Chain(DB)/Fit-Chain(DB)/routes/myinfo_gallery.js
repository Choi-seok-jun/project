var express = require('express');
var router = express.Router();
const mysql = require('mysql');

/* GET main page. */
router.get('/', function (req, res, next) {
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fitchain",
  });
  conn.connect((err) => {
    if (err) {
      return console.error(err.message);
    }

    console.log("myinfo_gally GET  :   DB 연결 성공");

    // 3. SQL문 생성
    const sql = `select * from main_photo where name = "${req.session.userName}"`;
    console.log(sql);

    // 4. SQL문 전송
    conn.query(sql, (err, results, fields) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(results);
        if (results[0]) {
          //my gallery 경로 불러오기 
          req.session.my_gallery_plag = 1;
          req.session.my_gallery = results;
          //--------------------------------------------
        } else {
          req.session.my_gallery_plag = 0;
          req.session.my_gallery = '';
        }

        console.log( req.session.my_gallery_plag);
        console.log( req.session.my_gallery);


        res.render('fitchain_myinfo_gallery',
          {
            my_gallery_plag : req.session.my_gallery_plag,
            my_gallery: req.session.my_gallery,
          });
      }

      conn.end((err) => {
        if (err) {
          return console.error(err.message);
        }
      }); ///conn.end
    }); //conn.query
  }); //conn.conect
});  // route get

router.post('/', function (req, res, next) {
  const result = { msg: '' };
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fitchain",
  });


  conn.connect((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("DB연결됨");
    console.log(req.body.charge_coin);

    const sql = `update member set charge_coin = ${req.body.charge_coin} where id ="${req.session.userId}"`;
    // const sql_delete = `delete from member where id = "${req.session.userId}"`;

    // console.log(sql_delete);


    // ----------------------------------------------------------
    conn.query(sql, (err, rs, fields) => {
      if (err) {
        req.session.charge_user = req.body.charge_coin;
        console.log(err.message);
        result.msg = "ERROR발생";
        res.json(JSON.stringify(result));
      } else {
        req.session.charge_user = req.body.charge_coin;
        result.msg = `${req.body.charge_coin}COIN 충전되었습니다.`;  // JavaScript 객체 데이터
        res.json(JSON.stringify(result));
      }
    });

    // ----------------------------------------------------------

    // conn.query(sql_delete, (err, rs, fields) => {
    //   if(err) {
    //     console.log(err.message);
    //     result.msg = "ERROR발생";
    //   } else {
    //     console.log(rs);
    //     res.redirect('fitchain_login_register');
    //   }
    // })




  });
});










module.exports = router;
