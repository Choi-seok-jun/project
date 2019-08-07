var express = require('express');
var router = express.Router();
const mysql = require('mysql'); // 1. 드라이버 등록

/* GET main page. */
router.get('/', function (req, res, next) {
  console.log(req.sessionID);
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
    console.log("/main get DB연결됨");
    // -------------------- 그림에 사용된 총 코인 
    const sql_send = "select sum(plus_coin) from main_photo";
    conn.query(sql_send, (err, rs, fields) => {
      if (err) {
        console.log(err.message);
        result.msg = "ERROR발생";
      } else {
        // console.log();
        console.log(rs[0]['sum(plus_coin)']);
        req.session.send_coin = rs[0]['sum(plus_coin)'];
      }
    });

    // --------------- 총 게시물
    const sql_gallery = "select count(num) from main_photo";
    conn.query(sql_gallery, (err, rs, fields) => {
      if (err) {
        console.log(err.message);
        result.msg = "ERROR발생";
      } else {
        // console.log();
        console.log(rs[0]['count(num)']);
        req.session.gallery = rs[0]['count(num)'];
      }
    });

    // ------------------가입자수 
    const sql_member = "select count(num) from member";
    conn.query(sql_member, (err, rs, fields) => {
      if (err) {
        console.log(err.message);
        result.msg = "ERROR발생";
      } else {
        // console.log();
        console.log(rs[0]['count(num)']);
        req.session.member = rs[0]['count(num)'];

      }
    });



    //----------------------------------------------------

    // 랭크 이미지 넣기

    const sql_rank1_profile = "select * from member m, main_photo mp where m.name=mp.name order by mp.plus_coin desc limit 0,1";
    conn.query(sql_rank1_profile, (err, rs, fields) => {
      if (err) {
        console.log(err.message);
        result.msg = "ERROR발생";
      } else {
        console.log(rs);
        req.session.rank_1_profile = rs[0].profile_img_path;
        console.log(req.session.rank_1_profile);             
      }
    });


    const sql_rank2_profile = "select * from member m, main_photo mp where m.name=mp.name order by mp.plus_coin desc limit 1,1";
    conn.query(sql_rank2_profile, (err, rs, fields) => {
      if (err) {
        console.log(err.message);
        result.msg = "ERROR발생";
      } else {
        console.log(rs);
        req.session.rank_2_profile = rs[0].profile_img_path;
        console.log(req.session.rank_2_profile);
      }
    });

    const sql_rank3_profile = "select * from member m, main_photo mp where m.name=mp.name order by mp.plus_coin desc limit 2,1";
    conn.query(sql_rank3_profile, (err, rs, fields) => {
      if (err) {
        console.log(err.message);
        result.msg = "ERROR발생";
      } else {
        console.log(rs);
        req.session.rank_3_profile = rs[0].profile_img_path;
        console.log(req.session.rank_3_profile);
      }
    });


    //----------------------------------------------------

    // 랭크 순위 매기기
    const sql_rank1 = "select * from main_photo order by plus_coin desc limit 0,1";
    conn.query(sql_rank1, (err, rs, fields) => {
      if (err) {
        console.log(err.message);
        result.msg = "ERROR발생";
      } else {
        console.log(rs);
        req.session.rank_1_name = rs[0].name;
        req.session.rank_1_coin = rs[0].plus_coin;
      }
    });


    const sql_rank2 = "select * from main_photo order by plus_coin desc limit 1,1";
    conn.query(sql_rank2, (err, rs, fields) => {
      if (err) {
        console.log(err.message);
        result.msg = "ERROR발생";
      } else {
        console.log(rs);
        req.session.rank_2_name = rs[0].name;
        req.session.rank_2_coin = rs[0].plus_coin;
      }
    });


    const sql_rank3 = "select * from main_photo order by plus_coin desc limit 2,1";
    conn.query(sql_rank3, (err, rs, fields) => {
      if (err) {
        console.log(err.message);
        result.msg = "ERROR발생";
      } else {
        console.log(rs);
        req.session.rank_3_name = rs[0].name;
        req.session.rank_3_coin = rs[0].plus_coin;
      }
    });



    //-----------------------------------------------------








    console.log(req.session.rank_1_profile);
    console.log(req.query.tag_search);
    if (req.query.tag_search) {
      const sql_search = `select * from main_photo where tag = '${req.query.tag_search}'`;
      conn.query(sql_search, (err, rs, fields) => {
        if (err) {
          console.log(err.message);
          result.msg = "EEROR발생";
        } else {
          console.log('yes tag');
          if (rs) {

  
            res.render('fitchain_main', {
              loginState: req.session.loginState,
              user_name: req.session.userName,
              user_id: req.session.userId,
              main_photo: rs,
              main_photo_plag: false,
              send_coin: req.session.send_coin,
              gallery: req.session.gallery,
              member: req.session.member,
              rank_1_name: req.session.rank_1_name,
              rank_2_name: req.session.rank_2_name,
              rank_3_name: req.session.rank_3_name,
              rank_1_coin: req.session.rank_1_coin,
              rank_2_coin: req.session.rank_2_coin,
              rank_3_coin: req.session.rank_3_coin,
              rank_1_profile: req.session.rank_1_profile,
              rank_2_profile: req.session.rank_2_profile,
              rank_3_profile: req.session.rank_3_profile,
            });

          } else {
            res.render('fitchain_main', {
              loginState: req.session.loginState,
              user_name: req.session.userName,
              user_id: req.session.userId,
              main_photo: 'images/myinfo/basic.jpg',
              main_photo_plag: false,
              send_coin: req.session.send_coin,
              gallery: req.session.gallery,
              member: req.session.member,
              rank_1_name: req.session.rank_1_name,
              rank_2_name: req.session.rank_2_name,
              rank_3_name: req.session.rank_3_name,
              rank_1_coin: req.session.rank_1_coin,
              rank_2_coin: req.session.rank_2_coin,
              rank_3_coin: req.session.rank_3_coin,
              rank_1_profile: req.session.rank_1_profile,
              rank_2_profile: req.session.rank_2_profile,
              rank_3_profile: req.session.rank_3_profile,
            });
          }
        }
      });
    }

    else {
      console.log('no tag');
      const sql = "select * from main_photo";
      console.log("main_photo :   " + sql);
      
      conn.query(sql, (err, rs, fields) => {
        if (err) {
          console.log(err.message);
          result.msg = "ERROR발생";
        } else {
          console.log(typeof (rs));
          if (rs) {
            res.render('fitchain_main', {
              loginState: req.session.loginState,
              user_name: req.session.userName,
              user_id: req.session.userId,
              main_photo: rs,
              main_photo_plag: true,
              send_coin: req.session.send_coin,
              gallery: req.session.gallery,
              member: req.session.member,
              rank_1_name: req.session.rank_1_name,
              rank_2_name: req.session.rank_2_name,
              rank_3_name: req.session.rank_3_name,
              rank_1_coin: req.session.rank_1_coin,
              rank_2_coin: req.session.rank_2_coin,
              rank_3_coin: req.session.rank_3_coin,
              rank_1_profile: req.session.rank_1_profile,
              rank_2_profile: req.session.rank_2_profile,
              rank_3_profile: req.session.rank_3_profile,
            });

          } else {
            res.render('fitchain_main', {
              loginState: req.session.loginState,
              user_name: req.session.userName,
              user_id: req.session.userId,
              main_photo: 'images/myinfo/basic.jpg',
              main_photo_plag: false,
              send_coin: req.session.send_coin,
              gallery: req.session.gallery,
              member: req.session.member,
              rank_1_name: req.session.rank_1_name,
              rank_2_name: req.session.rank_2_name,
              rank_3_name: req.session.rank_3_name,
              rank_1_coin: req.session.rank_1_coin,
              rank_2_coin: req.session.rank_2_coin,
              rank_3_coin: req.session.rank_3_coin,
              rank_1_profile: req.session.rank_1_profile,
              rank_2_profile: req.session.rank_2_profile,
              rank_3_profile: req.session.rank_3_profile,
            });
          }
        }

        conn.end((err) => {
          if (err) { return console.error(err.message); }

        });
      });
    }

  });



});

