import React, { memo,useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

//import fs from 'fs';
// import {DOMParser}from 'xmldom';
import {kml} from '@tmcw/togeojson'
var parser = new DOMParser();
const geoUrl = "./world-110m.json";
async function togeoJSON(url = '') {
  // Default options are marked with *
  const response = await fetch(url)
  .then(function(response) {
    return response.text();
  })
  .then(function(xml) {
    return kml(new DOMParser().parseFromString(xml, "text/xml"))
  });
//  return new DOMParser().parseFromString(response, 'text/xml') // parses JSON response into native JavaScript objects
return response
}
function proxy(url){
return 'https://cors-anywhere.herokuapp.com/'+url
}
async function getAllFisheriesBycountry(name) {
  // Default options are marked with *
  const response = await fetch('./feshries.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(jsons) {
    return jsons.filter(e=>e.fishery_name.replaceAll(/ /g,'').split('|').indexOf(`${name}`) !== -1)
  });
//  return new DOMParser().parseFromString(response, 'text/xml') // parses JSON response into native JavaScript objects
return response
}
getAllFisheriesBycountry('Morocco').then(res=>{
  console.log(res);
})
togeoJSON(proxy('https://s3.amazonaws.com/fs4.fishsource.org/uploads/map/kml_path/31/US_Scallop.kml')).then(res=>{
  console.log(res)
})

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const MapChart = ({ setTooltipContent, setRows}) => {
  const [Aria,setAria] =  useState()
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    setTooltipContent({text:`${NAME} — ${rounded(POP_EST)}`});
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  onClick={
                    () => {
                      const { NAME, POP_EST } = geo.properties;
                      getAllFisheriesBycountry(NAME).then(res=>{
                        var i=0;
                        if (Aria === NAME){
                          setRows([])
                        }
                        setAria(NAME) 
                        setRows(res.map(e=>e={id:i++,...e}));
                      })
                    }
                  }
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);