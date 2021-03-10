'use strict';

var solr_node = require("solr-node");

var client = new solr_node({
    host:'127.0.0.1',
    port:'8983',
    core:'social_work',
    protocol: 'http'
});

require('log4js').getLogger('solr-node').level = 'DEBUG';

exports.basic_search_result = async function(keyword) {
    var strQuery = client.query().q({text:'*'+keyword+'*'}).addParams({
        wt:'json',
        indent:true
    });
    try {
        const result = await client.search(strQuery);
        console.log("searching...");
        return result;
    } catch (e) {
        console.error(e);
        return null;
    }

};

exports.promise = async function(keyword) {

};
