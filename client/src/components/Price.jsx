import React from 'react';
import styles from '../styles.css';


class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discount: true,
      discountRate: 6,
      cleaning: true,
      cleaningFee: 14,
    };
  }


  render() {
    const discount = Math.floor(this.props.option.totalPrice * (this.state.discountRate / 100));
    const serviceFee = Math.floor(this.props.option.totalPrice * 0.12);

    return (

      <div id="price-component">
        <div className={styles.prices}>
          <span>${this.props.option.room_rate} x {this.props.option.totalDays} nights</span>
          <span className={styles.price}>${this.props.option.totalPrice}</span>
        </div>
        {this.state.discount ?
          <div className={styles.prices}>
            <div className={styles.border} />
            <span>{this.state.discountRate}% weekly price discount</span> <span className={styles.price}>-${discount}</span>
          </div> : null}
        {this.state.cleaning ?
          <div className={styles.prices}>
            <div className={styles.border} />
            <span>Cleaning fee</span> <span className={styles.price}>${this.state.cleaningFee}</span>
          </div> : null}
        <div className={styles.prices}>
          <div className={styles.border} />
          <span>Service fee</span> <span className={styles.price}>${serviceFee}</span>
        </div>
        <div className={styles.prices}>
          <div className={styles.border} />
          <span className={styles.strong}>Total</span>
          <span className={styles.price}>
            ${(this.props.option.totalPrice - discount) + this.state.cleaningFee + serviceFee}
          </span>
        </div>
      </div>

    );
  }
}

export default Price;
