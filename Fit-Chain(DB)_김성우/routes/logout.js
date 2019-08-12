var express = require('express');
var router = express.Router();
const mysql = require('mysql'); // 1. 드라이버 등록

/* GET login page. */
router.get('/', function (req, res, next) {
  req.session.regenerate((err)=>{

    res.render('fitchain_login_register');
  });
});



module.exports = router;
