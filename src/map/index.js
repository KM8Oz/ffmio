import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import MapChart from "./components/MapChart";
import DataTable from './components/table'
import {
    Link,
    useRouteMatch,
} from "react-router-dom";
export default Map;
function Map(props) {
    const [content, setContent] = useState({});
    const [rows, setRows] = useState([]);
    const [fisheries, setFisheries] = useState();
    const [open, setOpen] = useState(false);
    return (
        <div>
            <MapChart setTooltipContent={setContent} setRows={setRows} setOpen={setOpen} fisheries={fisheries}/>
            { content === "" ||  <ReactTooltip place="bottom" type="light" effect="float" style={{ display: 'inline',padding:'none',alignItems:'center'
        ,justifyContent:'left'
        }}>
             <ul >
                    <li><kbd>CONTINENT:</kbd>{content.CONTINENT}</li>
                    <li><kbd>FORMAL_EN:</kbd>{content.FORMAL_EN}</li>
                    <li><kbd> GDP_MD_EST:</kbd>{content.GDP_MD_EST}</li>
                    <li><kbd>GDP_YEAR:</kbd>{content.GDP_YEAR}</li>
                    <li><kbd>ISO_A2:</kbd>{content.ISO_A2}</li>
                    <li><kbd>ISO_A3:</kbd>{content.ISO_A3}</li>
                    <li><kbd>NAME:</kbd>{content.NAME}</li>
                    <li><kbd>NAME_LONG:</kbd>{content.NAME_LONG}</li>
                    <li><kbd>POP_EST:</kbd>{content.POP_EST}</li>
                    <li><kbd>POP_RANK:</kbd>{content.POP_RANK}</li>
                    <li><kbd>POP_YEAR:</kbd>{content.POP_YEAR}</li>
                    <li><kbd>REGION_UN:</kbd>{content.REGION_UN}</li>
                    <li> <kbd>SUBREGION:</kbd>{content.SUBREGION}</li>
                </ul>
            </ReactTooltip>}
            <DataTable rows={rows} setFisheries={setFisheries} setOpen={setOpen} open={open}/>
        </div>
    );
}

document.oncontextmenu = function(e){
//  var evt = new Object({keyCode:93});
 stopEvent(e);
}
function stopEvent(event){
 if(event.preventDefault != undefined)
  event.preventDefault();
 if(event.stopPropagation != undefined)
  event.stopPropagation();
}
