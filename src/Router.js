import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Pages/Home/Home";
import UserManage from "./Pages/userManage/UserManage";
import AddCard from "./Pages/addCard/AddCard";
import BookManage from "./Pages/BookManage/BookManage";
import Projects from "./Pages/Projects/Projects";
import Login from "./Pages/LoginPage/Login";
import EditBook from "./Pages/editBook/editBook";

export default function Router() {
  return (
    <Routes>
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
        path="/projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />
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
