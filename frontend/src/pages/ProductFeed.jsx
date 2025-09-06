import React, { useEffect, useState } from "react";
import productService from "../services/productService";
import ProductCard from "../components/ProductCard";

function ProductFeed() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await productService.getAll();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product Listings</h2>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default ProductFeed;
