import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../store/auth";
import Influlayout from "./InfluensorPage/Influlayout";
import Companylayout from "./CompanyPage/Companylayout";

function Navbar() {
  const { isLoggedIn, user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarType, setSidebarType] = useState(null);

  const handleSidebarToggle = () => {
    setSidebarType(user.role); // Set sidebar type based on user role
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar visibility
  };

  return (
    <>
      <header className="navbar-custom p-3 text-bg-dark">
        <div className="container d-flex align-items-center justify-content-between">
          <Link to="/" className="navbar-logo text-white text-decoration-none">
            <img
              src="/logo.png"
              alt="Logo"
              className="logo"
              style={{ width: "100px", height: "50px" }}
            />
          </Link>

          <nav className="navbar-links">
            <ul className="nav d-flex align-items-center">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-white">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/service" className="nav-link text-white">
                  Service
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link text-white">
                  Contact
                </Link>
              </li>
              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="nav-link btn btn-outline-light ms-3"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/signup"
                      className="nav-link btn btn-warning ms-2"
                    >
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-check"
                      viewBox="0 0 16 16"
                      onClick={handleSidebarToggle}
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                      <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                    </svg>
                  }
                  <Link to="/logout" className="btn btn-outline-light ms-3">
                    logout
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      {isSidebarOpen && (
        <div className="flex">
          <div className="sidebar-container">
            {sidebarType === "influencer" && <Influlayout />}
            {sidebarType === "company" && <Companylayout />}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
