import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import MapChart from "./components/MapChart";
import DataTable from './components/table'
import {
    Link,
    useRouteMatch,
} from "react-router-dom";
import { Modal, Button, Grid, Row, Col } from 'rsuite'
export default Map;
function Map(props) {
    const [content, setContent] = useState({});
    const [rows, setRows] = useState([]);
    const [fisheries, setFisheries] = useState();
    const [open, setOpen] = useState(false);
    const Tables = () => (
        <DataTable rows={rows} setFisheries={setFisheries} setOpen={setOpen} open={open} />
    )

    return (
        <div>
            <MapChart setTooltipContent={setContent} table={Tables} setRows={setRows} setOpen={setOpen} fisheries={fisheries} />
            {!content.db || <ReactTooltip place="bottom" type="light" effect="float" style={{
                display: 'inline', padding: 'none', alignItems: 'center'
                , justifyContent: 'left'
            }}>
                <ul >
                    <li><kbd>CONTINENT:</kbd>{content.db.CONTINENT}</li>
                    <li><kbd>FORMAL_EN:</kbd>{content.db.FORMAL_EN}</li>
                    <li><kbd> GDP_MD_EST:</kbd>{content.db.GDP_MD_EST}</li>
                    <li><kbd>GDP_YEAR:</kbd>{content.db.GDP_YEAR}</li>
                    <li><kbd>ISO_A2:</kbd>{content.db.ISO_A2}</li>
                    <li><kbd>ISO_A3:</kbd>{content.db.ISO_A3}</li>
                    <li><kbd>NAME:</kbd>{content.db.NAME}</li>
                    <li><kbd>NAME_LONG:</kbd>{content.db.NAME_LONG}</li>
                    <li><kbd>POP_EST:</kbd>{content.db.POP_EST}</li>
                    <li><kbd>POP_RANK:</kbd>{content.db.POP_RANK}</li>
                    <li><kbd>POP_YEAR:</kbd>{content.db.POP_YEAR}</li>
                    <li><kbd>REGION_UN:</kbd>{content.db.REGION_UN}</li>
                    <li> <kbd>SUBREGION:</kbd>{content.db.SUBREGION}</li>
                </ul>
            </ReactTooltip>
            }
            <Modal show={open} backdrop={false} onHide={() => setOpen(false)} style={{opacity:0.8, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <Modal.Header>
                    <Modal.Title style={{ textAlign: 'center' }}>ПРОМЫСИЛ</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflow: 'hidden', scrollBehavior: 'unset' }}>
                    <Tables />
                </Modal.Body>
                {/* <Modal.Footer >
                    <Grid fluid style={{ paddingTop: '1em' }}>
                        <Row className="show-grid">
                            <Col xs={6} xsPull={1}>
                                <Button onClick={() => setOpen(false)} color='green' >
                                    покажи
                        </Button>   
                            </Col>
                            <Col xs={6} xsPush={12}>
                                <Button onClick={() => appearance="subtle" >
                                    Отмена
                        </Button>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Footer> */}
            </Modal>
        </div>
    );
}

document.oncontextmenu = function (e) {
    //  var evt = new Object({keyCode:93});
    stopEvent(e);
}
function stopEvent(event) {
    if (event.preventDefault != undefined)
        event.preventDefault();
    if (event.stopPropagation != undefined)
        event.stopPropagation();
}
