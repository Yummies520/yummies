import React, { useEffect, useState } from "react";
import axios from 'axios';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const UpdateForm = ({ data, itemName }) => {
  // const BASE_URL = "http://localhost:3000/";
  const BASE_URL = 'https://yummies-be.onrender.com/';
  const [updateForm, setUpdateForm] = useState(data);
  const [showUpdateForm, setShowUpdateForm] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleUpdateName = (e) => {
    setUpdateForm({...updateForm,menuName:e.target.value})
  };
  const handleUpdateFile = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setUpdateForm({ ...updateForm, menuImage: reader.result });
    };
    reader.onerror = (error) => {
      console.log("error: ", error);
    };
  };
  const handleUpdateDesc = (e) => {
    setUpdateForm({...updateForm,menuDesc:e.target.value})
  };
  const handleUpdatePrice = (e) => {
    setUpdateForm({...updateForm,menuPrice:e.target.value})
  };
  const handleUpdatesubmit = async (e) => {
    handleOpen();
    setShowUpdateForm(false);
    e.preventDefault();
    const inputData = { itemName: itemName, subMenu:updateForm, oldName: data.menuName};
    try{
      await axios.post(BASE_URL + "updateMenu" , inputData).then((res)=>{

      })
    }catch(err){
      console.log(err);
    }
    setShowUpdateForm(false);
  };
  const handleUpdateCancel = (e) => {
    // e.preventDefault();
    setShowUpdateForm(false);
  };

  return (
    <>
      {showUpdateForm ? (
        <div className="UpdateForm">
          <form action="submit">
            <input
              type="text"
              className="updateFormInput"
              onChange={handleUpdateName}
              value={updateForm.menuName}
            />
            <input
              type="file"
              className="updateFormInput"
              onChange={handleUpdateFile}
              // value={updateForm.menuImage}
            />
            <input
              type="text"
              className="updateFormInput"
              onChange={handleUpdateDesc}
              value={updateForm.menuDesc}
            />
            <input
              type="number"
              className="updateFormInput"
              onChange={handleUpdatePrice}
              value={updateForm.menuPrice}
            />
            <input
              type="submit"
              className="updateFormInputBtn"
              value="Update"
              onClick={handleUpdatesubmit}
            />
            <input
              className="updateFormInputBtn"
              onClick={handleUpdateCancel}
              value="Cancel"
              type="button"
            />
          </form>
        </div>
      ) : (
        ""
      )}
       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#d4edda" }}
        >
          Menu updated successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateForm;
