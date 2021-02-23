'use strict';
const aws = require("aws-sdk");
const dotenv = require("dotenv");
const AthenaExpress = require("athena-express");
dotenv.config();
//
const athena_db = process.env.athena_db;
exports.athena_db = athena_db;
//
const mongo_db = process.env.mongo_db;
exports.mongo_db = mongo_db;
//
exports.athenaExpress = function() {
    const awsCredentials =  {
        region: process.env.region,
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
    };
    aws.config.update(awsCredentials);
    const athenaExpressConfig = {
        aws,
        s3: process.env.s3,
        getStats: true
    };
    return new AthenaExpress(athenaExpressConfig);
};

