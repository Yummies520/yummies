import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "../../Assests/delete.svg";
import "../AdminForm/AdminForm.css";
import ChangeMenu from "../ChangeMenu/ChangeMenu.css";
import BackIcon from "../../Assests/angle-circle-arrow-left-icon.svg";

const AdminForm = () => {
  const [menuItemName, setMenuItemName] = useState("");
  const [menuShareItemName, setMenuShareItemName] = useState("");
  const [displayAddNewForm, setDisplayAddNewForm] = useState(false);
  const BASE_URL = "https://yummies-be.onrender.com/";
  //   const BASE_URL = "http://localhost:3000/";
  const [menuItem, setMenuItem] = useState([]);
  const [showChangeMenu, setShowChangeMenu] = useState(false);
  const [subMenu, setSubMenu] = useState([]);

  useEffect(() => {
    const getFoodData = async () => {
      try {
        await axios.get(BASE_URL + "getMenu").then((res) => {
          setMenuItem(res.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getFoodData();
  }, []);
  const handleMenuItemName = (e) => {
    setMenuItemName(e.target.value);
  };
  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    const inputData = { itemName: menuItemName };
    try {
      await axios
        .post(BASE_URL + "createMenuItem", inputData)
        .then((res) => {});
    } catch (err) {
      console.log(err);
    }
    setMenuItemName("");
    setDisplayAddNewForm(false);
  };

  const handleAddNew = () => {
    setDisplayAddNewForm(true);
  };

  const handleMenuClick = async (e) => {
    setShowChangeMenu(true);
    setMenuShareItemName(e.target.innerText);
    try {
      await axios
        .get(BASE_URL + "getSubMenu", {
          params: { itemName: e.target.innerText },
        })
        .then((res) => {
          setSubMenu([]);
          setSubMenu(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleBackIconClick = (e) => {
    window.location.href = "/HomePage";
  };

  const handleDeleteClick = async (e) => {
    //This is code to Delete the menuitem
    try {
      await axios.delete(BASE_URL + "deleteMenu", {
        params: { itemName: e.target.name },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateLayover = (e) => {
    setShowChangeMenu(false);
  };

  return (
    <div>
      <img
        src={BackIcon}
        alt=""
        className="BackIcon"
        onClick={handleBackIconClick}
      />
      <button className="addNewButton" onClick={handleAddNew}>
        Add new Menu Item
      </button>

      {displayAddNewForm ? (
        <form
          action="submit"
          onSubmit={handleMenuSubmit}
          className="menuInputForm"
        >
          <input
            type="text"
            name="menuItemName"
            onChange={handleMenuItemName}
            value={menuItemName}
            placeholder="Enter Menu Item Name"
          />
          <input type="submit" value="Submit" className="menuSubmit" />
        </form>
      ) : (
        ""
      )}

      <h3>Select the menu you want to change</h3>

      <div className="menuItemList">
        <div className="menuListContainer">
          {menuItem.map((data, index) => (
            <div className="menuListBtnOption" key={data.id}>
              <button
                className="menuListBtn"
                key={data.itemName}
                onClick={handleMenuClick}
              >
                {data.itemName}
              </button>
              <img
                src={DeleteIcon}
                alt=""
                onClick={handleDeleteClick}
                name={data.itemName}
              />
            </div>
          ))}
        </div>

        {showChangeMenu ? (
          <>
            <div
              className="updateMenuLayover"
              onClick={handleUpdateLayover}
            ></div>
            <ChangeMenu data={subMenu} ItemName={menuShareItemName} />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdminForm;
