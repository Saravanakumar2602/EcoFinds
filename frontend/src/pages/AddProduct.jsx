import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import "../styles/pages/addProduct.css";
import productService from "../services/productService";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // Extract unique categories from products data
  const categories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);

  const handleImageUpload = (e) => {
    // Placeholder: just store the file name
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  const newProduct = { title, category, description, price, image, owner: "eco@example.com" };
  const res = await productService.add(newProduct);
  console.log("Product added:", res);
  navigate(-1); // Go back after submit
  };

  return (
    <form className="add-product-container" onSubmit={handleSubmit}>
      <button type="button" className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <h2 className="add-product-title">Add New Product</h2>
      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <label htmlFor="add-image" className="add-image-btn">
        + Add Image (Placeholder)
      </label>
      <input
        id="add-image"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
      {image && <div className="image-placeholder">Selected: {image}</div>}
      <button type="submit" className="submit-btn">
        Submit Listing
      </button>
    </form>
  );
}

export default AddProduct;
