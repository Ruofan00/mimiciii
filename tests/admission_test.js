var admission = require("../dao/admission_dao");

describe('admission table',function() {
    describe('count', function() {
        it('count should be', async function() {
            const results = await admission.count();
            console.log("count test result is:",results.Items[0]._col0);
        });
    });
    describe('religion',function() {
       it('religion result should be', async function() {
            const results = await admission.time_death();
            console.log("religion test result is:",results);
       });
    });
    this.timeout(10000);
    describe('search',function() {
        it('icd9',async function() {
            const results = await admission.icd9_results("headache");
        });
    });

});
