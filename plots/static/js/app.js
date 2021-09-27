function loadCharts(id){

    d3.json("samples.json").then((data)=>{

        console.log(data)
        
        let filterData = data.samples.filter(obj => obj.id == id);
        //console.log(filterData)
        let otu_ids = filterData[0].otu_ids;
        let otu_labels = filterData[0].otu_labels;
        let sample_values = filterData[0].sample_values;


        let bar = [{
            type: 'bar',
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.map(otu => "OTU " + otu).slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            orientation: 'h',
            order: 'ascending'
          }];
          
          Plotly.newPlot('bar', bar);


          let trace1 = {
            x: otu_ids,
            y: sample_values,
            text:otu_labels,
            mode: 'markers',
            marker: {
              color: otu_ids,
              size: sample_values
            }
          };
          
          let bubble = [trace1];
          
          let layout = {
            title: 'Belly Button Biodiversity',
            showlegend: false,
            height: 600,
            width: 1000
          };
          
          Plotly.newPlot('bubble', bubble, layout);


          
      let metaData = data.metadata.filter(obj => obj.id == id);
      console.log(metaData) 

      let panel = d3.select("#sample-metadata")
      for (const [key, value] of Object.entries(metaData[0])) {
        panel.append("h5").text(key + ": " + value)
      }
    })


}


d3.json("samples.json").then((data) => {

    let dropdown = d3.select("#selDataset")

    data.names.forEach((id) =>{
        dropdown.append("option").text(id).property("value", id)
    })

    loadCharts(data.names[0])
});

function optionChanged(selectedID){
    console.log(selectedID)
    loadCharts(selectedID)
};