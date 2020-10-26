import * as React from 'react';
import { XGrid } from '@material-ui/x-grid';
import { GridOverlay, DataGrid } from '@material-ui/data-grid';
import { Rnd } from 'react-rnd';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
const columns = [
 { field: 'id', headerName: 'id',type: 'number',width:56},
  { field: 'fishery_id', headerName: 'fishery_id'},
  {
    field: 'exploiting_stocks',
    headerName: 'exploiting stocks',
    type: 'number',
    // width: 100,
  },
  {
    field: 'fishery_name',
    headerName: 'fishery Name',
   // description: 'This column has a value getter and is not sortable.',
    sortable: false,
     width: 200,
    // valueGetter: (params) =>
    //   `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];
function CustomLoadingOverlay() {
            return (
                <GridOverlay >
                <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                  <LinearProgress />
                </div>
              </GridOverlay>
            )

  }
  const useStyles = makeStyles((theme) => ({
    root: {
      border: 0,
      color:
        theme.palette.type === 'light'
          ? 'rgba(0,0,0,.85)'
          : 'rgba(255,255,255,0.85)',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      WebkitFontSmoothing: 'auto',
      letterSpacing: 'normal',
      '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.type === 'light' ? '#fafafa' : '#1d1d1d',
      },
      '& .MuiDataGrid-iconSeparator': {
        display: 'none',
      },
      '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
        maxWidth:`fit-content !important`,
        borderRight: `1px solid ${
          theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
        }`,
      },
      '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        maxWidth:`fit-content !important`,
        borderBottom: `1px solid ${
          theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
        }`,
      },
      '& .MuiDataGrid-cell': {
        maxWidth:`fit-content !important`,
        color:
          theme.palette.type === 'light'
            ? 'rgba(0,0,0,.85)'
            : 'rgba(255,255,255,0.65)',
      },
      '& .MuiPaginationItem-root': {
        borderRadius: 0,
      },
      '&.MuiDataGrid-root .MuiDataGrid-cell':{
        maxWidth:`fit-content !important`,
      }
    },
  }));
  
export default function DataTable({rows}) {
    const classes = useStyles();
  return (
    <Rnd 
    default={{
        x: 0,
        y: 0,
        width: 400,
        height: 400,
       }}
         >
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
    //    components={{
    //       loadingOverlay: CustomLoadingOverlay(state),
    //     }}
        //  loading
         //columns={columns}
         onCellClick={(evt)=>{
             console.log('ok',evt);
         }}
         pagination
        {...{columns:columns,rows:rows}}/>
    </div>
</Rnd>
  );
}