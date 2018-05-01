import React from 'react';
import styles from '../styles.css';
import $ from 'jquery';

const Finding = ({room, scrolled}) => {
  
  const hiddenStyle = {
    marginTop: -1,
    maxHeight: 0,
    opacity: 0
  };

  const slidingStyle = {
    marginTop: 0,
    maxHeight: 300,
    opacity: 1
  };
  
  return (
  
      <div className={styles.findingGroup} style={scrolled ? slidingStyle : hiddenStyle}>
        <div className={styles.border} />
        <div className={styles.findCaption}>
          <span className={styles.find}>This is a rare find.</span>
          <div className={styles.finding}>{room.host_name}'s place is usually booked.</div>
        </div>
      </div>
  
  );

}


export default Finding;