new Def.Autocompleter.Search('keyword', 'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name', {
    tableFormat: true,
    valueCols: [0],
    colHeaders: ['Code','Name']
});
