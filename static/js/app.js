//Create Startup Function
function init() {

}

//Create Funtion to Fill Dropdown
function fillDropdown(idsList) {
    let dropDown=d3.select("#selDataset");
    idsList.forEach(id => {
        dropDown.append('option').text(id).property('value', id);
    })
}

function optionChanged(){
    let currentID = d3.select("#selDataset").property("value")
    console.log(`Current ID: ${currentID}`)

    let pannelBody = d3.select("#sample-metadata")
    
    //Fill Demographics
    metadata.forEach(subject => { 
        if (subject.id == currentID) {
            
            curID = subject.id;
            curEth = subject.ethnicity;
            curGend = subject.gender;
            curAge = subject.age;
            curLoc = subject.location;
            curBBType = subject.bbtype;
            curWFreq = subject.wfreq;
            
            console.log(subject);
            console.log(`id: ${curID}`);
            console.log(`ethnicity: ${curEth}`);
            console.log(`gender: ${curGend}`);
            console.log(`age: ${curAge}`);
            console.log(`location: ${curLoc}`);
            console.log(`bbtype: ${curBBType}`);
            console.log(`wfreq: ${curWFreq}`);
        }
    })

    //Create Bar Chart
    samples.forEach(sample => {
        if (sample.id == currentID) {
            let otuTrace = {
                 x: sample.sample_values,
                 y: sample.otu_ids,
                 name: sample.otu_labels,
                type: 'bar'
                };
            
                let otuLayout = {
                    title: "Prevalence of Operational Taxonomic Units"
                }

            Plotly.newPlot("plot", [otuTrace], {layout});     
        }
    })
}

//Create Function to Fill Data Bar
function fillDemographics(subjectsDict) {
    let pannelBody = d3.select("#sample-metadata");

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
    samples=data.samples

    optionChanged()
    fillDropdown(testSubjIDs);
    console.log ("Complete");
});

init();

