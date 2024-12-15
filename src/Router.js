import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Pages/Home/Home";
import AddCard from "./Pages/addCard/AddCard";
import UserManage from "./Pages/userManage/UserManage";
import BookManage from "./Pages/BookManage/BookManage";
// import Order from "./Pages/Order/Order";
import Login from "./Pages/LoginPage/Login";
import CreateAdmin from "./Pages/LoginPage/createAdminPage";
import EditBook from "./Pages/editBook/editBook";
import MuiOrder from "./Pages/Order/MuiOrder";

export default function Router() {
  return (
    <Routes>

      <Route path="/createadmin" element={<CreateAdmin />} />

      <Route path="/login" element={<Login />} />
      

      <Route
        exact
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/usermanage"
        element={
          <ProtectedRoute>
            <UserManage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookmanage"
        element={
          <ProtectedRoute>
            <BookManage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addcard"
        element={
          <ProtectedRoute>
            <AddCard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Order"
        element={
          <ProtectedRoute>
            <MuiOrder />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/OrderDashboard"
        element={
          <ProtectedRoute>
            <OrderDashboard />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/editCard"
        element={
          <ProtectedRoute>
            <EditBook />
          </ProtectedRoute>
        }
      />
      
    </Routes>
  );
}
