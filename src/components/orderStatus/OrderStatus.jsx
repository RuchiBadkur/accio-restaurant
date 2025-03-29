import React from 'react';
import './OrderStatus.css';

const OrderStatus = ({ status }) => {
    return <h2 className="order-status">{status}</h2>;
};

export default OrderStatus;