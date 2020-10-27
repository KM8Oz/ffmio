import React,{useState,useRef,useReducer} from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Rnd } from 'react-rnd';
import { IconButton }  from '@material-ui/core'
import {AddCircle,RemoveCircle} from '@material-ui/icons'
// import 'rsuite-table/dist/css/rsuite-table.css'



const ImageCell = ({ rowData, dataKey, ...rest }) => (
  <Cell {...rest}>
    <img src={rowData[dataKey]} width="50" />
  </Cell>
);
const initialState = {icon: <AddCircle style={{position:'relative'}}/>,status:false};

function reducer(switcher, action) {
  switch (action.type) {
    case 'switch':
      return {icon:switcher.status?<AddCircle style={{position:'relative'}}/>:<RemoveCircle style={{position:'relative'}}/>,status:!switcher.status};
    default:
      throw new Error();
  }
}
//https://fishbase.ropensci.org/species?limit=10&FBname=Atlantic%20mackerel&fields=image,BodyShapeI,MainCatchingMethod,Weight,AnaCat,DemersPelag,Fresh,Saltwater,Author,UsedforAquaculture,Comments,FBname,Species,Genus,Importance,PriceCateg,PriceReliability,Length,Vulnerability,Subfamily
const DataTable = ({rows,setFisheries}) => {
 // console.log(rows);
 const table = useRef(null)
 const [drog,setDrag] = useState(true)
 const [switcher, dispatch] = useReducer(reducer,initialState)
  return(
   <Rnd 
   dragHandleClassName='rs-table-row-header'
    default={{
        x: 0,
        y: 0,
        width: 400,
        height:300
       }}
         >
  <Table ref={table} data={rows.map(e=>e={...e,fishery_name:e.fishery_name.replaceAll('|',',')})} wordWrap
   style={{fontSize:'.6em',width:'100%'}}
  >
    <Column  align={'center'} 
         style={{padding:'unset',margin:'unset',maxWidth:'100%'  ,display: 'flex',
         alignItems: 'center',
         justifyContent: 'center'}} >
      <HeaderCell>код(fao.org)</HeaderCell>
      <Cell dataKey="fishery_id" onClick={(evt)=>{
        console.log(evt.target);
      }} />
    </Column>

    <Column  align={'center'} 
     style={{padding:'unset',margin:'unset',maxWidth:'100%'  ,display: 'flex',
     alignItems: 'center',
     justifyContent: 'center'}}
    >
      <HeaderCell>промысла</HeaderCell>
      <Cell dataKey="fishery_name"   />
    </Column>

    <Column align={'center'} 
         style={{padding:'unset',margin:'unset',maxWidth:'100%'  ,display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'}}>
      <HeaderCell>запас</HeaderCell>
      <Cell dataKey='exploiting_stocks' />
    </Column>

     <Column align={'center'} 
         style={{padding:'unset',margin:'unset' ,display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'}}>
      <HeaderCell>maps</HeaderCell>
      <Cell dataKey="map_info"
      >
           {
           (rowData, rowIndex) => 
            (<IconButton aria-label='add'
            style={{position:'relative',display:'flex',alignItems: 'center',
            justifyContent: 'center'}}
            onClick={()=>{
              switcher.status || (setFisheries(rowData))
              dispatch({type: 'switch'})
            }}>
               {switcher.icon}
             </IconButton>)
          }
      </Cell>
    </Column>
    
  </Table>
  </Rnd>)
};
export default DataTable;