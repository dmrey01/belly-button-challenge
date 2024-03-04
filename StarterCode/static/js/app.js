//set up URL "
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise:", dataPromise);

//Fetch the Json data and console log it
d3.json(url).then (function(data) {
    console.log(data);

// call the init function and pass the data and extract the IDs form the data
    init(data);
    //metaData(demographicInfo);
});

function init(data) {
    let dropdown = d3.select("#selDataset");

    //Populate the dropdowns with the IDs
    let sampleIDs = data.names
    console.log(sampleIDs);
    sampleIDs.forEach(function (id) {
        dropdown.append("option").text(id).property("value", id);
    })
    let selection = sampleIDs[0];
    barChart(selection, metaData(selection))
};

//let dataInfo = sampleIDs[0];
    //console.log(dataInfo);
        
//barChart(sampleIDs[0], data.samples);
//bubbleChart(sampleIDs[0], data.samples);
//metadata(metaData[0], data.samples)

        
//barChart(sampleIDs[0]);
//bubbleChart(sampleIDs[0]);
//metadata(metaData[0])

function optionChange(value) {
    const sampleIDs = samples.find((item) => item.id === value);
    const demographicInformation = data.metadata.find((item) => item.id == value);
}

function metaData(demographicInfo) {
    let demographicInfoDiv = d3.select("#sample-metadata");
    demographicInfoDiv.html("");
    for (const [key, value] of Object.entries(demographicInfo)) {
        demographicInfoDiv.append("p").text(`${key}: ${value}`);
    }
}

function barChart(sampleIDs, metaData) {
    let sampleDataInfo = sampleData.find(sample => sample.id === sampleId);
    let sample_value = sampleDataInfo.sample_values.slice(0, 10);
    let otu_ids = sampleDataInfo.otu_ids.slice(0, 10);
    let otu_labels = sampleDataInfo.otu_labels.slice(0, 10)
    console.log(sample_values);
    console.log(otu_ids);
    console.log(otu_labels);

    let barTrace = [{
        x: sample_value.reverse(),
        //y: otu_ids.map(item => `OTU ${item}`).reverse,
        //y: otu_ids:OTU.reverse(),
        label: otu_labels.reverse(),
        type: `bar`,
        orientation: `h`,
    }
];
    //let data = [barTrace];

    let layout = {
        title: "Top Ten OTU",
        font: "New York Times"
    };
    Plotly.newPlot("bar", barTrace, layout)
}
init();





