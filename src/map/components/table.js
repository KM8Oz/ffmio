import * as React from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Rnd } from 'react-rnd';
// import 'rsuite-table/dist/css/rsuite-table.css'



const ImageCell = ({ rowData, dataKey, ...rest }) => (
  <Cell {...rest}>
    <img src={rowData[dataKey]} width="50" />
  </Cell>
);

const DataTable = ({rows}) => {
  console.log(rows);
  return(<>
   <Rnd 
    default={{
        x: 0,
        y: 0,
        width: 400,
        height:300
       }}
         >
  <Table data={rows} wordWrap
   style={{fontSize:'.6em'}}
   height={300} 
  >
    <Column width={100}  resizable align={'center'} 
         style={{padding:'unset',margin:'unset',width:'200px',maxWidth:'100%'  ,display: 'flex',
         alignItems: 'center',
         justifyContent: 'center'}} >
      <HeaderCell>код(fao.org)</HeaderCell>
      <Cell dataKey="fishery_id"  />
    </Column>

    <Column width={200} align={'center'} 
     style={{padding:'unset',margin:'unset',width:'200px',maxWidth:'100%'  ,display: 'flex',
     alignItems: 'center',
     justifyContent: 'center'}}
    resizable>
      <HeaderCell>промысла</HeaderCell>
      <Cell dataKey="fishery_name"   />
    </Column>

    <Column width={100} align={'center'}   resizable
         style={{padding:'unset',margin:'unset',width:'200px',maxWidth:'100%'  ,display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'}}>
      <HeaderCell>запас</HeaderCell>
      <Cell dataKey='exploiting_stocks' />
    </Column>

    {/* <Column width={100} resizable>
      <HeaderCell>map_info</HeaderCell>
      <ImageCell dataKey="map_info" />
    </Column> */}
  </Table>
  </Rnd>
  </>)
};
export default DataTable;