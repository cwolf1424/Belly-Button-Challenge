
//--------------------------------------
//Funtion to Fill Dropdown Options (Test Subject ID's)
//--------------------------------------
function fillDropdown(idsList) {
    let dropDown = d3.select("#selDataset");
    
    idsList.forEach(id => {
        dropDown.append('option').text(id).property('value', id);
    })
}

//--------------------------------------
//Function to React to Dropdown Change
//--------------------------------------

function optionChanged(){
    
    //Setup Variables for Sections of HTML
    let currentID = d3.select("#selDataset").property("value")
    let pannelBody = d3.select("#sample-metadata")
    let currentSubject = metadata.filter(function(item) {if (item.id == currentID) {return item}})
    
    //Clear Demographics Info Pannel
    pannelBody.html("")
    let unorderedList = pannelBody.append("ul")

    //Grab Metadata for Current Subject
    let curID = currentSubject[0].id;
    let curEth = currentSubject[0].ethnicity;
    let curGend = currentSubject[0].gender;
    let curAge = currentSubject[0].age;
    let curLoc = currentSubject[0].location;
    let curBBType = currentSubject[0].bbtype;
    let curWFreq = currentSubject[0].wfreq;

    //Log That Metadata to Info Pannel
    unorderedList.append("p").text(`ID: ${curID}`)
    unorderedList.append("p").text(`Ethnicity: ${curEth}`)
    unorderedList.append("p").text(`Gender: ${curGend}`)
    unorderedList.append("p").text(`Age: ${curAge}`)
    unorderedList.append("p").text(`Location: ${curLoc}`)
    unorderedList.append("p").text(`BBType: ${curBBType}`)
    unorderedList.append("p").text(`WFreq: ${curWFreq}`)

    //Create Bar Chart
    samples.forEach(sample => {
        if (sample.id == currentID) {
            
            //Limit Samples
            let top10Samples = sample.sample_values.slice(0,10);
            let top10OTUIds = sample.otu_ids.slice(0,10);
            
            //Rename Current Sample OTUs
            let renamedTop10OTUIds = top10OTUIds.map(function(otuID) {
                newOTUId=`OTU ${otuID}`;
                return newOTUId
            })
            
            //Trace Bar Plot
            let otuTrace = [{
                 x: renamedTop10OTUIds,
                 y: top10Samples,
                 name: sample.otu_labels,
                type: 'bar'
                }];
            
                let otuLayout = {
                    title: "Prevalence of Operational Taxonomic Units",
                }

            //Plot the Bar Chart in Div "bar"    
            Plotly.newPlot("bar", otuTrace, otuLayout);     
        }
    })

    //Create Bubble Chart
    samples.forEach(sample => {
        if (sample.id == currentID) {
            
            //Limit Samples
            let top10Samples = sample.sample_values.slice(0,10);
            let top10OTUIds = sample.otu_ids.slice(0,10);

            //Rename Current Sample OTUs
            let renamedTop10OTUIds = top10OTUIds.map(function(otuID) {
                newOTUId=`OTU ${otuID}`;
                return newOTUId
           })
        
            let otuTrace2 = [{
                 x: top10OTUIds,
                 y: top10Samples,
                 text: renamedTop10OTUIds,
                 mode: 'markers',
                 marker: {
                    color: ["#000000",
                        "#FF0000",
                        "#00FF00",
                        "#0000FF",
                        "#FFFF00",
                        "#FF00FF",
                        "#00FFFF",
                        "#FFFFCC",
                        "#FF8080",
                        "#CCCCFF"
                    ],
                    size: sample.sample_values,
                    sizeref: 3
                 }
                }];
            
                let otuLayout2 = {
                    title: "Prevalence of Operational Taxonomic Units",
                    xaxis: {
                        title:"OTU ID"
                    }
                };
            
            //Plot the Bubble Chart in Div "bar" 
            Plotly.newPlot("bubble", otuTrace2, otuLayout2);     
        }
    })
}


//--------------------------------------
//Use D3 to read in samples.json
//--------------------------------------

//Set Constant for Data URL
const samplesDataUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Read Samples.json and Run Funtions
d3.json(samplesDataUrl).then(function(data){

    //Set Variables
    testSubjIDs = data.names;
    metadata = data.metadata;
    samples = data.samples;

    fillDropdown(testSubjIDs);
    optionChanged();
});