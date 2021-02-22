"use strict";
const AthenaExpress = require("athena-express");
const aws = require("aws-sdk");
const awsCredentials = {
    region: "us-east-1",
    accessKeyId: "AKIAISB3QBCR7RIK3GTA",
    secretAccessKey: "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"
};
aws.config.update(awsCredentials);

const athenaExpressConfig = {
    aws,
    s3: "s3://elasticbeanstalk-us-east-1-515342084668/",
    getStats: true
};
const athenaExpress = new AthenaExpress(athenaExpressConfig);
//const sqls = require("./sql/admission_sql");
/* show the total number of admission table*/
async function showCount() {
    let myQuery = {
        sql:"SELECT count(*) From admissions",
        db:"mimiciii"
    };
    try {
        let results = await athenaExpress.query(myQuery);
        console.log("athena result:",results);
    } catch (error) {
        console.log(error);
    }
}
module.exports = showCount();

// (async () => {
//     let myQuery = {
//         sql:"",
//         db:""
//     };
//     try {
//         let results = await athenaExpress.query(myQuery);
//         console.log(results);
//     } catch (error) {
//         console.log(error);
//     }
// })();


