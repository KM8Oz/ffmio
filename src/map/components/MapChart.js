import React, { memo, useState } from "react";
import { geoPath, geoOrthographic } from "d3-geo"

import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  Annotation,
  Graticule,
  Sphere  
} from "react-simple-maps";
import { PatternLines } from "@vx/pattern";
import { Alert } from 'rsuite'
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
  return response
}
async function getfish(name = '') {
  // Default options are marked with *
  console.log(name);
  const response = await fetch(`https://fishbase.ropensci.org/species?limit=10&FBname=${name}&fields=image,BodyShapeI,MainCatchingMethod,Weight,AnaCat,DemersPelag,Fresh,Saltwater,Author,UsedforAquaculture,Comments,FBname,Species,Genus,Importance,PriceCateg,PriceReliability,Length,Vulnerability,Subfamily`)
    .then(function (response) {
      return response.json();
    })

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
function generateCircle(deg) {
  if (!deg) return [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]];
  return new Array(361).fill(1).map((d, i) => {
    return [-180 + i, deg];
  });
}
const getlines = (geos) => {
  console.log('geos:', geos);
  return (
    <Line
      // from={[2.3522, 48.8566]}
      // to={[-74.006, 40.7128]}
      coordinates={geos.line}
      stroke="yellow"
      fill='yellow'
      style={{ zIndex: 'inherit' }}
      fillRule='evenodd'
       fillOpacity='0.8'
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

const MapChart = ({ setTooltipContent, setRows, fisheries, setOpen, table }) => {
  const [Aria, setAria] = useState()
  const [fisherie, setFisherie] = useState()
  const [typographies, setTypographies] = useState()
  const [Annots, setAnnots] = useState()
  const [fname , setFname] = useState()
  const [Fish, setFish] = useState()
  const [sphere,setSphere] = useState({
    center:[0,0],
    isPressed:false,
    mouseX:null,
    mouseY:null,
    scale: 400 , 
    rotate:[0,0,0],
    center:[0,0],
  })
  const handleMouseDown=({ pageX, pageY })=>{
    setSphere({...sphere,
      isPressed: true,
      mouseX: pageX,
      mouseY: pageY,
    })
  }
  const handleMouseMove=({ pageX, pageY })=>{
    if (!sphere.isPressed) return
    const differenceX = sphere.mouseX - pageX
    const differenceY = sphere.mouseY - pageY
    setSphere({...sphere,
      rotate: [
        sphere.rotate[0] - differenceX / 2,
        sphere.rotate[1] + differenceY / 2,
        0,
      ],
      mouseX: pageX,
      mouseY: pageY,
    })
  }
  const projection = ()=>{
    return geoOrthographic()
      .translate([ 800 / 2, 800 / 2 ])
      .rotate(sphere.rotate)
      .clipAngle(90)
      .scale(200)
  }
  const handleMouseUp=({ pageX, pageY })=>{
    setSphere({...sphere,
      isPressed: false,
    })
  }
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
      Alert.info('прости! никаких графических данных для этого промысла!')
      return []
    }
  }
 const asynceds = async function(a,b){
  return await a(b)
 } 
  if (JSON.stringify(fisheries) !== fisherie) {
    setFisherie(JSON.stringify(fisheries))
    let nm = fisheries.fishery_name.split(',')[0]
    let name = nm.substring(0, nm.length - 1)
    
    if(name !== fname){
      setFname(name)
      asynceds(getfish,name).then((res)=>{
        console.log(res);
        setFish(res)
      })
      // setFish(getfish(name))
      //console.log(getfish(fisheries.fishery_name.replaceAll(' ','').split(',')[0]));
  
      if (fisheries.map_info) {
        togeoJSON(proxy(fisheries.map_info)).then(res => {
          // setTypographies(getMarker(res.features[1].geometry.coordinates[0]));
          const geosg = coordinates(res)
          setTypographies(getlines(geosg));
          setAnnots(getAnot(geosg))
          //console.log(getMarker(res.features[1].geometry.coordinates[0]));
        })
      } else {
        Alert.info('прости! никаких графических данных для этого промысла!')
  
      } 
    }
   

  }
  return (
    <>
       <ComposableMap data-tip="" projection="geoEqualEarth" projectionConfig={sphere}
        > 
        <ZoomableGroup 
        center={sphere.center} 
        //  translateExtent={[[Infinity, Infinity], [Infinity, Infinity]]}
        //  onMouseDown={handleMouseDown}
        //  onMouseMove={handleMouseMove}
        //  onMouseUp={handleMouseUp}  
        //  onMouseLeave={handleMouseUp} 
        >
        <Graticule stroke="#DDD" strokeWidth={0.3} />
    
          {typographies}
        
          <Geographies geography={geoUrl} 
          onDrag={(evt)=>{console.log(evt);}}
       
          >

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
                    setTooltipContent({db:{
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
                      SUBREGION: SUBREGION},
                      types:'countries'
                    })
                  }
                  }
                  onMouseLeave={() => {
                    setTooltipContent({db:null,types:'countries'});
                  }}
                  onClick={
                    () => {
                      const { NAME, POP_EST } = geo.properties;
                      getAllFisheriesBycountry(NAME).then(res => {
                        setTooltipContent({db:null,types:'fishries'});
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
          <Line coordinates={generateCircle(0)} stroke="#F53" strokeWidth={0.3} />
      <Line
        coordinates={generateCircle(23)}
        stroke="#776865"
        strokeWidth={0.3}
        strokeDasharray={[5, 5]}
      />
      <Line
        coordinates={generateCircle(-24)}
        stroke="#776865"
        strokeWidth={0.3}
        strokeDasharray={[5, 5]}
      />
          {Annots}
        </ZoomableGroup>
       </ComposableMap>
    </>
  );
};

export default memo(MapChart);
