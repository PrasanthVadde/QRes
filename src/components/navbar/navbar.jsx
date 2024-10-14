import { Layout, Menu, Input } from "antd";
import { useMediaQuery } from "react-responsive";
import "./navbar.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const { Header, Footer } = Layout;
const { Search } = Input;

const Navbar = () => {
  const [searchValue,setSearchValue]=useState("")
  const handleSearch = (value) => {
    setSearchValue(value);
    console.log(value); // Log the actual value entered
  };

  const isMobile = useMediaQuery({ query: "(max-width: 520px)" });

  const menuItems = [
    {key: "search", label:( <Search
      placeholder="Search"
      name="searchValue"
      value={searchValue}
      onSearch={handleSearch}
      onChange={(e)=>setSearchValue(e.target.value)}
      style={{ width: 200 }}
      aria-label="Search input"
    />)},
    { key: "signin", label: (<NavLink to={"signUp"}>Sign up</NavLink>)  },
    { key: "cart", label: (<NavLink to={"cart"}>Cart</NavLink>)},
    { key: "profile", label: (<NavLink to={"profile"}>Profile</NavLink>) },
  ];

  const footerItems = [
    { key: "profile", label: (<NavLink to={"profile"}>Profile</NavLink>) },
    { key: "cart", label: (<NavLink to={"cart"}>Cart</NavLink>) },
    { key: "notification", label: "Notification" },
    { key: "signin", label: (<NavLink to={"signUp"}>Sign up</NavLink>) },
  ];

  return (
    <Layout style={{ minHeight: "5rem", padding: "0px" }}>
      {!isMobile && (
        <Header className="header">
          <div className="logo" >
          <img src="./logo.png" alt="Logo" className="logo-image" />
          </div>
         
          <Menu
            items={menuItems}
            mode="horizontal"
            defaultSelectedKeys={["signin"]}
            className="menu"
          />
        </Header>
      )}
      {isMobile && (
        <Footer className="footer">
          <Menu items={footerItems} mode="horizontal" className="footer-menu" />
        </Footer>
      )}
    </Layout>
  );
};

export default Navbar;
