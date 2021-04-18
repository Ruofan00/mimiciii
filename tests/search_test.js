var solr_node = require("../solr/search");

describe('solr',function () {

    describe('basic search', function () {
        it('search result should be ', async function () {
            const results = await solr_node.basic_search_result("O2");
            console.log(results.docs);
        });
    });

    describe('advanced search',function () {
        it('syn search should be', async function () {
            const results = await solr_node.syn_search("headache");
            console.log(results);
        });

        it('icd9 search should be', async function() {
            const results = await solr_node.icd9_search("headache");
            //console.log(results);
        });

        it('icd10 search should be',async function() {
            const results = await solr_node.icd10_search("Headache");
        })
    });
});
