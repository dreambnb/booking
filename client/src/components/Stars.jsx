import React from 'react';
import styles from '../styles.css';
import StarRatings from 'react-star-ratings';

const Stars = ({ room }) => {
  const ratingNum = Number(room.review_grade);
  console.log(room.review_grade)
  console.log(ratingNum);
  return (
  <div>
    <span> <StarRatings
      rating={ratingNum || 5}
      starRatedColor="#008489"
      starDimension="10px"
      starSpacing="0px"
      numberOfStars={5}
    />
    </span>
    <span>{room.review_count}</span>
  </div>

  )


}



export default Stars;
