import React, {useEffect, useState} from 'react'
import Menu from "../menu/Menu"
import OrderButton from "../orderButton/OrderButton"
import OrderStatus from "../orderStatus/OrderStatus"
import OrderSummary from "../orderSummary/OrderSummary"
import "./RestaurantApp.css";

const RestaurantApp = () => {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("Welcome! Please place an order.");

  useEffect(() => {
    getMenu();
  }, [])

  const getMenu = async () => {
    try {
        let response = await fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json");
        let menuData = await response.json();
        setMenu(menuData);
    } catch (error) {
        console.error("Error fetching menu:", error);
        setStatus("Failed to load menu. Please try again.");
    }
  }

  function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (menu.length === 0) {
                console.error("Menu not loaded yet");
                return;
            }
            let selectedOrder = Array.from(menu).sort(() => 0.5 - Math.random()).slice(0, 3);
            setOrder(selectedOrder);
            resolve({ burgers: selectedOrder });
        }, 2500);
    });
}

function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

function thankyouFnc() {
    alert("Thank you for eating with us today!");
}


  const handleOrderProcess = () => {
    if(menu.length === 0){
        setStatus("Menu not loaded yet. Please wait.");
        return;
    }
    setStatus("taking order...")
    takeOrder()
    .then(() => {
        setStatus("Preparing order...");
        return orderPrep();
    })
    .then(prepStatus => {
        setStatus("Processing payment...")
        return payOrder();
    })
    .then(paymentStatus => {
        if (paymentStatus.paid) {
            setStatus("Payment successful!");
            thankyouFnc();
        }
    })
    .catch(error => {
        console.error("Error in order process:", error);
        setStatus("Something went wrong. Please try again.");
    });
  }

  return (
    <div className='restaurant-app'>
        <h1>Restaurant Menu</h1>
        <Menu menu={menu}/>
        <OrderButton handleOrderProcess={handleOrderProcess}/>
        <OrderStatus status={status}/>
        {order && <OrderSummary order={order}/>}
    </div>
  )
}

export default RestaurantApp