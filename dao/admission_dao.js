"use strict";
const AthenaExpress = require("athena-express");
const aws = require("aws-sdk");
const config = require("../config/config");

/* show the total number of admission table*/
const athenaExpress = config.athenaExpress();
exports.count = async function() {
    let myQuery = {
        sql:"SELECT count(*) FROM admissions",
        db:process.env.athena_db
    };
    try {
        console.log("enter",new Date().toLocaleTimeString());
        console.time("count");
        let results = await athenaExpress.query(myQuery);
        console.timeEnd("count");
        return results;
    } catch (error) {
        console.log(error);
    }
};

exports.dummy = async function() {
    console.log("222");
    return 1;
};



