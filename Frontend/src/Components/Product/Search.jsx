import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import Navbar from "../Layout/Header/Navbar";
import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) { // keyword without any spaces and then it is navigated there
      navigate(`/products/${keyword}`);
    } else { //when nothing is typed
      navigate("/products");
    }
  };

  return (
    <Fragment>
    
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
