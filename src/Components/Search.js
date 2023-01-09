import React from "react";
import "./Search.css";

const Search = ({ search, setSearch }) => {
  return (
    <>
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          role="searchbox"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </>
  );
};

export default Search;
