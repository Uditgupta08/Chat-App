import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Land from "./pages/Land/Land";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { isAuth } = useAuthContext();
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          // element={<Land />}
          element={isAuth ? <Land /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
