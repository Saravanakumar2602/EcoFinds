import React, { useState } from "react";
import "../styles/components/reviewSection.css";

function ReviewSection({ reviews = [], onAddReview }) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    onAddReview({ text, rating, date: new Date().toISOString() });
    setText("");
    setRating(5);
  };

  return (
    <div className="review-section">
      <h3>Reviews & Ratings</h3>
      <form className="review-form" onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write your review..."
          required
        />
        <div className="review-rating-row">
          <label>Rating:</label>
          <select value={rating} onChange={e => setRating(Number(e.target.value))}>
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ★</option>)}
          </select>
        </div>
        <button type="submit">Submit Review</button>
      </form>
      <div className="review-list">
        {reviews.length === 0 ? <div className="no-reviews">No reviews yet.</div> :
          reviews.map((r, i) => (
            <div className="review-item" key={i}>
              <div className="review-rating">{r.rating} ★</div>
              <div className="review-text">{r.text}</div>
              <div className="review-date">{new Date(r.date).toLocaleDateString()}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ReviewSection;
