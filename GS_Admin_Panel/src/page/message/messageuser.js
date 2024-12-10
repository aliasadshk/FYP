import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { onSnapshot, collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from "../../db";
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function MessageUser() {
  const [SearchText, setSearchText] = useState('');
  const [Array, setArray] = React.useState([]);
  const [FullArray, setFullArray] = React.useState([]);
  const [modalMessage, setModalMessage] = useState(null);
  useEffect(() => {
    console.log("Fetchdata ready");
    const q = query(collection(db, "MessageUser"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      console.log(
        "Coming messages data in action",
        querySnapshot.docs.map((d) => d.data())
      );
      setArray(querySnapshot.docs.map((d) => d.data()));
      setFullArray(querySnapshot.docs.map((d) => d.data()));
    });
  }, []);
  const handleClick = (event) => {
    console.log("This is event", event);
    setModalMessage(event);
  };
  const handleDelete = async (row) => {
    console.log("The Row is", row)
    var newData = Array.filter(ls => {
      if (ls.ID != row.ID) {
        return ls
      }
    })
    console.log("The New Data is", newData)
    setArray(newData)
    const q = query(collection(db, "MessageUser"), where('ID', '==', row.ID))
    const docs = await getDocs(q)
    docs.forEach((querySnapshot) => {
      // console.log(querySnapshot.ref._key.path.segments[6])
      deleteDoc(doc(db, "MessageUser", querySnapshot.ref._key.path.segments[6]))
    })
  }
  // useEffect(() => {
  //   console.log("firstFII")
  //   if (SearchText.length === 0) {
  //     setArray(st => ({...st, filterredData: st.Array}));
  //     return;
  //   }
  //   setArray(st => ({
  //     ...st,
  //     filterredData: st.Array.filter(d =>
  //       d.Message.toLowerCase().includes(
  //         SearchText.toLocaleLowerCase(),
  //       ),
  //     ),
  //   }));
  // }, [SearchText]);
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    console.log("searchedVal",searchedVal.target.value)
    console.log("ArrayArray",Array)
    const filteredRows = Array.filter((row) => {
      console.log("rowrowrow",row)
      return row.createdDate.toString().toLowerCase().includes(searchedVal.target.value.toString().toLowerCase());
    });
    console.log("filteredRows",filteredRows)
    setArray(filteredRows);
  };

  const cancelSearch = () => {
console.log("cancelSearch")
    setSearched("");
setArray(FullArray)
  };
  return (
    <TableContainer component={Paper}>
      <div className="row mb-4">
      <input
      placeholder="Search message By Date"
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          style={{width: '40%', height: 40,alignSelf:'left',marginRight:20}}
        />
        <button
                    type="button"
                    class="btn btn-primary"
                    onClick={cancelSearch}
                  >
                    Show all
                    </button>
      </div>
      
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            {/* <StyledTableCell align="right">Gender</StyledTableCell> */}
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Message</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
            <StyledTableCell align="right">Show</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.map((row) => (
            <>
              <StyledTableRow key={row.ID}>
              <StyledTableCell align="right">{row.ID}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.Name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Email}</StyledTableCell>
                {/* <StyledTableCell align="right">{row.Gender}</StyledTableCell> */}
                <StyledTableCell align="right">{row.Phone}</StyledTableCell>
                <StyledTableCell align="right">{row.Message}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.createdDate}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => handleClick(row)}
                  >
                    Show Message
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
                            Message
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

                        {modalMessage === null ? (
                          ""
                        ) : (
                          <div>
                            <div
                              class="modal-body row"
                              style={{ textAlign: "left" }}
                            >
                              <h6 style={{ textAlign: "left", width: "45%" }}>
                                Message
                              </h6>
                              <h6 style={{ textAlign: "right", width: "45%" }}>
                                {modalMessage.Message}
                              </h6>
                            </div>
                            <div
                              class="modal-body row"
                              style={{ textAlign: "left" }}
                            >
                              <h6 style={{ textAlign: "left", width: "45%" }}>
                                E-mail
                              </h6>
                              <h6 style={{ textAlign: "right", width: "45%" }}>
                                {modalMessage.Email}
                              </h6>
                            </div>
                            <div
                              class="modal-body row"
                              style={{ textAlign: "left" }}
                            >
                              <h6 style={{ textAlign: "left", width: "45%" }}>
                                Phone
                              </h6>
                              <h6 style={{ textAlign: "right", width: "45%" }}>
                                {modalMessage.Phone}
                              </h6>
                            </div>
                            <div
                              class="modal-body row"
                              style={{ textAlign: "left" }}
                            >
                              <h6 style={{ textAlign: "left", width: "45%" }}>
                                Gender
                              </h6>
                              <h6 style={{ textAlign: "right", width: "45%" }}>
                                {modalMessage.Gender}
                              </h6>
                            </div>
                            <div
                              class="modal-body row"
                              style={{ textAlign: "left" }}
                            >
                              <h6 style={{ textAlign: "left", width: "45%" }}>
                                Date Time
                              </h6>
                              <h6 style={{ textAlign: "right", width: "45%" }}>
                                {modalMessage.createdDate}
                              </h6>
                            </div>
                          </div>
                        )}

                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Submit
                          </button>
                          {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={() => handleDelete(row)}
                  >
                    Resolved
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
