import React from 'react';
import './OrderButton.css';

const OrderButton = ({ handleOrderProcess }) => {
    return <button className="order-btn" onClick={handleOrderProcess}>Place Order</button>;
};

export default OrderButton;