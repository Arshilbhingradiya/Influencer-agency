import { useAuth } from "../store/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Box,
  createTheme,
  ThemeProvider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Search,
  AccountCircle,
  Notifications,
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Login as LoginIcon,
  HowToReg as SignupIcon,
  BusinessCenter,
  Dashboard as DashboardIcon,
  Store,
  Assignment,
  ExitToApp,
  MenuBook,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ drawerOpen, setDrawerOpen }) => {
  const { isLoggedIn, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  console.log("User Object: ", user);
  console.log("User Role: ", user?.role);
  // Theme configuration with updated colors
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#0D47A1", // Deep Blue
      },
      secondary: {
        main: "#FF6F00", // Vibrant Orange
      },
      text: {
        primary: darkMode ? "#ffffff" : "#0D47A1",
      },
    },
  });

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handledashboard = () => {
    setAnchorEl(null);
    if (user?.role === "influencer") {
      navigate("/doctordashboard");
    } else if (user?.role === "company") {
      navigate("/companydashboard");
    }
  };
  const handlecampaignform = () => {
    setAnchorEl(null);
    if (user?.role === "influencer") {
      navigate("/patientappoinment");
    } else if (user?.role === "company") {
      navigate("/campaignform");
    }
  };
  const handleprofile = () => {
    setAnchorEl(null);
    if (user?.role === "influencer") {
      navigate("/influprofile");
    } else if (user?.role === "company") {
      navigate("/companyprofile");
    }
  };
  const handleproductpage = () => {
    setAnchorEl(null);
    navigate("/productpage");
  };
  // const handledoctorsettings = () => {};
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    setDrawerOpen(false);
    navigate("/logout");
  };
  const handlesearch = () => {
    navigate("/doctorsearch");
  };
  const handleAppointmentCTA = () => {
    if (user.role == "patient") {
      navigate("/patientappoinment");
    }
  };
  const handlemedicare = () => {
    navigate("/");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" sx={{ bgcolor: theme.palette.primary.main }}>
        <Toolbar>
          {/* Logo */}
          <Typography
            type="button"
            variant="h6"
            onClick={handlemedicare}
            sx={{ flexGrow: 1, marginLeft: "50px", color: "#FFF" }}
          >
            Brandvoyage
          </Typography>

          {/* Navigation Links */}
          <Button sx={{ color: "#FFF" }}>
            <Link to="/" className="nav-link text-white">
              Home
            </Link>
          </Button>
          <Button sx={{ color: "#FFF" }}>
            <Link to="/about" className="nav-link text-white">
              About
            </Link>
          </Button>
          <Button sx={{ color: "#FFF" }}>
            <Link to="/service" className="nav-link text-white">
              Service
            </Link>
          </Button>
          <Button sx={{ color: "#FFF" }}>
            <Link to="/contact" className="nav-link text-white">
              Contact
            </Link>
          </Button>

          {/* Notifications */}
          <IconButton sx={{ color: "#FFF" }}>
            <Notifications />
          </IconButton>

          {/* Auth Section */}
          {isLoggedIn ? (
            <>
              <IconButton
                sx={{ color: "#FFF" }}
                onClick={() => setDrawerOpen(!drawerOpen)}
              >
                <AccountCircle />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                variant="persistent"
              >
                <Box
                  sx={{ width: 260 }}
                  role="presentation"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0 12px 0' }}>
                    <img src="/logo.png" alt="Logo" style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 16 }} />
                  </div>
                  <List>
                    <ListItem button onClick={handleprofile}>
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </ListItem>
                    {user?.role === "company" && (
                      <>
                        <ListItem button onClick={() => { navigate("/companydashboard"); }}>
                          <ListItemIcon>
                            <BusinessCenter />
                          </ListItemIcon>
                          <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button onClick={() => { navigate("/campaignlist"); }}>
                          <ListItemIcon>
                            <BusinessCenter />
                          </ListItemIcon>
                          <ListItemText primary="Campaign List" />
                        </ListItem>
                        <ListItem button onClick={() => { navigate("/createcampaign"); }}>
                          <ListItemIcon>
                            <BusinessCenter />
                          </ListItemIcon>
                          <ListItemText primary="Create Campaign" />
                        </ListItem>
                      </>
                    )}

{user?.role === "influencer" && (
                      <>
                        <ListItem button onClick={() => { navigate("/infludashboard"); }}>
                          <ListItemIcon>
                            <BusinessCenter />
                          </ListItemIcon>
                          <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button onClick={() => { navigate("/availablecampaigns"); }}>
                          <ListItemIcon>
                            <BusinessCenter />
                          </ListItemIcon>
                          <ListItemText primary="Available Campaigns" />
                        </ListItem>
                        <ListItem button onClick={() => { navigate("/appliedcampaigns"); }}>
                          <ListItemIcon>
                            <BusinessCenter />
                          </ListItemIcon>
                          <ListItemText primary="Applied Campaigns" />
                        </ListItem>
                      </>
                    )}
                      
                    <Divider />
                    <ListItem button onClick={handleLogout}>
                      <ListItemIcon>
                        <ExitToApp />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                sx={{ color: "#FFF" }}
                startIcon={<LoginIcon />}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                sx={{ color: "#FFF" }}
                startIcon={<SignupIcon />}
                onClick={handleSignup}
              >
                Signup
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;