import React, { useEffect, useState } from "react";
import "../Menu List/menulist.css";
import Add from "../../Assests/plus.png";
import Sub from "../../Assests/substract.png";
import axios from "axios";

const MenuList = ({ data }) => {
  const [currentDate, setCurrentDate] = useState('');
  const [cartData, setCartData] = useState([]);
  const [cartFlag, setCartFlag] = useState(false);
  const [makeCart, setMakeCart] = useState(cartData);
  const customerSubmitForm = { CName: "", CNumber: ""};
  const [submitForm, setSubmitForm] = useState(customerSubmitForm);
  const [submitFormFlag, SetSubmitFormFlag] = useState(false);
  // const BASE_URL = 'http://localhost:3000/';
  const BASE_URL = 'https://yummies-be.onrender.com/';



  useEffect(() => {
    
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear();
      
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
    
    setCurrentDate(new Date());
    setMakeCart(cartData);
    sessionStorage.setItem("cartItems", JSON.stringify(cartData));
  }, [cartData]);



  const handleCustomerName = (e) => {
    setSubmitForm({ ...submitForm, CName: e.target.value });
  };

  const handleCustomerNumber = (e) => {
    setSubmitForm({ ...submitForm, CNumber: e.target.value });
  };

  const handleAddCart = (menuData) => {
    cartData.sort((a, b) => a.menuName.localeCompare(b.menuName));
    setCartData([
      ...cartData,
      { menuName: menuData.menuName, menuPrice: menuData.menuPrice },
    ]);
    setCartFlag(true);
  };

  const handleSubCart = (menuData) => {
    const index = cartData.findIndex(
      (menuItem) => menuItem.menuName === menuData.menuName
    );
    if (index !== -1) {
      cartData.splice(index, 1);
      setCartData([...cartData]);
    }
    sessionStorage.setItem("cartItems", JSON.stringify(cartData));
    if (cartData.length < 1) {
      setCartFlag(false);
    }
  };

  const handleCartSubmit = () => {
    SetSubmitFormFlag(true);
  };

  const handelCartCancel = () => {
    sessionStorage.removeItem("cartItems");
    setMakeCart([]);
    setCartData([]);
    setCartFlag(false);
  };

  const handleFormCancel = (e) => {
    e.preventDefault();
    SetSubmitFormFlag(false);
  }

  const handleFormSave = async (e) => {
    e.preventDefault();
    const submitFormData = {Form:submitForm, item:sessionStorage.getItem('cartItems'), Date: currentDate}
    try{
      await axios.post(BASE_URL + 'setRecordItem', submitFormData).then((res) => {
      })
    }catch(err){
      console.log(err);
    }
    sessionStorage.removeItem("cartItems");
    setMakeCart([]);
    setCartData([]);
    setCartFlag(false);
    SetSubmitFormFlag(false);
  }

  return (
    <div>
      {cartFlag ? (
        <div className="cartcontainer">
          {makeCart.map((cart) => (
            <div>
              <div>{cart.menuName}</div>

              <div>{cart.menuPrice}</div>
            </div>
          ))}
          <button onClick={handleCartSubmit}>Submit</button>
          <button onClick={handelCartCancel}>Cancel</button>
        </div>
      ) : (
        ""
      )}
      <div className="container">
        {data.map((menu) => (
          <div className="menuList">
            <div className="menuListImage">
              <img src={menu.menuImage} alt="" />
            </div>
            <div className="menuList-Body">
              <div className="menuList-name-price">
                <div className="menuList-Name">{menu.menuName}</div>
                <div className="menuList-Price">Rs. {menu.menuPrice}</div>
              </div>
              <div className="menuList-Desc">{menu.menuDesc}</div>
              <div className="addsubbuttons">
                <img
                  className="addButton"
                  src={Add}
                  alt=""
                  onClick={() => handleAddCart(menu)}
                />
                <img
                  className="addButton"
                  src={Sub}
                  alt=""
                  onClick={() => handleSubCart(menu)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {submitFormFlag ? (
        <div className="finalSubmitForm">
          <form className="submitForm">
            <h2>Fill the customer details</h2>
            <hr />
            <input
              type="text"
              placeholder="Enter Customer Name"
              onChange={handleCustomerName}
            />
            <input
              type="number"
              placeholder="Enter Customer Number"
              onChange={handleCustomerNumber}
            />
            {/* <input type="submit" value="Save" /> */}
            <button onClick={handleFormSave}>Save</button>
            <button onClick={handleFormCancel}>Cancel</button>
            {/* <input type="cancel" value="Cancel" /> */}
          </form>
        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default MenuList;
