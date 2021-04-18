var express = require('express');
var router = express.Router();
var admission = require('../dao/admission_dao');
var tsne = require('../solr/tsne');

/* GET home page. */
router.get('/', function(req, res, next) {
  tsne.plot();
  res.render('index', { title: 'Express' });
});

/* GET admission table data */
router.get('/ad',function(req,res,next) {
  var data = require("../dao/admission_dao");
  console.log("count:",data.count());
  console.log("dummy",data.dummy());

});
/* Search page */
router.get('/search',async function(req,res,next){
  const keyword = req.query.keyword;
  var solr = require("../solr/search");
  var result = await solr.basic_search_result(keyword);
  var subjects = await admission.icd9_results(keyword);
  var synonyms = await solr.syn_search(keyword);
  let icd9_code = await solr.icd9_search(keyword);
  let icd10s = await solr.icd10_search(keyword);
  //res.json(result);
  res.render("search",{
    data:result,
    icd9_code:icd9_code,
    icd10_code:icd10s["icd10_code"],
    synonyms:synonyms,
    subjects:subjects,
    num: result.response.numFound,
    title:keyword,
  });
  console.log(result.response.numFound)
});

router.get('/adanced_search',async function(req,res,next) {

});

module.exports = router;
