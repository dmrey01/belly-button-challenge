//set up URL "
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise:", dataPromise);

//Fetch the Json data and console log it
d3.json(url).then(function (data) {
    console.log(data);
    
    init(data);
});

function init() {
    d3.json(url).then(function (data) {
        console.log(data);
        
        let dropdown = d3.select("#selDataset");
        
        let sampleIDs = data.names
        console.log(sampleIDs);
        sampleIDs.forEach(function (id) {
            dropdown.append("option").text(id).property("value", id);
        });

        let selection = sampleIDs[0];
        barChart(selection, data);
        metaData(selection, data.metadata);
        optionChanged(selection, data.samples, data.metadata);
    })
}   

function optionChanged(value) {
    console.log(value);
    barChart(value);
    metaData(value);
}

function metaData(demographicInfo) {
    d3.json(url).then(function (data) {
        console.log(metaData);
        let demographicInfoDiv = d3.select("#sample-metadata");
        demographicInfoDiv.html("");
        for (const [key, value] of Object.entries(demographicInfo)) {
            demographicInfoDiv.append("p").text(`${key}: ${value}`);
        }
    });
}

function barChart(selection, data) {
    d3.json(url).then(function (data) {
        console.log(data);
    let sampleDataInfo = data.samples.find(sample => sample.id === selection);
    let sample_value = sampleDataInfo.sample_values.slice(0, 10);
    let otu_ids = sampleDataInfo.otu_ids.slice(0, 10);
    let otu_labels = sampleDataInfo.otu_labels.slice(0, 10);


    let trace1 = [{
        x: sample_value.reverse(),
        y: otu_ids.map(item => `OTU ${item}`).reverse(),
        text: otu_labels.reverse(),
        type: 'bar',
        orientation: 'h'
    }];

    let layout = {
        title: 'Bacteria Count ',
        xaxis: { title: 'Sample Values' },
        yaxis: { title: 'OTU IDs' },
        width: 600,
        height: 400
    };

    Plotly.newPlot('bar', trace1, layout);
    
    });
};

//bubble chart
//function bubbleChart(selection, data) {
    //d3.json(url).then(function (data) {
        //console.log("Generating bar chart...");
        //let sampleDataInfo = data.samples.find(sample => sample.id === selection);
       // let sample_value = sampleDataInfo.sample_values.slice(0, 10);
       // let otu_ids = sampleDataInfo.otu_ids.slice(0, 10);
       // let otu_labels = sampleDataInfo.otu_labels.slice(0, 10);
init();





