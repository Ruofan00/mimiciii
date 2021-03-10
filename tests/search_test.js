var solr_node = require("../solr/search");

describe('solr',function () {

    describe('basic search', function () {
        it('search result should be ', async function () {
            const results = await solr_node.basic_search_result("O2");
            console.log(results.docs);
        });
    });

    describe('promise',function () {
        it('promise should be', async function () {
            const results = await solr_node.promise("O2");
            console.log(results);
        });
    });
});
