import React from "react";
import JoyOrderDashboardTemplate from "../../components/OrderBoard/JoyOrderDashboardTemplate";
import "./Order.css";

const Order = () => {
  return <div className="OrderFrame"></div>;
};

export default Order;

// Test data for an order based on the order schema
// const testOrder = {
//   orderInfo: {
//     timePlaced: new Date("2023-11-28T06:59:00Z"),
//     orderNumber: "22-10844-10196",
//     total: 37.01,
//     soldBy: "yunxiao_2015",
//   },
//   deliveryInfo: {
//     status: "Paid", // Other possible statuses: 'Shipped', 'Delivered'
//     trackingDetails: {
//       shippingService: "SpeedPAK Economy",
//       trackingNumber: "EZ1000000001",
//     },
//   },
//   itemInfo: {
//     title:
//       "27mm Black Rubber Band Silver Clasp Strap for AP 15400 15300 Royal Oak 39mm 41mm",
//     price: 34.99,
//     imageUrl: "/path/to/image.jpg", // Replace with actual image path or URL
//   },
//   shippingAddress: {
//     fullName: "Maxim Tsvetkov",
//     addressLine1: "Maale Habanim 6, Apt 5",
//     addressLine2: "",
//     city: "Ramat Gan, Center 5238187",
//     zip: "",
//     country: "Israel",
//   },
//   paymentInfo: {
//     method: "PayPal",
//     email: "m***6@gmail.com",
//     amountCharged: 37.01,
//   },
// };
