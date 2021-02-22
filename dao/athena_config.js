"use strict";
const AthenaExpress = require("athena-express");
const aws = require("aws-sdk");
const awsCredentials = {
    region: "",
    accessKeyId: "",
    secretAccessKey: ""
};
aws.config.update(awsCredentials);

const athenaExpressConfig = {
    aws,
    s3: "",
    getStats: true
};
export const athenaExpress = new AthenaExpress(athenaExpressConfig);
