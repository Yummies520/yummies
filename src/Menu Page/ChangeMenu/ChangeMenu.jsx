import React, { useEffect, useState } from "react";
import "../ChangeMenu/ChangeMenu.css";
import EditIcon from "../../Assests/icons8-edit.svg";
import DeleteIcon from "../../Assests/delete.svg";
import UpdateForm from "../UpdateForm/UpdateForm";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ChangeMenu = ({ data, ItemName }) => {
  useEffect(() => {
    setSubmenu(data);
  },[data]);
  // const BASE_URL = "http://localhost:3000/";
  const BASE_URL = 'https://yummies-be.onrender.com/';
  const [displayAddnewForm, setdisplayAddnewForm] = useState(false);
  const menuFormData = {
    menuName: "",
    menuImage: "",
    menuDesc: "",
    menuPrice: "",
  };
  const [menuData, setMenuData] = useState(menuFormData);
  const [subMenu, setSubmenu] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateItemName, setUpdateItemName] = useState(ItemName);
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



  const handleMenuImage = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setMenuData({ ...menuData, menuImage: reader.result });
    };
    reader.onerror = (error) => {
      console.log("error: ", error);
    };
  };
  const handleMenuName = (e) => {
    setMenuData({ ...menuData, menuName: e.target.value });
  };
  const handleMenuDesc = (e) => {
    setMenuData({ ...menuData, menuDesc: e.target.value });
  };
  const handleMenuPrice = (e) => {
    setMenuData({ ...menuData, menuPrice: e.target.value });
  };
  const handleMenuFormSubmit = async (e) => {
    e.preventDefault();
    const inputData = { menuData, ItemName };
    try {
      await axios.post(BASE_URL + "createSubMenu", inputData).then((res) => {});
    } catch (err) {
      console.log(err);
    }
    setMenuData(menuFormData);
    setdisplayAddnewForm(false);
  };
  const handleCancelForm = () => {
    setdisplayAddnewForm(false);
    setMenuData(menuFormData);
  };
  const handleDeleteClick = async (e) => {
    handleOpen();
    //This is the  code to delete the specific subMenu, Need a popup and refresh after clicking yes.
    try {
      await axios.delete(BASE_URL + "deleteSubMenu", {
        params: { itemName: ItemName, menuName: e.target.name },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditClick = (e) => {
    setUpdateData([]);
    subMenu.forEach((Menu) => {
      if (Menu.menuName == e.target.name) {
        setUpdateData(Menu);
      }
      setShowUpdateForm(true);
    });
  };

  return (
    <div className="ChangeMenuContainer">
      <div className="changeMenuHeading">
        Make Changes in <span>BreakFast</span>
      </div>
      <button className="addNewBtn" onClick={() => setdisplayAddnewForm(true)}>
        Add New Menu +
      </button>
      {displayAddnewForm ? (
        <div className="addNewForm">
          <form
            action="submit"
            onSubmit={handleMenuFormSubmit}
            className="addNewMenuForm"
          >
            <input
              type="text"
              name="menuName"
              placeholder="Enter menuName"
              value={menuData.menuName}
              onChange={handleMenuName}
            />
            <br />
            <input
              type="file"
              name="menuImage"
              placeholder="Enter menuImage"
              className="addNemMenuFile"
              onChange={handleMenuImage}
            />
            <br />
            <input
              type="text"
              name="menuDesc"
              placeholder="Enter menuDescription"
              onChange={handleMenuDesc}
              value={menuData.menuDesc}
            />
            <br />
            <input
              type="number"
              name="menuPrice"
              placeholder="Enter menuPrice"
              onChange={handleMenuPrice}
              value={menuData.menuPrice}
            />
            <br />
            <input
              type="submit"
              name="submit"
              value="submit menuForm"
              className="addNewMenuFormBtn"
            />
            <button
              type="cancel"
              className="cancelMenuFormBtn"
              onClick={handleCancelForm}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
      {displayAddnewForm ? (
        ""
      ) : (
        <div className="menuItemList">
          {subMenu.map((data, index) => (
            <div className="menuListBtnOption" key={data.id}>
              <button className="menuListBtn" key={data.itemName}>
                {data.menuName}
              </button>

              <img
                src={DeleteIcon}
                alt=""
                onClick={handleDeleteClick}
                name={data.menuName}
              />
              <img
                src={EditIcon}
                alt=""
                onClick={handleEditClick}
                name={data.menuName}
              />
            </div>
          ))}
        </div>
      )}
      {showUpdateForm ? (
        <div>
          <UpdateForm data={updateData} itemName={updateItemName} />
        </div>
      ) : (
        ""
      )}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%", backgroundColor: '#f8d7da', color: '#721c24' }}
        >
          Menu Deleted successfully, Kindly refresh page
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ChangeMenu;
