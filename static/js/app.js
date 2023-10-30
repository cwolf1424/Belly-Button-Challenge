//Create Startup Function
function init() {
    let data = [{
        x:[],
        y:[] 
    }];
    //Plotly.newPlot("plot", data);
}

//Create Funtion to Fill Dropdown
function fillDropdown(ids) {
    let dropDown=d3.select("#selDataset");
    ids.forEach(id => {
        dropDown.append('option').text(id).property('value', id);
    })
}

//Create Function to Fill Data Bar
function fillDemographics(subjects) {
    let currentID = d3.select("#selDataset").property("value")
    console.log (currentID)
    //subjects.forEach(subject => {
    //    if (subject.id == currentID) {
 
    //    } 
    //})
}

//Create Function to Do Bar Graph
function barGraph(xvals,yvals) {
    let trace = {
        x: xvals,
        y: yvals,
        type: 'bar'
    }

    Plotly.newPlot("plot", data);
}

//Create Funciton to Do Bubble Chart


//Use D3 to read in samples.json

const samplesDataUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(samplesDataUrl).then (function(data){
    testSubjIDs=data.names;
    metadata=data.metadata;

    fillDemographics()
    fillDropdown(testSubjIDs);


    console.log (data);
});

//init();

