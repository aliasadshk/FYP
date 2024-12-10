import React, { useState } from 'react'
import './adres.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { collection,addDoc } from "firebase/firestore";
import db from '../../db';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Storeaddress from './storeaddress';

const arrayOFF = Array.from(Array(100).keys());
const QuantityArray = arrayOFF.map(arrayOFF => {
  return { label: arrayOFF, value: arrayOFF };
});
const Address = () => {
  const [ ] = useState("")
  const [State, setState] = useState('New');
  const [Quantity, setQuantity] = useState(0);
  
  const [Address, setAddress] = useState('');
  

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const SubmiteData = async () => {
    
let Array = [{label:Address,value:Math.floor(Math.random() *100)}]
console.log("Address",Array)
    const docRef = await addDoc(collection(db, "StoreAddress"), {
      Address: Array,
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
              label="Add Address"
              onChange={event => setAddress(event.target.value)}
              helperText="Please Enter Address"
            />
          </div>
        </Box>
        <Stack spacing={2} direction="row">

        <Button variant="contained" onClick={SubmiteData} id='btn'>Add Address</Button>

      

          
        </Stack>
        <h3>Address List</h3>
        <Storeaddress/>  
      </div>
    </div>
  )
}

export default Address
