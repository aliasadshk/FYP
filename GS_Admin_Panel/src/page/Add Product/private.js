import React, { useState } from 'react'
import './new.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import db from '../../db';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { doc, onSnapshot, collection, query, where, addDoc } from "firebase/firestore";
import LoadingSpin from "react-loading-spin";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const arrayOFF = Array.from(Array(100).keys());
const QuantityArray = arrayOFF.map(arrayOFF => {
  return { label: arrayOFF, value: arrayOFF };
});
const Private = () => {
  const [ ] = useState("")
  const [file, setFile] = useState("")
  const [State, setState] = useState('New');
  const [Quantity, setQuantity] = useState(0);
  const [Name, setName] = useState('');
  const [Price, setPrice] = useState('');
  const [NewPrice, setNewPrice] = useState('');
  const [imgUrl, setImgUrl] = useState("");
  
  const [Loader, setLoader] = useState(true)
  
 
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const SubmiteData = async () => {
   
    if (Name === "" &&
      Price === "" &&
      NewPrice === "" &&
      imgUrl ===""&&
      Quantity === 0
    ) {
      toast.error("Please enter the product details first")

    }
    if (file === "") {
      // alert("Please upload the image first")
      toast.error("Please upload the image first")
    }
    else {
      const docRef = await addDoc(collection(db, "Private"), {
        name: Name,
        Price: Price,
        newprice:NewPrice,
        productid: Math.random().toString(32).substring(1, 18),
        // state:State,
        quantity: Quantity,
        image: imgUrl,
      });
      console.log("Document written with ID: ", docRef.id);
      setName("")
      setPrice("")
      setQuantity("")
      setImgUrl("")
      setNewPrice("")
      setFile("")
    }


  }

  const uploadImage = async (e) => {
    console.log("The error ois,",file)
    e.preventDefault()
    // if (imgUrl === "") {
    //   toast.error("Please upload the image first")
    //   return
    // }
    if(file===""){
      toast.error("Please Upload Image")
      return
    }
    setLoader(false)
    if (Name === "" &&
      Price === "" &&
      NewPrice ===""&&
      imgUrl ===""&&
      Quantity === 0) {
        setLoader(true)
      // alert("Please enter product details first ")
      toast.error("Please enter product details first ")
     
    }
    else {
    

      // Add loader variable here ;

      const storage = getStorage();
      const storageRef = ref(storage, `/files/${Name}`);
      await uploadBytes(storageRef, file).then((snapshot) => {
        // alert("File uploaded")
        toast.success("File uploaded success")
        setLoader(true)
      });
      await getDownloadURL(ref(storage, `/files/${Name}`))
        .then((url) => {
          setImgUrl(url)
        })
        .catch((error) => {
          // alert("Error")
          toast.error("Error")
        });

    }

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
              id="outlined-select-currency"
              select
              label="Select"
              value={Quantity}
              onChange={handleChangeQuantity}
              helperText="Please Select Quantity"
            >
              {QuantityArray.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            
            <TextField
              required
              id="outlined-required"
              label="Product Name"
              value={Name}
              onChange={event => setName(event.target.value)}
              
            />
            <TextField
              required
              id="outlined-required"
              label="Product Price"
              value={Price}
              
              onChange={event => setPrice(event.target.value)}
              helperText="Please Enter Previous Price"
            />
            <TextField
              required
              id="outlined-required"
              label="Product New Price"
              value={NewPrice}
              onChange={event => setNewPrice(event.target.value)}
              helperText="Please Enter New Price"
            />
            {!Loader ? <div className="loader">
              <LoadingSpin size={50} />
            </div>
              :
              <div className='maindiv'>
              <div className='left'>
                <img className='imageicon'
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
              </div>
              <div className='Image_div' >
                <label htmlFor='file' className='imaageFiled'>
                  Image: <DriveFolderUploadOutlinedIcon className='icon'  />
                </label>
                <input
                  type='file' id='file'
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }} />
                   <button className='imagebutton' onClick={(e)=>uploadImage(e)}>Upload image</button>
              </div>

             
            </div>
          }
          </div>
        </Box>
        <Stack spacing={2} direction="row">

          <Button variant="contained" onClick={SubmiteData} id='btn'>Add Private Product</Button>


        </Stack>  
      </div>
      <ToastContainer />
    </div>
  )
}

export default Private
