var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET admission table data */
router.get('/ad',function(req,res,next) {
  var data = require("../dao/admission_dao");
  console.log("count:",data.count());
  console.log("dummy",data.dummy());

});

module.exports = router;
