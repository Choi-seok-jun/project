var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('fitchain_upload');
});



/* post 파일 업로드. */
var formidable = require('formidable');
var fs = require('fs');
const mysql = require('mysql'); // 프로필 DB에 저장

router.post('/', function (req, res, next) {
  // req.session.profile_img_path = 'images/myinfo/basic.jpg';
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fitchain",
  });

  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    var oldpath = files.imgFile.path;
    var folderpath = 'public/images/main_photo/' 
    fs.mkdir(folderpath, { recursive: true }, (err) => {
      if (err) throw err;
    });
    var newpath = folderpath + files.imgFile.name;
    var tag_name = fields.tag_name;
    console.log(newpath);
    var main_img_path = 'images/main_photo/'  + files.imgFile.name;
    console.log(main_img_path);
    // ---------- DB 등록 ----------
    conn.connect((err) => {
      if (err) { return console.error(err.message); }
      console.log("DB 연결 성공");
      // 3. SQL문 생성
      const sql = `insert into main_photo(name, img_path, tag) values("${req.session.userName}","${main_img_path}","${tag_name}");`;
      console.log(sql);
      // 4. SQL문 전송
      conn.query(sql, (err, results, fields) => {
        if (err) {
          console.error(err.message);
          res.json(JSON.stringify(result));
        } else {
          console.log("쿼리전송 성공"+results);
        }
        conn.end((err) => {
          if (err) { return console.error(err.message); }

          fs.rename(oldpath, newpath, function (err) { //파일 생성 (업로드)
            if (err) throw err;
            // res.send('File uploaded and moved!');
            // res.end();
          });

        });
        // console.log(req.session.profile_img_path);
        res.redirect('/main#main_photo');
      });
    });
    //-------------------------------------------------------

  });
});
module.exports = router;
