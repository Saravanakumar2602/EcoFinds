
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../services/productService";
import ReviewSection from "../components/ReviewSection";
import "../styles/pages/productDetail.css";


function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      const data = await productService.getById(id);
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  const handleAddReview = (review) => {
    setReviews((prev) => [review, ...prev]);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <h2>{product.title || product.name}</h2>
      <img src={product.image || "https://via.placeholder.com/300"} alt={product.title || product.name} />
      <p className="product-detail-description">{product.description}</p>
      <p className="product-detail-price"><strong>Price: </strong> ₹{product.price}</p>
      <div className="product-detail-actions">
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        <button onClick={() => navigate('/checkout')}>Buy Now</button>
      </div>
      <ReviewSection reviews={reviews} onAddReview={handleAddReview} />
    </div>
  );
}

export default ProductDetail;
