var admission = require("../dao/admission_dao");

describe('admission table',function() {
    describe('count', function() {
        it('count should be', async function() {
            const results = await admission.count();
            console.log("count test result is:",results.Items[0]._col0);
        });
    });

});
