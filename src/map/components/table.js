import React,{useState,useRef,useContext,memo} from 'react';
import { Table, Toggle,Icon } from 'rsuite';
// import { Rnd } from 'react-rnd';
// import { IconButton }  from '@material-ui/core'
//import {AddCircle,RemoveCircle} from '@material-ui/icons'
import { ThemeContext } from '../../settings'
const { Column, HeaderCell, Cell } = Table;

const ImageCell = ({ rowData, dataKey, ...rest }) => (
  <Cell {...rest}>
    <img src={rowData[dataKey]} width="50" />
  </Cell>
);

// const initialState = {icon: <AddCircle style={{position:'relative'}}/>,status:false};

// function reducer(switcher, action) {
//   switch (action.type) {
//     case 'switch':
//       return {icon:switcher.status?<AddCircle style={{position:'relative'}}/>:<RemoveCircle style={{position:'relative'}}/>,status:!switcher.status};
//     default:
//       throw new Error();
//   }
// }
// const Transition = forwardRef(function Transition(props, ref) {
//   return <Slide direction="down" ref={ref} {...props} mountOnEnter unmountOnExit/>;
// });
const DataTable = ({rows,setFisheries,open,setOpen}) => {
  
  const settings =  useContext(ThemeContext) 
 // console.log(rows);
 const table = useRef(null)
 const [drog,setDrag] = useState(true)

const [active,setActive] = useState()
const handleClose = () => {
  setOpen(false);
};
//  const [switcher, dispatch] = useReducer(reducer,initialState)

  return(
  //  <Rnd 
  //  dragAxis={'x'}
  //  dragGrid={[10,20]}
  //  dragHandleClassName='rs-table-row-header'
  //  style={{margin:'10px 0px 0px 0px'}}
  //   default={{...settings,x:0,y:0}}
  //        >
  
  <Table  data={rows.map(e=>e={...e,fishery_name:e.fishery_name.replaceAll('|',',')})} wordWrap
   style={{fontSize:'.6em'}}
   height={settings.Rnd.height}
   width={settings.Rnd.width}
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
            (  
             // console.log(rowData);
          <Icon icon="close" style={{color:'green'}} id={'btn'+rowIndex} onClick={()=>{
              if(rowIndex !== active){
                setFisheries(rowData)
                setActive(rowIndex)
                setOpen(false)
              }else{
                setFisheries(null)
              } 
            }} />
              )
          
          }
      
      </Cell>
    </Column>
    
  </Table>


  )
};
export default memo(DataTable);