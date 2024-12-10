import React, { useState } from 'react'
import './dis.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { collection,addDoc } from "firebase/firestore";
import db from '../../db';
import MenuItem from '@mui/material/MenuItem';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Discountlist from './discountlist'

const arrayOFF = Array.from(Array(100).keys());
const QuantityArray = arrayOFF.map(arrayOFF => {
  return { label: arrayOFF, value: arrayOFF };
});
const Discount = () => {
  const [ ] = useState("")
  const [State, setState] = useState('');
  const [Quantity, setQuantity] = useState(0);
  const [Name, setName] = useState('');
  
  const [Discount, setDiscount] = useState('');
  
 
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const SubmiteData = async () => {
    console.log("Discount",Discount)
    console.log("Quantity",Quantity)
let Array = {Code:Discount,DiscountPercent:Quantity}
console.log("Discount",Array)
    const docRef = await addDoc(collection(db, "Discount"), {
      Discount: Array,
    }
  
    );
    console.log("Document written with ID: ", docRef.id);
    
  }

  return (
    <div className='new'>
      
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className='text-div'>

          <TextField
              required
              id="outlined-required"
              label="Promo Code"
              onChange={event => setDiscount(event.target.value)}
              helperText="Please Enter Promo Code"
            />
           
          <TextField
              id="outlined-select-currency"
              select
              label="Add Percentage"
              value={Quantity}
              onChange={handleChangeQuantity}
              helperText="Please Enter Percentage"
            >
              {QuantityArray.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
           
          </div>
        </Box>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={SubmiteData} id='btn'>Add Discount</Button>
          
        </Stack>
        <h3>Discount List</h3>
        <Discountlist/>
      </div>
    </div>
  )
}

export default Discount;