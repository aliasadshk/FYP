import React, { useEffect, useState } from "react";
import "../table/table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import db from "../../db";
import "react-toastify/dist/ReactToastify.css";
const TableList = ({ value }) => {
  const [modalMessage, setModalMessage] = useState();
  const [Data, setData] = useState("");
  const [ModalName, setModalName] = useState();
  const [ModalEmail, setModalEmail] = useState();
  const [ModalPhoneNumber, setModalPhoneNumber] = useState();
  const [ModalAddress, setModalAddress] = useState();
  const [ModalDate, setModalDate] = useState();
  const [ModalProductName, setModalProductName] = useState();
  const [ModalCategory, setModalCategory] = useState();
  const [ModalPrice, setModalPrice] = useState();
  const [StatusPaid, setStatusPaid] = useState();
  const [UniqueID, setUniqueID] = useState();
  const [ShipmentMethod, setShipmentMethod] = useState();
  const [ProductStatus, setProductStatus] = useState();
  const [DeliveryType, setDeliveryType] = useState();
  const [ShipCountry, setShipCountry] = useState();

  /// Not
  const [AdditionalInfo, setAdditionalInfo] = useState();

  // Not
  const handleshow = (event) => {
    console.log("This is event", event);
    setModalName(event.Name);
    setModalEmail(event.Email);
    setModalPhoneNumber(event.PhoneNumber);
    setModalAddress(event.Address);
    setModalDate(event.Date);
    setModalProductName(event.ProductName);
    setModalCategory(event.Category);
    setModalPrice(event.Price);
    setShipmentMethod(event.ShipmentMethod);
    setModalPrice(event.Price);
    setDeliveryType(event.DeliveryType);
    setShipCountry(event.ShipCountry);
    setProductStatus(event.ProductStatus);

    // setModalMessage(event)
  };
  const handleshowPaid = async (event, id) => {
    let ArraySend = null;
    setStatusPaid(event);
    setUniqueID(id);
    console.log("ididididid", id);
    value.map((value) => {
      if (value.ID === id) {
        ArraySend = value;
      }
    });
    console.log("Address", Array);
    const docRef = await addDoc(collection(db, "Delivery"), {
      Address: ArraySend.Address,
      Category: ArraySend.Category,
      Date: ArraySend.Date,
      DeliveryType: ArraySend.DeliveryType,
      Email: ArraySend.Email,
      ID: ArraySend.ID,
      Name: ArraySend.Name,
      PhoneNumber: ArraySend.PhoneNumber,
      Price: ArraySend.Price,
      ProductName: ArraySend.ProductName,
      ProductStatus: ArraySend.ProductStatus,
      ReciptUrl: ArraySend.ReciptUrl,
      ShipCountry: ArraySend.ShipCountry,
      ShipmentMethod: ArraySend.ShipmentMethod,
      Status: ArraySend.Status,
      Uid: ArraySend.Uid,
    });
    console.log("ArraySendArraySend", ArraySend);
  };
  const SavePaid = async () => {
    let a = null;
    console.log("first");
    const q = query(collection(db, "Orders"), where("ID", "==", UniqueID));
    const docs = await getDocs(q);
    console.log("DOCS", docs);
    docs.forEach((querySnapshot) => {
      console.log("For Each 1", querySnapshot.ref._key.path.segments[6]);
      // const washingtonRef = doc(db, "cities", "DC");
      a = querySnapshot.ref._key.path.segments[6];
      toast.success("Updated success");

      // Set the "capital" field of the city 'DC'
    });
    const washingtonRef = doc(db, "Orders", a);
    await updateDoc(washingtonRef, {
      Status: StatusPaid,
    });
    console.log("Update");
  };
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {console.log("Data", Data)}
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Customer Name</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Phone Number</TableCell>
            <TableCell className="tableCell">Product Name</TableCell>
            <TableCell className="tableCell">Product Category</TableCell>
            <TableCell className="tableCell">Product Price</TableCell>
            <TableCell className="tableCell">Product Detail</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Order Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {value.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.ID}</TableCell>
              <TableCell className="tableCell">{row.Name}</TableCell>

              <TableCell className="tableCell">{row.Email}</TableCell>
              <TableCell className="tableCell">{row.PhoneNumber}</TableCell>
              <TableCell className="tableCell">{row.ProductName}</TableCell>
              <TableCell className="tableCell">{row.Category}</TableCell>
              <TableCell className="tableCell">{row.Price}</TableCell>

              <TableCell className="tableCell">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => handleshow(row)}
                >
                  Show More
                </button>

                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Product Detail
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body" style={{ textAlign: "left" }}>
                        <p>
                          <b>Name:</b>
                          {ModalName}
                        </p>
                        <p>
                          <b>Email:</b> {ModalEmail}
                        </p>
                        <p>
                          <b>PhoneNumber:</b>
                          {ModalPhoneNumber}
                        </p>
                        <p>
                          <b>Address:</b>
                          {ModalAddress}
                        </p>
                        <p>
                          <b>Product Name:</b> {ModalProductName}
                        </p>
                        <p>
                          <b>Prodcut Category:</b> {ShipmentMethod}
                        </p>
                        <p>
                          <b>Prodcut Sub-Category:</b> {ModalCategory}
                        </p>
                        <p>
                          <b>Additional Information:</b> {AdditionalInfo}
                        </p>
                        <p>
                          <b>Value: </b> {ProductStatus}
                        </p>
                        <p>
                          <b>Quantity: </b> 7
                        </p>
                        <p>
                          <b>Country of expedition: </b> {ShipCountry}
                        </p>
                        <p>
                          <b>Delivery option selected: </b> {DeliveryType}
                        </p>
                        <p>
                          <b>Pick up slot selected: </b> {ModalDate}
                        </p>

                        <p>
                          <b>Price:</b> {ModalPrice}
                        </p>
                        <p>
                          <b>Picture:</b>
                        </p>
                        <div>
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/gsapp-74111.appspot.com/o/files%2Fvip20?alt=media&token=379606c3-7c99-45a4-b5c4-d649ca578de3"
                            alt=""
                            className="avatar"
                            style={{ width: "150px", height: "150px" }}
                          />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="tableCell">
                <button
                  type="button"
                  class={
                    row.Status === "Paid"
                      ? "btn btn-success"
                      : "btn btn-secondary"
                  }
                  // class="btn btn-success"
                  data-toggle="modal"
                  data-target="#exampleModalPaid"
                  onClick={() => handleshowPaid(row.Status, row.ID)}
                >
                  {row.Status}
                </button>
                <div
                  class="modal fade"
                  id="exampleModalPaid"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Change Paid Status
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="dropdown ml-5 mt-5 mb-5">
                        <button
                          class="btn btn-default dropdown-toggle"
                          type="button"
                          id="menu1"
                          data-toggle="dropdown"
                        >
                          {StatusPaid}
                          <span class="caret"></span>
                        </button>
                        <ul
                          class="dropdown-menu"
                          role="menu"
                          aria-labelledby="menu1"
                        >
                          <li role="presentation">
                            <a
                              role="menuitem"
                              href="#"
                              onClick={() => handleshowPaid("Paid", UniqueID)}
                            >
                              Paid
                            </a>
                          </li>
                          <li role="presentation">
                            <a
                              role="menuitem"
                              href="#"
                              onClick={() =>
                                handleshowPaid("Un Paid", UniqueID)
                              }
                            >
                              Un Paid
                            </a>
                          </li>
                          <li role="presentation">
                            <a
                              role="menuitem"
                              href="#"
                              onClick={() =>
                                handleshowPaid("Shipped", UniqueID)
                              }
                            >
                              Shipped
                            </a>
                          </li>
                          <li role="presentation">
                            <a
                              role="menuitem"
                              href="#"
                              onClick={() =>
                                handleshowPaid("Delivered", UniqueID)
                              }
                            >
                              Delivered
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          onClick={SavePaid}
                          type="button"
                          class="btn btn-success"
                          data-dismiss="modal"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="tableCell">
                <a href={`${row.ReciptUrl}`} target="blank">
                  Show All Details
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
