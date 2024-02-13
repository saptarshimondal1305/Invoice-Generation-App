import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-evenly",
        textDecoration: "underline",
        backgroundColor: "lightgray",
        padding: "10px",
        fontSize: "large",
        textDecoration: "none",
        cursor: "pointer",
        hover: { backgroundColor: "gray", textDecoration: "none" },
      }}
    >
      <Link style={{ textDecoration: "none" }} to="/">
        Home
      </Link>
      <Link style={{ textDecoration: "none" }} to="/products">
        Products
      </Link>
      <Link style={{ textDecoration: "none" }} to="/create">
        Create
      </Link>
    </div>
  );
};

export default Navbar;
