// Setup
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetching the data
let selectdata = d3.select('#selDataset');
let datadisplay = d3.select('#sample-metadata');
d3.json(url).then(function(data){

    // Creating the drop down menu
    let names = data.names;
    selectdata.selectAll('option')
        .data(names)
        .enter()
        .append('option')
        .text(function(d){return d;});

    // Displaying the metadata 
    function init(){
        demodata = data['names'][0];

        let demographicinfo = data.metadata.filter(function(meta){return meta.id === Number(demodata);});

        datadisplay.html("<p>ID: "+demographicinfo[0]['id']
                    + "<p>ETHNICITY: "+demographicinfo[0]['ethnicity']
                    + "<p>GENDER: "+demographicinfo[0]['gender']
                    + "<p>AGE: "+demographicinfo[0]['age']
                    + "<p>LOCATION: "+demographicinfo[0]['location']
                    + "<p>BBTYPE: "+demographicinfo[0]['bbtype']
                    + "<p>WFREQ: "+demographicinfo[0]['wfreq']
                    );

        let graphinfo = data.samples.filter(function(samp){return samp.id === demodata;});

        // Creating horizontal bar graph
        let barvalues = [];
        let barlabels = [];
        let barhover = [];

        for (i=0; i<10; i++){
            barvalues.push(graphinfo[0]["sample_values"][i]);
            barlabels.push("OTU "+graphinfo[0]["otu_ids"][i]);
            barhover.push(graphinfo[0]["otu_labels"][i]);
        };

        let bardata = [{
            x: barvalues.reverse(),
            y: barlabels.reverse(),
            type: 'bar',
            orientation: 'h',
            hovertext: barhover.reverse()
        }];

        Plotly.newPlot('bar', bardata);
    
        // Creating a bubble chart
        let bubbledata = [{
            x: graphinfo[0]["otu_ids"],
            y: graphinfo[0]["sample_values"],
            mode: 'markers',
            marker: {
                size: graphinfo[0]["sample_values"],
                color: graphinfo[0]["otu_ids"],
            },
            text: graphinfo[0]["otu_labels"],
            type: 'scatter'
        }];

        Plotly.newPlot('bubble', bubbledata);
    };

    // Drop down menu changes
    selectdata.on("change", function(){
        let selection = this.value;

         let demodata = data.metadata.filter(function(meta){return meta.id === Number(selection);});
    
        datadisplay.html("<p>ID: "+demodata[0]['id']
                    + "<p>ETHNICITY: "+demodata[0]['ethnicity']
                    + "<p>GENDER: "+demodata[0]['gender']
                    + "<p>AGE: "+demodata[0]['age']
                    + "<p>LOCATION: "+demodata[0]['location']
                    + "<p>BBTYPE: "+demodata[0]['bbtype']
                    + "<p>WFREQ: "+demodata[0]['wfreq']
                    );
    
        let graphinfo = data.samples.filter(function(samp){return samp.id === selection;});

        // Creating bar chart
        let barvalues = [];
        let barlabels = [];
        let barhover = [];

        for (i=0; i<10; i++){
            barvalues.push(graphinfo[0]["sample_values"][i]);
            barlabels.push("OTU "+graphinfo[0]["otu_ids"][i]);
            barhover.push(graphinfo[0]["otu_labels"][i]);
        };

        let bardata = [{
            x: barvalues.reverse(),
            y: barlabels.reverse(),
            type: 'bar',
            orientation: 'h',
            hovertext: barhover.reverse()
        }];

        Plotly.newPlot('bar', bardata);

        // Creating bubble chart
        let bubbledata = [{
            x: graphinfo[0]["otu_ids"],
            y: graphinfo[0]["sample_values"],
            mode: 'markers',
            marker: {
                size: graphinfo[0]["sample_values"],
                color: graphinfo[0]["otu_ids"],
            },
            text: graphinfo[0]["otu_labels"],
            type: 'scatter'
        }];

        Plotly.newPlot('bubble', bubbledata);
 
    }); 
    init();
});