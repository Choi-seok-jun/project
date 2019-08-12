var express = require('express');
var router = express.Router();

/* GET fitchain_find_reg_infomation_form page. */
router.get('/', function (req, res, next) {
    res.render('fitchain_find_reg_infomation_form');
});



/* POST change_password . */
const mysql = require('mysql');

router.post('/', function (req, res, next) {
    req.body.msg = '';

    let con = mysql.createConnection({ // 2. 연결
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'fitchain'
    });

    con.connect((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("DB연결됨");

        const sql = `UPDATE member SET pw = ? WHERE id = ?;`;
        console.log(sql);

        con.query(sql,[req.body.new_reg_pw,req.body.reg_id], (err, results, fields) => {
            if (err) {
                console.log(err.message);
                req.body.msg = "ERROR발생";
                res.json(req.body);
            } else {
                console.log(results);
                req.body.msg = `${req.body.reg_id}님 비밀번호 변경이 완료 되었습니다.`;  // JavaScript 객체 데이터
                res.json(req.body);
            }
            con.end((err) => {
                if (err) {
                    return console.error(err.message);
                }
            });

        });
    });
});

module.exports = router;
