import React, { useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { onSnapshot, collection, query, } from "firebase/firestore";
import db from '../../db';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export default function StoreAddress() {
  const [Array, setArray] = React.useState([])
  useEffect(() => {
    console.log('Fetchdata ready');
    const q = query(collection(db, "StoreAddress"))
    const unsub = onSnapshot(q, (querySnapshot) => {
      console.log("Data comming in Store", querySnapshot.docs.map(d => d.data()));
      setArray(querySnapshot.docs.map(d => d.data().Address))
    });
  }, [])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.map((row) => (
            
            <StyledTableRow key={row.name} onClick={() => alert(row.name)}>
                {console.log("row Simple",row)}
                {console.log("row",row[0].label)}
              <StyledTableCell component="th" scope="row">
              {row[0].value}
              </StyledTableCell >
              <StyledTableCell align="right" >{row[0].label}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
