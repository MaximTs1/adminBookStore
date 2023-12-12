import { useLocation } from "react-router";
import Sidebar from "./components/Sidebar/SideBar";
import Router from "./Router";
import { useState, createContext } from "react";
import Loader from "./components/Loader";
import Snackbar from "./components/Snackbar";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import AutoLogoutHandler from "./AutoLogoutHandler";

export const GeneralContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  const [snackbarText, setSnackbarText] = useState("");

  const snackbar = (text) => {
    setSnackbarText(text);
    setTimeout(() => setSnackbarText(""), 3 * 1000);
  };

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <AuthProvider>
      <AutoLogoutHandler />
      <GeneralContext.Provider
        value={{
          user,
          setLoader,
          snackbar,
        }}
      >
        {!isLoginPage && <Sidebar />}
        <div className="pages">
          <Router />
        </div>
        {loader && <Loader />}
        {snackbarText && <Snackbar text={snackbarText} />}
      </GeneralContext.Provider>
    </AuthProvider>
  );
}

export default App;
