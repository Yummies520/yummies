import React from "react";
import "../Menu List/menulist.css";

const MenuList = ({data}) => {
  return (
    <div>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
