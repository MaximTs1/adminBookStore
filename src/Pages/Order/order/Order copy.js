import React from "react";
import "./Order.css";

const Order = () => {
  // Assuming `testOrder` is imported or defined above this component
  return (
    <div className="OrderFrame">
      <div className="order-page">
        <h2 className="order-header">Order details</h2>
        <div className="order-content">
          <div className="order-info-frame">
            {/* Order Info */}
            <div className="order-section">
              <div className="order-info-details">
                <div className="order-info-part">
                  <h2>Order info</h2>
                </div>
                <div className="order-info-part">
                  <h3>timePlaced:</h3>
                  <h3>orderNumber:</h3>
                  <h3>total:</h3>
                </div>
                <div className="order-info-part">
                  {/* Content for part 3 here */}
                  <h3>Order info</h3>
                </div>
              </div>
            </div>
            {/* Delivery Info */}
            <div className="order-section">
              <div className="delivery-progress">
                <h3>Delivery info</h3>
                <div className="progress-stage completed">Ordered</div>
                <div className="progress-stage completed">Shipped</div>
                <div className="progress-stage">Delivered</div>
              </div>
            </div>
            {/* Item Info */}
            <div className="order-section">
              <h3>Item info</h3>
              {/* Content here */}
            </div>
            {/* Other Actions */}
            <div className="order-section">
              <h3>Other actions</h3>
              {/* Content here */}
            </div>
          </div>
          <div className="order-aside-frame">
            {/* Shipping Address */}
            <div className="order-section">
              <h3>Shipping address</h3>
              {/* Content here */}
            </div>
            {/* Payment Info */}
            <div className="order-section">
              <h3>Payment info</h3>
              {/* Content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

// Test data for an order based on the order schema
const testOrder = {
  orderInfo: {
    timePlaced: new Date("2023-11-28T06:59:00Z"),
    orderNumber: "22-10844-10196",
    total: 37.01,
    soldBy: "yunxiao_2015",
  },
  deliveryInfo: {
    status: "Paid", // Other possible statuses: 'Shipped', 'Delivered'
    trackingDetails: {
      shippingService: "SpeedPAK Economy",
      trackingNumber: "EZ1000000001",
    },
  },
  itemInfo: {
    title:
      "27mm Black Rubber Band Silver Clasp Strap for AP 15400 15300 Royal Oak 39mm 41mm",
    price: 34.99,
    imageUrl: "/path/to/image.jpg", // Replace with actual image path or URL
  },
  shippingAddress: {
    fullName: "Maxim Tsvetkov",
    addressLine1: "Maale Habanim 6, Apt 5",
    addressLine2: "",
    city: "Ramat Gan, Center 5238187",
    zip: "",
    country: "Israel",
  },
  paymentInfo: {
    method: "PayPal",
    email: "m***6@gmail.com",
    amountCharged: 37.01,
  },
};
