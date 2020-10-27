import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

//import fs from 'fs';
// import {DOMParser}from 'xmldom';
import { kml } from '@tmcw/togeojson'
var parser = new DOMParser();
const geoUrl = "./world-110m.json";
async function togeoJSON(url = '') {
  // Default options are marked with *
  const response = await fetch(url)
    .then(function (response) {
      return response.text();
    })
    .then(function (xml) {
      return kml(new DOMParser().parseFromString(xml, "text/xml"))
    });
  //  return new DOMParser().parseFromString(response, 'text/xml') // parses JSON response into native JavaScript objects
  return response
}
function proxy(url) {
  return 'https://cors-anywhere.herokuapp.com/' + url
}
async function getAllFisheriesBycountry(name) {
  // Default options are marked with *
  const response = await fetch('./feshries.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (jsons) {
      return jsons.filter(e => e.fishery_name.replaceAll(/ /g, '').split('|').indexOf(`${name}`) !== -1)
    });
  //  return new DOMParser().parseFromString(response, 'text/xml') // parses JSON response into native JavaScript objects
  return response
}
// getAllFisheriesBycountry('Morocco').then(res => {
//   console.log(res);
// })


const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};
const getMarker = (geos)=>{
  return geos.map((geo,index) => (
    <Marker coordinates={[geo[0], geo[1]]} key={index}>
    <circle r={.4} fill="green" />
  </Marker>))
      
      }
const MapChart = ({ setTooltipContent, setRows, fisheries }) => {
  const [Aria, setAria] = useState()
  const [fisherie, setFisherie] = useState()
  const [typographies, setTypographies] = useState()
  // const [marker,setMarker] = useState()
  // useEffect(()=>{
  // },[fisherie])
  if (JSON.stringify(fisheries) !== JSON.stringify(fisherie)) {
    setFisherie(fisheries)
    console.log(fisherie);

    togeoJSON(proxy(fisheries.map_info)).then(res => {
      setTypographies(getMarker(res.features[1].geometry.coordinates[0]));
      //console.log(getMarker(res.features[1].geometry.coordinates[0]));
    })
  }
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              return geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    // console.log(geo.properties);
                    const { ABBREV,
                      CONTINENT,
                      FORMAL_EN,
                      GDP_MD_EST,
                      GDP_YEAR,
                      ISO_A2,
                      ISO_A3,
                      NAME,
                      NAME_LONG,
                      POP_EST,
                      POP_RANK,
                      POP_YEAR,
                      REGION_UN,
                      SUBREGION, } = geo.properties;
                    setTooltipContent({
                      ABBREV: ABBREV,
                      CONTINENT: CONTINENT,
                      FORMAL_EN: FORMAL_EN,
                      GDP_MD_EST: GDP_MD_EST,
                      GDP_YEAR: GDP_YEAR,
                      ISO_A2: ISO_A2,
                      ISO_A3: ISO_A3,
                      NAME: NAME,
                      NAME_LONG: NAME_LONG,
                      POP_EST: POP_EST,
                      POP_RANK: POP_RANK,
                      POP_YEAR: POP_YEAR,
                      REGION_UN: REGION_UN,
                      SUBREGION: SUBREGION
                    })
                  }
                  }
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  onClick={
                    () => {
                      const { NAME, POP_EST } = geo.properties;
                      getAllFisheriesBycountry(NAME).then(res => {
                        var i = 0;
                        if (Aria === NAME) {
                          setRows([])
                        }
                        setAria(NAME)
                        setRows(res.map(e => e = { id: i++, ...e }));
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
                      fill: "#444",
                      outline: "none"
                    }
                  }}
                />

              ))
            }
            }
          
            
          </Geographies>
          {
          typographies
          }
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);