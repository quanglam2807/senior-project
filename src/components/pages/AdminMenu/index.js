import React, { useState, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from 'firebase/firestore';

import firebaseApp from '../../../firebase-app';

import DialogAdd from './DialogAdd';
import DialogEdit from './DialogEdit';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 170 },
  { id: 'calories', label: 'Calories', minWidth: 170 },
  { id: 'category', label: 'Category', minWidth: 170 },
];

export default function StickyHeadTable() {
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [idDialogEdit, setIdDialogEdit] = useState(null);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [value, loading, error] = useCollection(
    collection(getFirestore(firebaseApp), 'items'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const menuItems = useMemo(() => {
    if (!loading && !error && value) {
      return value.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }

    return [];
  }, [value, loading, error]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <TableContainer sx={{ flex: 1 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <DialogEdit open={openDialogEdit} setOpen={setOpenDialogEdit} id={idDialogEdit} />
            <TableBody>
              {menuItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => {
                      setIdDialogEdit(row.id);
                      setOpenDialogEdit(true);
                    }}
                  >
                    {columns.map((column) => {
                      const v = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof v === 'number'
                            ? column.format(v)
                            : v}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 100]}
          component="div"
          count={menuItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <DialogAdd open={openDialogAdd} setOpen={setOpenDialogAdd} />
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          zIndex: 200,
        }}
        onClick={() => setOpenDialogAdd(true)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
