import React, { useEffect, useState } from "react";
import MenuList from "../Menu List/menulist";
import "../Menu List Page/menulistpage.css";
import axios from "axios";

const MenuListPage = () => {
  const [menuData, setMenuData] = useState([]);
  const [subMenu, setSubMenu] = useState([]);
  const BASE_URL = 'http://localhost:3000/'
  // const BASE_URL = "https://demobackend-e6mi.onrender.com/";

  useEffect(() => {
    const getFoodData = async (e) => {
        try {
          await axios.get(BASE_URL + "getMenu").then((res) => {
            setMenuData(res.data);
            setSubMenu(res.data[0].subMenu);
          });
        } catch (err) {
          console.log(err);
        }
    };
    getFoodData();
    setTimeout(getFoodData, 500);
  }, []);

  const getSubMenuData = async (e) => {
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

  return (
    <div>
      <div>
        <header className="menuHeader">
          <div className="headerLogo">Our Menu</div>
        </header>
        <div className="menubutton">
          {menuData.map((data) => (
            <button key={data.itemName} onClick={getSubMenuData}>
              {data.itemName}
            </button>
          ))}
        </div>
        <MenuList data={subMenu} />
      </div>
    </div>
  );
};

export default MenuListPage;
