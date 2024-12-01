import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { useState } from "react";
import "../layouts/layout.css";
export default function Companylayout() {
  const { IsLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (IsLoading) {
    return <h1>loadin ...</h1>;
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/companyprofile">
              <i className="icon">👤</i> Profile
            </Link>
          </li>
          <li>
            <Link to="/productpage">
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
