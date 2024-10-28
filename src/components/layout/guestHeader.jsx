import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import LoginButton from "../common/loginButton";
import { useTranslation } from "react-i18next";

const pages = [{ label: "about", path: "/about" }];

/**
 * GuestHeader
 *
 * Header component for guest users. It displays a logo, navigation menu items and a login button.
 *
 * @returns {JSX.Element} The header component
 */
function GuestHeader() {
  const { t } = useTranslation("global");
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  /**
   * Handles the opening of the navigation menu. Sets the anchor element to the one that was clicked.
   * @param {React.MouseEvent<HTMLElement>} event The event that triggered this function
   */
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  /**
   * Closes the navigation menu by setting the anchor element to null.
   */
  const handleClose = () => {
    setAnchorElNav(null);
  };

  /**
   * Handles the closing of the navigation menu by navigating to the specified path
   * @param {string} path The path to navigate to
   * @returns {Function} A function that closes the menu and navigates to the path
   */
  const handleCloseNavMenu = (path) => () => {
    navigate(path);
    handleClose();
  };
  /**
   * Handles the navigation to the specified path when a navigation menu item is clicked.
   * @param {string} path The path to navigate to
   */
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <AppBar position="static" sx={{ zIndex: 999 }}>
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
              onClose={handleClose}
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

          <Box sx={{ flexGrow: 0 }}>
            <LoginButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default GuestHeader;
