var express = require('express');
var router = express.Router();
const mysql = require('mysql'); // 1. 드라이버 등록

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('fitchain_login_register');
})

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

    console.log("DB 연결 성공");

    // 3. SQL문 생성
    const sql = `select * from member where id = "${req.body.login_id}"`;
    console.log(sql);

    // 4. SQL문 전송
    conn.query(sql, (err, results, fields) => {
      if (err) {
        console.error(err.message);

        res.json(JSON.stringify(result));
      } else {
        // console.log(results[0].name);
        // console.log(results[0].id);
        if (results[0]) {
          //세션에 로그인정보저장----------------------
          req.session.loginState = true;
          req.session.userName = results[0].name;
          req.session.userId = results[0].id;
          if (results[0].profile_img_path) {
            req.session.profile_img_path = results[0].profile_img_path;
          } else {
            req.session.profile_img_path = "images/myinfo/basic.jpg";
          }
          //--------------------------------------------
          console.log(req.session.profile_img_path);
          result.msg = `${results[0].name}님 환영합니다.`;
          res.json(JSON.stringify(result));

        } else {
          result.msg = "다시 로그인하세요.";
          result.login_status = 0;

          res.json(JSON.stringify(result));
        }
      }
//main_photo 쿼리....
      conn.end((err) => {
        if (err) {
          return console.error(err.message);
        }
      });



    }); //conn.query
  }); //conn.conect
}); // post

module.exports = router;
