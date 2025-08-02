import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./RegisterPage/RegisterPage";
import LoginPage from "./LoginPage/LoginPage";

function App() {  
  return (
    <Router>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <nav>
          <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
