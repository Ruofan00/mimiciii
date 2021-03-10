"use strict";

const general_dao = require("../dao/general_dao");
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

/**  **/

/** dummy function for test **/
exports.dummy = async function() {
    console.log("222");
    return 1;
};



