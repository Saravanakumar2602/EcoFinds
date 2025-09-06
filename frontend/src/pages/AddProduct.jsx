import React, { useState } from "react";
import productService from "../services/productService";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { title, price, description };
    const res = await productService.add(newProduct);
    console.log("Product added:", res);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Product</h2>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;
