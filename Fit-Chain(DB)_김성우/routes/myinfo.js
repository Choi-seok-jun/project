var express = require('express');
var router = express.Router();

/* GET main page. */
router.get('/', function (req, res, next) {
  if (req.session.profile_img_path) {
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

      console.log("/myinfo GET DB연결됨");
      console.log(req.session.userName);

      const sql_info_user = `select * from member where name=?`;
      const sql_gallery_user = `select * from main_photo where name = ?`;

      conn.query(sql_gallery_user,[req.session.userName], (err, rs2, fields) => {
        if (err) {
          console.log(err.message);
          result.msg = "ERROR발생";
        }
        else {
          console.log(rs2.length);
          req.session.gallery_user = Object.keys(rs2).length;
        }
      });

      conn.query(sql_info_user,[req.session.userName], (err, rs, fields) => {
        if (err) {
          console.log(err.message);
          result.msg = "ERROR발생";
        } else {
          console.log(rs);
          console.log(rs[0].send_coin);
          console.log(rs[0].charge_coin);
          req.session.send_coin_user = rs[0].send_coin;
          req.session.charge_user = rs[0].charge_coin;

          if (rs) {
            res.render('fitchain_myinfo',
              {
                loginState: req.session.loginState,
                userName: req.session.userName,
                profile_img_path: req.session.profile_img_path,
                send_coin_user: req.session.send_coin_user,
                gallery_user: req.session.gallery_user,
                charge_user: req.session.charge_user
              });
          } else {
            res.render('fitchain_myinfo',
              {
                loginState: req.session.loginState,
                userName: req.session.userName,
                profile_img_path: req.session.profile_img_path,
                send_coin_user: req.session.send_coin_user,
                gallery_user: req.session.gallery_user,
                charge_user: req.session.charge_user
              });
          }

        }
      })


      conn.end((err) => {
        if (err) { return console.error(err.message); }

      });

    });

  } else {
    res.render('fitchain_myinfo',
      {
        userName: req.session.userName,
        profile_img_path: 'images/myinfo/basic.jpg',
        send_coin_user: 000,
        gallery_user: 000,
        charge_user: 000
      });
  }
});


/* post 파일 업로드. */
var formidable = require('formidable');
var fs = require('fs');
const mysql = require('mysql'); // 프로필 DB에 저장


router.post('/', function (req, res, next) {




  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "fitchain",
  });

  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    var oldpath = files.filetoupload.path;
    var folderpath = 'public/images/myinfo/' + req.session.userName;
    fs.mkdir(folderpath, { recursive: true }, (err) => {
      if (err) throw err;
    });
    var newpath = folderpath + '/' + files.filetoupload.name;
    console.log(newpath);
    var profile_img_path = '/images/myinfo/' + req.session.userName + '/' + files.filetoupload.name;
    console.log(profile_img_path);
    // ---------- DB 등록 ----------
    conn.connect((err) => {
      if (err) { return console.error(err.message); }
      console.log("myinfo post : DB 연결 성공");
      // 3. SQL문 생성
      const sql = `update member set profile_img_path = ? where name = ?;`;
      console.log(sql);
      // 4. SQL문 전송
      conn.query(sql,[profile_img_path,req.session.userName], (err, results, fields) => {
        if (err) {
          console.error(err.message);
          res.json(JSON.stringify(result));
        } else {
          console.log(results);

          //프로필 경로 수정
          req.session.profile_img_path = profile_img_path;
          console.log(req.session.profile_img_path);
        }
        conn.end((err) => {
          if (err) { return console.error(err.message); }

          fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            // res.send('File uploaded and moved!');
            // res.end();
          });

        });
        console.log(req.session.profile_img_path);
        res.redirect('/myinfo');
      });
    });
    //-------------------------------------------------------

  });
});









module.exports = router;
