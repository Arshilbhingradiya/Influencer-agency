import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../store/auth";
import "../layouts/layout.css";

export default function Influlayout() {
  const { IsLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (IsLoading) {
    return <h1>Loading...</h1>;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/influprofile">
              <i className="icon">👤</i> Profile
            </Link>
          </li>
          <li>
            <Link to="/application">
              <i className="icon">📄</i> Application Form
            </Link>
          </li>
        </ul>
      </div>

      {/* Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      {/* Main Content */}
      <div className={`content ${isSidebarOpen ? "shifted" : ""}`}>
        <Outlet />
      </div>
    </>
  );
}
