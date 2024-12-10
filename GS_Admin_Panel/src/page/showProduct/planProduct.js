import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { onSnapshot, collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
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
export default function PlanProduct() {
  const [Editid, setEditid] = useState('')
  const [Array, setArray] = React.useState([])
  const [modalMessage, setModalMessage] = useState()
  const [Name, setName] = useState('');
  const [NewPrice, setNewPrice] = useState('');
  const [Price, setPrice] = useState('');
  const [Quantity, setQuantity] = useState('');
  useEffect(() => {
    console.log('Fetchdata ready');
    const q = query(collection(db, "ByPlan"))
    const unsub = onSnapshot(q, (querySnapshot) => {
      console.log("Data", querySnapshot.docs.map(d => d.data()));
      setArray(querySnapshot.docs.map(d => d.data()))
    });
  }, [])
  const handleDelete = async (row) => {
    const Name = row.name
    console.log("The Row is", row)
    var newData = Array.filter(ls => {

      if (ls.name != row.name) {
        return ls
      }
    })
    console.log("The New Data is", newData)
    setArray(newData)
    const q = query(collection(db, "ByPlan"), where('name', '==', row.name))
    const docs = await getDocs(q)
    docs.forEach((querySnapshot) => {
      // console.log(querySnapshot.ref._key.path.segments[6])
      deleteDoc(doc(db, "ByPlan", querySnapshot.ref._key.path.segments[6]))
    })
  }
  const handleupdate = (event) => {
    console.log("This is update", event)
    setModalMessage(event)
  }
  const setEditidfun = (id) => {
    console.log(id)
    setEditid(id)
  }
  const SaveCangeFun = async (id) => {

    if (Name === '',
      Price === '',
      NewPrice === '',
      Quantity === ''
    ) {
      console.log("Ifff");
      toast.error("Please update  product details ")
      return
    }
    else {
      console.log("Else")

    
    let a = null
    const q = query(collection(db, "ByPlan"), where('name', '==', id))
    const docs = await getDocs(q)
    console.log("DOCS", docs)
    docs.forEach((querySnapshot) => {
      console.log("For Each 1", querySnapshot.ref._key.path.segments[6])
      // const washingtonRef = doc(db, "cities", "DC");
      a = querySnapshot.ref._key.path.segments[6]
      toast.success("Updated success")

      // Set the "capital" field of the city 'DC'
})
    const washingtonRef = doc(db, "ByPlan", a)
    await updateDoc(washingtonRef, {
      name: Name,
      Price: Price,
      newprice: NewPrice,
      quantity: Quantity

    });
    setEditid('')
    console.log("Update")
   }
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Image</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">New Price</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Quantity Limit</StyledTableCell>
            <StyledTableCell align="right">Stock</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.map((row) => (
            <StyledTableRow>
              {
                Editid === row.productid ?
                  <StyledTableCell align="right" ><TextField
                    onChange={event => setName(event.target.value)}
                    label="Name"
                    placeholder={row.name}

                  // onChange={event => setName(event.target.value)}

                  /></StyledTableCell>
                  :
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell >

              }

              <StyledTableCell align="right" >
                <img
                  src={row.image}
                  alt=""
                  className="avatar"
                  style={{ width: '50px', height: "50px" }}
                />
              </StyledTableCell>
              <StyledTableCell align="right" >{row.category}</StyledTableCell>
              {
                Editid === row.productid ?
                  <StyledTableCell align="right" ><TextField
                    onChange={event => setNewPrice(event.target.value)}
                    label="New Price"
                    placeholder={row.newprice}

                  // onChange={event => setName(event.target.value)}

                  /></StyledTableCell>
                  :
                  <StyledTableCell align="right" >€{row.newprice}</StyledTableCell>

              }

              {
                Editid === row.productid ?
                  <StyledTableCell align="right" ><TextField

                    label="Price"
                    placeholder={row.Price}

                    onChange={event => setPrice(event.target.value)}

                  /></StyledTableCell>
                  :
                  <StyledTableCell align="right" style={{ textDecorationLine: 'line-through', }}>€{row.Price}
                  </StyledTableCell>

              }

              {console.log("Id in render", Editid, row.productid)}
              {
                Editid === row.productid ?
                  <StyledTableCell align="right" ><TextField

                    label="Quantity"
                    placeholder={row.quantity}

                    onChange={event => setQuantity(event.target.value)}

                  /></StyledTableCell>
                  :
                  <StyledTableCell align="right">{row.quantity == "0" ? <span style={{ color: "red" }}>
                    {row.quantity}
                  </span> : row.quantity}</StyledTableCell>

              }
              <StyledTableCell align="right">{row.quantity == "0" ?
                <span style={{ color: "red" }}>Out Of Stock</span> : <span style={{ color: "green" }}>
                  Available</span>}
              </StyledTableCell>
              <StyledTableCell align="right">
                {
                  Editid === row.productid ?
                    <button type="button" class="btn btn-primary" style={{ color: 'white', backgroundColor: "green" }}
                      data-toggle="modal" data-target="#exampleModal" onClick={() => SaveCangeFun(row.name)}>
                      Save
                    </button>
                    :
                    <button type="button" class="btn btn-primary" style={{ color: 'white', backgroundColor: "grey" }}
                      data-toggle="modal" data-target="#exampleModal" onClick={() => setEditidfun(row.productid)}>
                      Edit
                    </button>
                }
              </StyledTableCell>
              <StyledTableCell align="right">
                <button type="button" className="btn btn-dander btn-sm" onClick={() => handleDelete(row)}
                  style={{ color: 'white', backgroundColor: "darkred"}}>Delete</button>

              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>

      </Table>
      <ToastContainer />
    </TableContainer>
  );
}
