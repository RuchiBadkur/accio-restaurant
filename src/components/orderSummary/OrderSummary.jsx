import React from 'react';
import './OrderSummary.css';

const OrderSummary = ({ order }) => {
    return (
        <div className="order-summary">
            <h2>Your Order</h2>
            {order.map(item => (
                <div key={item.id} className="order-item">
                    <h3>{item.name}</h3>
                    <img src={item.img} alt={item.name} className="order-img" />
                </div>
            ))}
        </div>
    );
}

export default OrderSummary