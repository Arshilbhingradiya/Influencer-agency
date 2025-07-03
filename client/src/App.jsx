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

// import CompanyPanel from "./components/CompanyPage/CompanyPanel";
import Influprofile from "./components/InfluensorPage/influprofile";
import Companydashboard from "./components/CompanyPage/Dashboard";

import { useState } from "react";
import CampaignDetail from "./components/CompanyPage/CampaignDetail";
import CreateCampaign from "./components/CompanyPage/CreateCampaign";
import CampaignList from "./components/CompanyPage/CampaignList";
import EditCampaign from "./pages/EditCampaign";
import { Dashboard } from "@mui/icons-material";
import InfluDashboard from "./components/InfluensorPage/Infludashboard";
import AppliedCampaigns from "./components/InfluensorPage/AppliedCampaigns";
import AvailableCampaigns from "./components/InfluensorPage/AvailableCampaigns";
import CampaigninfluDetail from "./components/InfluensorPage/CampaigninfluDetail";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Navbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        <div style={{ marginLeft: drawerOpen ? 260 : 0, transition: 'margin-left 0.3s' }}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/service" element={<Service />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/logout" element={<Logout setDrawerOpen={setDrawerOpen} />}></Route>

            {/* // company */}
            <Route path="/companyprofile" element={<Profile />}></Route>
            <Route path="/companydashboard" element={<Companydashboard />}></Route>
            <Route path="/campaigns/:id" element={<CampaignDetail />}></Route>
            <Route path="/campaignlist" element={<CampaignList />}></Route>
            <Route path="/createcampaign" element={<CreateCampaign />}></Route>
            <Route path="/campaigns/edit/:id" element={<EditCampaign />} />
            {/* influensor */}

            <Route path="/influprofile" element={<Influprofile />}></Route>
            <Route path="/appliedcampaigns" element={<AppliedCampaigns />}></Route>
            <Route path="/infludashboard" element={<InfluDashboard />}></Route>
            <Route path="/availablecampaigns" element={<AvailableCampaigns />}></Route>
            <Route path="/campaign/:id" element={<CampaigninfluDetail />}></Route>

            {/* admin  */}
            <Route path="/admin" element={<Adminlayout />}></Route>
            <Route path="/Admin" element={<Adminlayout />}>
              {/* // we not need to write "/users beacuse nested Route is automaticaly consider like " Admin/users" */}
              <Route path="users" element={<Adminusers />} />
              <Route path="contacts" element={<Admincontacts />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