// ---------------------------------------------------------------------------
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



    // 해당 게시물에 코인 적립.
    const sql_coin_calc = `select * from main_photo where num = ${req.body.photo_num}`
    conn.query(sql_coin_calc, (err, rs, fields) => {
      if (err) {
        console.log(err.message);
        result.msg = "ERROR발생";
      } else {
        // console.log();
        console.log(rs);
        var sum_coin = parseInt(req.body.coin_integer) + parseInt(rs[0].plus_coin);
        const sql_coin_inset = `update main_photo set plus_coin = ${sum_coin} where num = ${req.body.photo_num}`
        conn.query(sql_coin_inset, (err, rs, fields) => {
          if (err) {
            console.log(err.message);
            result.msg = "ERROR발생";
          } else {
            console.log("해당게시물에 코인 축적됨");
          }
        });
      }
    });


    /// ---- 사용된 코인 감소
    const sql_charge_coin = `select * from member where id = "${req.session.userId}"`
    conn.query(sql_charge_coin, (err, rs, fields) => {
      if (err) {
        console.log(err.message);
        result.msg = "ERROR발생";
      } else {
        // console.log();
        console.log(rs);
        var sum_coin = parseInt(rs[0].charge_coin) - parseInt(req.body.coin_integer);
        const sql_coin_inset = `update member set charge_coin = ${sum_coin} where id = "${req.session.userId}"`
        conn.query(sql_coin_inset, (err, rs, fields) => {
          if (err) {
            console.log(err.message);
            result.msg = "ERROR발생";
          } else {
            console.log("로그인 사용자의 코인 감소됨");
          }
        });
      }
    });

    /// ---- 사용한 사용자의 코인 합 DB저장
    const sql_spent_coin = `select * from member where id = "${req.session.userId}"`
    conn.query(sql_spent_coin, (err, rs, fields) => {
      if (err) {
        console.log(err.message);
        result.msg = "ERROR발생";
      } else {
        // console.log();
        console.log(rs);
        var sum_coin = parseInt(rs[0].send_coin) + parseInt(req.body.coin_integer);
        const sql_coin_inset = `update member set send_coin = ${sum_coin} where id = "${req.session.userId}"`
        conn.query(sql_coin_inset, (err, rs, fields) => {
          if (err) {
            console.log(err.message);
            result.msg = "ERROR발생";
          } else {
            console.log("로그인 사용자의 사용 코인 축적 됨");
            result.msg = `${req.body.coin_integer}COIN 지급하였습니다.`;  // JavaScript 객체 데이터
            res.json(JSON.stringify(result));
          }
        });
      }





      conn.end((err) => {
        if (err) {
          return console.error(err.message);
        }
      });
    });

    // console.log(req.body.coin_integer);
    // const sql = `update member set send_coin = ${req.body.coin_integer} where id ="${req.session.userId}"`
    // console.log(sql);

    // conn.query(sql, (err, rs, fields) => {
    //   if (err) {
    //     console.log(err.message);
    //     result.msg = "ERROR발생";
    //     res.json(JSON.stringify(result));
    //   } else {

    //   }
    //   conn.end((err) => {
    //     if (err) {
    //       return console.error(err.message);
    //     }
    //   });

    // });

  });

});




module.exports = router;
