import React from "react";

function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{ margin: "10px", padding: "5px", width: "200px" }}
    />
  );
}

export default SearchBar;
