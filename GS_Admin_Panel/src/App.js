import React, {useContext, useEffect } from "react";
import "./style/dark.scss";
import Home from "./page/home/Home";
import Login from "./page/login/Login";
import List from "./page/list/List";
import SinglePage from "./page/single/Single";
import NewPage from "./page/new/New";
import AddData from "./page/Add Product/plan";
import ByShip from "./page/Add Product/ship";
import Private from "./page/Add Product/private";
import BoatProduct from "./page/showProduct/boatProduct";
import ShowProducts from "./page/showProduct/showProduct";
import PrivateSale from "./page/showProduct/privateSale";
import Address from "./page/address/address";
import Discount from "./page/discount/discount";
import Order from './page/order/order'
import TimeSlote from './page/TimeSlot/timeSlot';
import { productInputs, userInputs } from "./formSource";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import {auth} from './config'
import { createUserWithEmailAndPassword} from "firebase/auth";
import db from './db';
import { collection, addDoc } from "firebase/firestore";
import Messages from "./page/message/messages";
const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  useEffect(() => {
    let r = (Math.random() + 1).toString(36).substring(7);
console.log("randomrandomrandomrandom", r);
  }, [])
    const login = async () => {
    console.log("Auth",auth)
    createUserWithEmailAndPassword(auth,'abc987@gmail.com', '123456')
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("user",user,userCredential)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("errorCode",errorCode,errorMessage)
  });
  
  };
  const Fetchdata = async ()=>{
    console.log('Fetchdata ready');

  const docRef = await addDoc(collection(db, "cities"), {
    name: "Tokyo",
    country: "Japan"
  });
  console.log("Document written with ID: ", docRef.id);
}
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" index element={<Login />} />
            <Route path='users' >
              <Route index element={<NewPage inputs={userInputs} title="Add New User" />}/>
              <Route path=':userId' element={<SinglePage />} />
              <Route path='new' element={<NewPage inputs={userInputs} title="Add New User" />} />
            </Route>
            <Route path='order' >
              <Route index element={<Order title="Order List" />}/>
            </Route>
            <Route path='products'>
              <Route index element={<List />} />
              <Route path=':productId' element={<SinglePage />} />
              <Route path='new' element={<NewPage inputs={productInputs} title="Add New Product" />} />
            </Route>
            <Route path='AddData' element={<AddData />} />
            <Route path='ByShip'element={<ByShip/>}/>
            <Route path='ShowProducts' element={<ShowProducts />} />
            <Route path='BoatProduct'  element={<BoatProduct/>}/>

            <Route path='PrivateSaleProduct' element={<PrivateSale/>}/>
            <Route path='Private' element={<Private/>}/>
            
            <Route path='Address' element={<Address/>}/>
            <Route path="Discount" element={<Discount/>}/>
            <Route path='Messages' element={<Messages/>}/>
            <Route path='TimeSlote' element={<TimeSlote/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
};

export default App;
