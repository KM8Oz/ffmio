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
    return (
        <div>
            <MapChart setTooltipContent={setContent} setRows={setRows}/>
            <ReactTooltip>
                {content.text}
            </ReactTooltip>
            <DataTable rows={rows} />
        </div>
    );
}