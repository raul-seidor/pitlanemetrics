import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Typography,
  Menu,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

import Loader from "../common/loader";
import LenguajeSelector from "../common/lenguajeSelector";
import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "../../contexts/themeContexts";
import { useTranslation } from "react-i18next";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const pages = [
  { label: "home", path: "/" },
  { label: "championships", path: "/championships" },
  { label: "drivers", path: "/drivers" },
  { label: "Drivers (RTK)", path: "/drivers-rtk" },
  { label: "about", path: "/about" },
];

const settings = [
  { label: "profile", path: "/profile" },
  { label: "logout", path: "/" },
];

function Header() {
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const { user, isLoading, logout } = useAuth0();
  const { theme, toggleTheme } = useTheme();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  /**
   * Opens the navigation menu by setting the anchor element to the one that triggered the event.
   * @param {React.MouseEvent<HTMLElement>} event - The event that triggered the menu to open.
   */
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  /**
   * Opens the user menu by setting the anchor element to the one that triggered the event.
   * @param {React.MouseEvent<HTMLElement>} event - The event that triggered the menu to open.
   */
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  /**
   * Closes the navigation menu by setting the anchor element to null.
   */
  const handleCloseNav = () => {
    setAnchorElNav(null);
  };

  /**
   * Closes the user menu by setting the anchor element to null.
   */
  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  /**
   * Closes the navigation menu and navigates to the given path.
   * @param {string} path - The path to navigate to.
   * @returns {function} - A function that can be used as an event handler.
   */
  const handleCloseNavMenu = (path) => () => {
    navigate(path);
    handleCloseNav();
  };

  /**
   * Closes the user menu and navigates to the given path.
   * @param {string} path - The path to navigate to.
   */
  const handleCloseUserMenu = (path) => {
    navigate(path);
    handleCloseUser();
  };

  /**
   * Navigates to the specified path.
   * @param {string} path - The path to navigate to.
   */
  const handleClick = (path) => {
    navigate(path);
  };

  /**
   * Clears the session storage and logs out the user using the Auth0 logout functionality.
   * The user is redirected to the origin of the application.
   */
  const logoutHandler = () => {
    sessionStorage.clear();
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="images/icons/f1.png"
            alt="logo"
            width={30}
            height={30}
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => handleClick("/")}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => handleClick("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            PITLANE METRICS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNav}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={handleCloseNavMenu(page.path)}
                >
                  <Typography textAlign="center">{t(page.label)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu(page.path)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t(page.label)}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              title="Toggle Theme"
            >
              {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <LenguajeSelector />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.name} src={user.picture} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUser}
            >
              {settings.map((setting) =>
                setting.label === "logout" ? (
                  <MenuItem key={setting.label} onClick={logoutHandler}>
                    <Typography textAlign="center">
                      {t(setting.label)}
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem
                    key={setting.label}
                    onClick={() => handleCloseUserMenu(setting.path)}
                  >
                    <Typography textAlign="center">
                      {t(setting.label)}
                    </Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
