//Create Startup Function
function init() {

}

//Create Funtion to Fill Dropdown
function fillDropdown(idsList) {
    let dropDown = d3.select("#selDataset");
    
    idsList.forEach(id => {
        dropDown.append('option').text(id).property('value', id);
    })
}

function optionChanged(){
    
    let currentID = d3.select("#selDataset").property("value")
    let pannelBody = d3.select("#sample-metadata")
    
    //Clear Demographics Info Pannel
    pannelBody.html("")
    let unorderedList = pannelBody.append("ul")

    //Grab Metadata for Current Subject
    //let currentSubject = metadata.filter(function(subject) {if (subject.id = currentID) {return subject}})
    

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
            
            unorderedList.append("p").text(`ID: ${curID}`)
            unorderedList.append("p").text(`Ethnicity: ${curEth}`)
            unorderedList.append("p").text(`Gender: ${curGend}`)
            unorderedList.append("p").text(`Age: ${curAge}`)
            unorderedList.append("p").text(`Location: ${curLoc}`)
            unorderedList.append("p").text(`BBType: ${curBBType}`)
            unorderedList.append("p").text(`WFreq: ${curWFreq}`)
        }
    })

    //Create Bar Chart
    samples.forEach(sample => {
        if (sample.id == currentID) {
            let sampleOTUs= sample.otu_ids.map(function(otuID) {
                newOTUId=`OTU ${otuID}`;
                return newOTUId
            })
        
            let otuTrace = [{
                 x: sampleOTUs,
                 y: sample.sample_values,
                 name: sample.otu_labels,
                type: 'bar'
                }];
            
                let otuLayout = {
                    title: "Prevalence of Operational Taxonomic Units",
                }
            Plotly.newPlot("bar", otuTrace, otuLayout);     
        }
    })

    //Create Bubble Chart
    samples.forEach(sample => {
        if (sample.id == currentID) {
            
            let sampleOTUs= sample.otu_ids.map(function(otuID) {
                newOTUId=`OTU ${otuID}`;
                return newOTUId
            })
        
            let otuTrace2 = [{
                 x: sample.otu_ids,
                 y: sample.sample_values,
                 text: sample.otu_ids,
                 mode: 'markers',
                 marker: {
                    color: ["red", "green", "blue", "purple", "grey", "black"],
                    size: sample.sample_values,
                    sizeref: 2
                 }
                }];
            
                let otuLayout2 = {
                    title: "Prevalence of Operational Taxonomic Units",
                    xaxis: {
                        title:"OTU ID"
                    }
                };

            Plotly.newPlot("bubble", otuTrace2, otuLayout2);     
        }
    })
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




//Use D3 to read in samples.json

const samplesDataUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(samplesDataUrl).then(function(data){
    testSubjIDs = data.names;
    metadata = data.metadata;
    samples =data.samples;

    optionChanged()
    fillDropdown(testSubjIDs);
    console.log ("Complete");
});

init();

