"use strict";

const general_dao = require("../dao/general_dao");
const solr = require("../solr/search");
/** show the total number of admission table **/
exports.count = async function() {
  return await general_dao.general_dao("SELECT count(*) FROM admissions","count");
};

/** religion **/
exports.time_death = async function() {
    return await general_dao.general_dao(
        "SELECT religion, count(*) AS num FROM admissions" +
        " GROUP BY religion" +
        " ORDER BY num DESC",
        "religion");
};

exports.icd9_results = async function(keyword) {
    let icd9_code = await solr.icd9_search(keyword);
    console.log("icd9_dao",icd9_code);
    let res = await general_dao.general_dao(
        "SELECT subject_id FROM diagnoses_icd " +
        "WHERE icd9_code = '"+icd9_code+"'", "icd9_code_subjects"
    );
    let subjects = res.Items;
    let ids = [];
    for(let i=0;i<subjects.length;i++) {
        //console.log(subjects[i]['subject_id']);
        ids.push(subjects[i]['subject_id']);
    }
    console.log(ids);
    return ids;
   // return result;
};



/** dummy function for test **/
exports.dummy = async function() {
    console.log("222");
    return 1;
};



