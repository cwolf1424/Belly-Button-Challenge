//Create Startup Function
function init() {
    let data = [{
        x:[],
        y:[] 
    }];
    //Plotly.newPlot("plot", data);
}

//Create Funtion to Fill Dropdown
function fillDropdown(list) {
    let dropDown=d3.select("#selDataset")
    list.forEach(id => {
        dropDown.append('option').text(id).property('value', id)
    })
}

//Create Function to Do Bar Graph


//Create Funciton to Do Bubble Chart


//Use D3 to read in samples.json

const samplesDataUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(samplesDataUrl).then (function(data){
    testSubjIDs=data.names
    fillDropdown(testSubjIDs)
    console.log (data)
});

//init();

