"use client";
import { useMemo, useState } from 'react';
import {
  type MRT_TableOptions,
  type MRT_ColumnDef,
  type MRT_Row,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import ComparisonChart from './component/comparisonChart'
import { Box} from '@mui/material';
import { data, type Person } from './makeData';

const Home = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
  
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },  
      {
        accessorKey: 'price',
        header: 'Price',
      },
    ],
    [],
  
  );

  const [data1, setData1] = useState<Person[]>(() => data.slice(0, 3));
  const [data2, setData2] = useState<Person[]>(() => data.slice(3, 5));

  const [draggingRow, setDraggingRow] = useState<MRT_Row<Person> | null>(null);
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);
 
  const commonTableProps: Partial<MRT_TableOptions<Person>> & {
    columns: MRT_ColumnDef<Person>[];
  } = {
    columns,
    enableRowDragging: true,
    enableFullScreenToggle: false,
    enableBottomToolbar: false,
    enableTopToolbar:false,
    muiTableContainerProps: {
      sx: {
        minHeight: '320px',
      },
    },
    onDraggingRowChange: setDraggingRow,
    state: { draggingRow },
  };

  const table1 = useMaterialReactTable({
    ...commonTableProps,
    data: data1,
    getRowId: (originalRow) => `table-1-${originalRow.firstName}`,
    muiRowDragHandleProps: {
      onDragEnd: () => {
        if (hoveredTable === 'table-2') {
          setData2((data2) => [...data2, draggingRow!.original]);
          setData1((data1) => data1.filter((d) => d !== draggingRow!.original));
        }
        setHoveredTable(null);
      },
    },
    muiTablePaperProps: {
      onDragEnter: () => setHoveredTable('table-1'),
      sx: {
        outline: hoveredTable === 'table-1' ? '2px dashed pink' : undefined,
      },
    },
  
  });

  const table2 = useMaterialReactTable({
    ...commonTableProps,
    data: data2,
    defaultColumn: {
      size: 100,
    },
    getRowId: (originalRow) => `table-2-${originalRow.firstName}`,
    muiRowDragHandleProps: {
      onDragEnd: () => {
        if (hoveredTable === 'table-1') {
          setData1((data1) => [...data1, draggingRow!.original]);
          setData2((data2) => data2.filter((d) => d !== draggingRow!.original));
        }
        setHoveredTable(null);
      },
    },
    muiTablePaperProps: {
      onDragEnter: () => setHoveredTable('table-2'),
      sx: {
        outline: hoveredTable === 'table-2' ? '2px dashed pink' : undefined,
      },
    },
   
  });

  return (
    <>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'auto', lg: '1fr 1fr' },
        gap: '2rem',
        overflow: 'auto',
        p: '16px',
      }}
    > 
      
      <MaterialReactTable table={table1} />
      <MaterialReactTable table={table2} />
     
     
      <div>
      <ComparisonChart  data1={data1} data2={data2}/> 
      </div>
      
    </Box>
    
        
        
       
    
    
    </>
  );
};

export default Home;
