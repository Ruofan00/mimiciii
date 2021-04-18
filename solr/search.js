'use strict';

var solr_node = require("solr-node");
const axios = require('axios');

var client = new solr_node({
    host:'127.0.0.1',
    port:'8983',
    core:'social_work',
    protocol: 'http'
});

require('log4js').getLogger('solr-node').level = 'DEBUG';

exports.basic_search_result = async function(keyword) {
    var strQuery = client.query().q({text:'*'+keyword+'*'},).addParams({
        wt:'json',
        indent:true,
    })
        .start(0)
        .rows(10000);
    try {
        const result = await client.search(strQuery);
        console.log("searching...");
        console.log(result);
        return result;
    } catch (e) {
        console.error(e);
        return null;
    }
};

exports.syn_search = async function(keyword) {
    let result = {};
    let q = '';
    await axios.get('https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?' +
        'terms='+keyword+
        '&ef=primary_name,term_icd9_code,synonyms')
        .then(async function (response) {
           // console.log(response.data);
            let data = response.data;
            //console.log(data[2]['synonyms']);
            let words = data[2]['synonyms'];
            let set = new Set();
            for(let i=0;i<words.length;i++) {
                for(let j=0;j<words[i].length;j++) {
                    set.add(words[i][j]);
                }
            }
            let synonyms = Array.from(set);
            result["syn"] = synonyms;
           // console.log(synonyms);
            for(let i =0;i<synonyms.length;i++) {
                let tmp_query = 'text:'+'"'+synonyms[i]+'"'+', ';
                q+=tmp_query;
                //console.log(synonyms[i]);
            }
            //console.log(result);
        })
        .catch(function (error) {
            console.error(error);
        });
    let syn_result=[];
    let syn_num = 0;
    await axios.get(
        'http://localhost:8983/solr/social_work/select?q='+q
    ).then(async function(response) {
        let data = response.data;
        syn_result = data.response.docs;
        syn_num = data.response.numFound;
        result['syn_result'] = syn_result;
        result['syn_num'] = syn_num;
        //console.log(data);
    }).catch(function (error) {
        console.error(error);
    });
    return result;
};

exports.subjects_search = async function(ids) {

};

exports.icd9_search = async function(keyword) {
    let result={};
    await axios.get('https://clinicaltables.nlm.nih.gov/api/icd9cm_dx/v3/search?' +
        'terms='+keyword+'&sf=code,short_name,long_name' +
        '&df=code,short_name,long_name')
        .then(async function (response) {
            let data = response.data;
            result = {};
            result["num"] = data[0];
            result["icd9"] = data[1];
            result["data"] = data[3];
            console.log("icd9 search get",result["icd9"][0]);
        })
        .catch(function (error) {
            console.error(error);
        });
    return result["icd9"][0];
};

exports.icd10_search = async function(keyword) {
  let result= {};
  await axios.get('https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search' +
      '?terms='+keyword+
      '&sf=name&df=code,name')
      .then(async function(response) {
          let data = response.data;
         // console.log(data);
          result["icd10_code"] = data[1];
          result["name"] = data[3];
          console.log(result);
      })
      .catch(function (error) {
          console.error(error);
  });
  return result;
};
