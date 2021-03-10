"use strict";

const config = require("../config/config");

const athenaExpress = config.athenaExpress();
exports.general_dao = async function(sql,name) {
    let myQuery = {
        //sql:"SELECT count(*) FROM admissions",
        sql:sql,
        db:process.env.athena_db
    };
    try {
        console.log("enter",new Date().toLocaleTimeString());
        console.time(name);
        let results = await athenaExpress.query(myQuery);
        console.timeEnd(name);
        return results;
    } catch (error) {
        console.log(error);
    }
};
