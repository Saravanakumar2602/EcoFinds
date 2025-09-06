import React from "react";

function CategoryFilter({ categories, setCategory }) {
  return (
    <select onChange={(e) => setCategory(e.target.value)}>
      <option value="">All</option>
      {categories.map((c, idx) => (
        <option key={idx} value={c}>{c}</option>
      ))}
    </select>
  );
}

export default CategoryFilter;
