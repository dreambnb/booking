import React from 'react';
import styles from '../styles.css';
import StarRatings from 'react-star-ratings';

const Stars = ({ room }) => (

  <div>
    <span> <StarRatings
      rating={room.review_grade}
      starRatedColor="#008489"
      starDimension="10px"
      starSpacing="0px"
      numberOfStars={5}
    />
    </span>
    <span>   {room.review_count}</span>
  </div>

);


export default Stars;
