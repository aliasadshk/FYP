import React, { useState, useEffect } from "react";
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widgets from "../../components/widgets/Widgets";
import Charts from "../../components/charts/Charts";
import Featured from "../../components/featured/Featured";
import Table from "../../components/table/Table";
import { onSnapshot, collection, query } from "firebase/firestore";
import db from "../../db";
import LoadingSpin from "react-loading-spin";
import TextField from '@mui/material/TextField';

import DateTimePicker from 'react-datetime-picker';
const TimeSlot = () => {
  const [user, setuser] = useState([]);
  const [cart, setcart] = useState([]);
  const [Loader, serLoader] = useState(false);
  const [value, onChange] = useState(new Date());
  useEffect(() => {
    async function fetchUserAPI() {
      console.log("Fetchdata");
      const q = query(collection(db, "Users"));
      const unsub = onSnapshot(q, (querySnapshot) => {
        console.log(
          "Data",
          querySnapshot.docs.map((d) => d.data())
        );
        setuser(querySnapshot.docs.map((d) => d.data()));
        serLoader(true);
      });
    }
    async function fetchOrderAPI() {
      console.log("Fetchdata");
      const q = query(collection(db, "Orders"));
      const unsub = onSnapshot(q, (querySnapshot) => {
        console.log(
          "Data",
          querySnapshot.docs.map((d) => d.data())
        );
        setcart(querySnapshot.docs.map((d) => d.data()));
      });
    }

    fetchUserAPI();
    fetchOrderAPI();
  }, []);
  return (
    // <div>
    //   {Loader === false ? (
    //     <div className="loader">
    //       <LoadingSpin size={50} />
    //     </div>
    //   ) : (
    //         <div>
    //   <DateTimePicker onChange={onChange} value={value} />
    // </div>
    //   )}
    // </div>
    <div>
      {Loader === false ? (
        <div className="loader">
          <LoadingSpin size={50} />
        </div>
      ) : (
        <div className="home">
          <Sidebar />
          <div className="homeContainer">
            <Navbar />
                    <div>
       <DateTimePicker onChange={onChange} value={value} />
   </div>
   <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Add Date
                </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlot;



// import React, { useState } from 'react';
// import DateTimePicker from 'react-datetime-picker';

// const TimeSlot = () => {
//   const [value, onChange] = useState(new Date());

//   return (
//     <div>
//       <DateTimePicker onChange={onChange} value={value} />
//     </div>
//   );
// }
// export default TimeSlot;