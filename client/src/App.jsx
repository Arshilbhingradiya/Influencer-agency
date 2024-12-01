import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Contact from "./pages/contact";
import Service from "./pages/Service";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import { Logout } from "./pages/logout";
import Adminlayout from "./components/layouts/Admin-layout";
import Adminusers from "./pages/Adminusers";
import Admincontacts from "./pages/Admincontacts";

import Profile from "./components/CompanyPage/profile";
import ProductPage from "./components/CompanyPage/productpage";

import Influprofile from "./components/InfluensorPage/influprofile";
import Companydashboard from "./components/CompanyPage/Dashboard";
import Application from "./components/InfluensorPage/Application";
import Infludashboard from "./components/InfluensorPage/infludashboard";
import Companylayout from "./components/CompanyPage/Companylayout";
import Influlayout from "./components/InfluensorPage/Influlayout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/service" element={<Service />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/logout" element={<Logout />}></Route>

          {/* // company */}
          <Route path="/companyprofile" element={<Profile />}></Route>
          <Route path="/productpage" element={<ProductPage />}></Route>
          <Route
            path="/companydashboard"
            element={<Companydashboard />}
          ></Route>
          <Route path="/companylayout" element={<Companylayout />}></Route>

          {/* influensor */}

          <Route path="/influprofile" element={<Influprofile />}></Route>
          <Route path="/application" element={<Application />}></Route>
          <Route path="/infludashboard" element={<Infludashboard />}></Route>
          <Route path="/influlayout" element={<Influlayout />}></Route>

          {/* admin  */}
          <Route path="/admin" element={<Adminlayout />}></Route>
          <Route path="/Admin" element={<Adminlayout />}>
            {/* // we not need to write "/users beacuse nested Route is automaticaly consider like " Admin/users" */}
            <Route path="users" element={<Adminusers />} />
            <Route path="contacts" element={<Admincontacts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
