import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/productService";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const data = await productService.getById(id);
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image || "https://via.placeholder.com/300"} alt={product.title} />
      <p>{product.description}</p>
      <p><strong>Price: </strong> ₹{product.price}</p>
      <button>Add to Cart</button>
      <button>Buy Now</button>
    </div>
  );
}

export default ProductDetail;
