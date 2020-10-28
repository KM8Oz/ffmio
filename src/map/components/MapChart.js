import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  Annotation
} from "react-simple-maps";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//import fs from 'fs';
// import {DOMParser}from 'xmldom';
import { kml } from '@tmcw/togeojson'
var parser = new DOMParser();
// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
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
async function getfish(name = '') {
  // Default options are marked with *
  const response = await fetch(`https://fishbase.ropensci.org/species?limit=10&FBname=${name}&fields=image,BodyShapeI,MainCatchingMethod,Weight,AnaCat,DemersPelag,Fresh,Saltwater,Author,UsedforAquaculture,Comments,FBname,Species,Genus,Importance,PriceCateg,PriceReliability,Length,Vulnerability,Subfamily`)
    .then(function (response) {
      return response.json();
    })

  //  return new DOMParser().parseFromString(response, 'text/xml') // parses JSON response into native JavaScript objects
  return response
}
function proxy(url) {
  const res = 'https://cors-anywhere.herokuapp.com/' + url;
  if (!url) { }
  return res;
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
const getMarker = (geos) => {
  return geos.map((geo, index) => (
    <Marker coordinates={[geo[0], geo[1]]} key={index}>
      <circle r={.4} fill="green" />
    </Marker>))

}
const getlines = (geos) => {
  console.log('geos:', geos);
  return (
    <Line
      // from={[2.3522, 48.8566]}
      // to={[-74.006, 40.7128]}
      coordinates={geos.line}
      stroke="blue"
      fill='blue'
      // children={}
      style={{ zIndex: 'inherit' }}
      fillRule='evenodd'
      fillOpacity='0.3'
      strokeWidth={0.1}
      strokeLinecap="round"
    />
  )
}
const getAnot = (geos) => {
  return (<Annotation
subject={geos.point}
dx={-90}
dy={-30}
connectorProps={{
  stroke: "#444",
  strokeWidth: 0.2,
  strokeLinecap: "round"
}}
>

 <text x="-8" textAnchor="end" style={{fontSize: '6px'}} alignmentBaseline="middle" fill="#444">
  {
  (geos.props?.name||geos.props?.description).replace('.kml','') 
  }
</text>
</Annotation >)
}
const MapChart = ({ setTooltipContent, setRows, fisheries, setOpen }) => {
  const [Aria, setAria] = useState()
  const [fisherie, setFisherie] = useState()
  const [typographies, setTypographies] = useState()
  const [Annots, setAnnots] = useState()
  const [opensnak, setOpensnak] = useState(false);
  const [Fish, setFish] = useState()
  // const [marker,setMarker] = useState()
  // useEffect(()=>{
  // },[fisherie])
  const coordinates = (geos) => {
    // console.log(geos);
    const data1 = geos.features.filter(s => s.geometry.type === "Polygon")[0]?.geometry.coordinates[0]
    const data2 = geos.features.filter(s => s.geometry.type === "Point")[0]?.geometry.coordinates
    const data3 = geos.features.filter(s => s.geometry.type === "Point")[0]?.properties
    // console.log(data3);
    if (geos.features) {
      return { line: data1, point: [data2[0], data2[1]], props: data3 }
    } else {
      setOpensnak(true)
      return []
    }
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnak(false);
  };
  if (JSON.stringify(fisheries) !== JSON.stringify(fisherie)) {
    setFisherie(fisheries)
    let nm = fisheries.fishery_name.split(',')[0]
    setFish(getfish(nm.substring(0, nm.length - 1)))
    // console.log(getfish(fisheries.fishery_name.replaceAll(' ','').split(',')[0]));

    if (fisheries.map_info) {
      togeoJSON(proxy(fisheries.map_info)).then(res => {
        // setTypographies(getMarker(res.features[1].geometry.coordinates[0]));
        const geosg = coordinates(res)
        setTypographies(getlines(geosg));
        setAnnots(getAnot(geosg))
        //console.log(getMarker(res.features[1].geometry.coordinates[0]));
      })
    } else {
      setOpensnak(true)
    }

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
                        setOpen(true)
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
          {typographies}
          {Annots}
        </ZoomableGroup>
      </ComposableMap>
      <Snackbar open={opensnak} color={'green'} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={6000} onClose={handleClose} message='прости! никаких графических данных для этого промысла!'>
      </Snackbar>
    </>
  );
};

export default memo(MapChart);