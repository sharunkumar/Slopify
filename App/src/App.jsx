import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import SlopboxPage from "./pages/Slopbox";
import ProfilePage from "./pages/ProfilePage";
import "./styles/global.css";

export default function App() {
  return (
    <div className="app" style={{ backgroundColor: "var(--bg-dark)" }}>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/slopbox" element={<SlopboxPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}
