import React, { useState, useEffect } from "react";
import "./Order.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/orders");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const ordersData = await response.json();
        setOrders(ordersData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const calculateSubtotal = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.amount, 0);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3001/manager/updateOrderStatus/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the orders state with the new status
      setOrders(
        orders.map((order) => {
          if (order.id === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        })
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const lastOrderIndex = currentPage * ordersPerPage;
  const firstOrderIndex = lastOrderIndex - ordersPerPage;
  const currentOrders = orders.slice(firstOrderIndex, lastOrderIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="OrderFrame">
      <h1>All Orders</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Date</th>
              <th>Details</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.customer.name}</td>
                <td>{order.customer.email}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => openModal(order)}>View Details</button>
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                  >
                    <option value="Placed">Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(orders.length / ordersPerPage) },
          (_, i) => (
            <button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          )
        )}
      </div>
      {isModalOpen && selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <div className="col-xl-4">
              <div className="card checkout-order-summary">
                <div className="card-body">
                  <div className="p-3 bg-light mb-3">
                    <h5 className="font-size-16 mb-0">Order Summary</h5>
                  </div>
                  <div className="table-responsive">
                    <table className="tableOrder table-centered mb-0 table-nowrap">
                      <thead>
                        <tr>
                          <th className="border-top-0" scope="col">
                            Product
                          </th>
                          <th className="border-top-0" scope="col">
                            Amount
                          </th>
                          <th className="border-top-0" scope="col">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.cart.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <img
                                className="img"
                                src={`data:image/jpeg;base64,${item.image}`}
                                alt={item.name}
                              />
                              <p className="font-size-16 text-truncate">
                                {item.name}
                              </p>
                            </td>
                            <td>{item.amount}</td>
                            <td>${item.price * item.amount}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan="2">
                            <h5 className="font-size-14 m-0">Sub Total :</h5>
                          </td>
                          <td>${calculateSubtotal(selectedOrder.cart)}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <h5 className="font-size-14 m-0">
                              Shipping Charge :
                            </h5>
                          </td>
                          <td>${10}</td>
                        </tr>
                        <tr className="bg-light">
                          <td colSpan="2">
                            <h5 className="font-size-14 m-0">Total:</h5>
                          </td>
                          <td>${calculateSubtotal(selectedOrder.cart) + 10}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <h5 className="font-size-14 m-0">Order Status :</h5>
                          </td>
                          <td>
                            <div>{selectedOrder.status}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
