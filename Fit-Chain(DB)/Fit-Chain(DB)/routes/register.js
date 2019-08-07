var express = require('express');
var router = express.Router();
const mysql = require('mysql');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('fitchain_login_register');
});

router.post('/',function(req, res, next) {
    const result = {msg: ''};

    let con = mysql.createConnection({ // 2. 연결
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'fitchain'
      });
    
      con.connect((err)=>{
        if(err) {
          return console.error(err.message);
        }
        console.log("DB연결됨");
        const sql = `insert into member(id,pw,name) values('${req.body.reg_id}','${req.body.reg_pw}','${req.body.reg_name}')`;
        console.log(sql);
        con.query(sql,(err,results,fields)=>{
          if(err) {
            req.session.userName = req.body.reg_name;
            console.log(err.message);
            result.msg = "ERROR발생";
            res.json(JSON.stringify(result));
          } else {
            console.log(results,fields);
            result.msg = `${req.body.reg_name}님 가입되셨습니다.`;  // JavaScript 객체 데이터
            res.json(JSON.stringify(result));
          }
          con.end((err)=>{
            if(err) {
              return console.error(err.message);
            }
          });
    
        });
    });
});



module.exports = router;
