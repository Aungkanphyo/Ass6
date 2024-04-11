import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import "./App.css";
import HomePage from "./view/HomePage/HomePage";
import ProfilePage from "./view/ProfilePage/ProfilePage";
import LoginPage from "./view/LoginPage/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectRoute from "./protect/ProtectRoute";
import Register from "./view/RegisterPage/Register";
import DetailComponent from "./view/DetailPage/DetailComponent";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={
              <ProtectRoute>
                <ProfilePage />
              </ProtectRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail/:postId" element={<DetailComponent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
