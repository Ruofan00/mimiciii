Plotly.d3.csv("https://raw.githubusercontent.com/Ruofan00/csv/master/result_sc_c.csv",
    function(data){
        console.log(data);
        var x = [],y=[],term=[]
        for(let i=0;i<data.length;i++) {
            let row = data[i];
            x.push(row['x']);
            y.push(row['y']);
            term.push(row['term']);
        }
        console.log(term);
        var dis_term = {
            x: x,
            y: y,
            mode: 'markers+text',
            type: 'scatter',
            name: 'Team A',
            text: term,
            textposition: 'top center',
            textfont: {
                family:  'Raleway, sans-serif'
            },
            marker: { size: 12 }
        };
        console.log("1");
        var d = [dis_term];

        var layout = {
            xaxis: {
                autorange: true,
                range: [ -20, 20 ]
            },
            yaxis: {
                autorange: true,
                range: [-20, 20]
            },
            legend: {
                y: 0.5,
                yref: 'paper',
                font: {
                    family: 'Arial, sans-serif',
                    size: 20,
                    color: 'grey',
                }
            },
            title:'Chemical terms for Social Work'
        };

        Plotly.newPlot('c_chart', d, layout);
    } );



