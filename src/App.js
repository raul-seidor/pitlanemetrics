import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./components/auth/protectedRoute";
import About from "./components/modules/about";
import Home from "./components/modules/home";
import Championships from "./components/modules/championships";
import Profile from "./components/modules/profile";
import GuestLayout from "./layouts/guestLayout";
import Layout from "./layouts/standarLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicHome from "./components/modules/publicHome";
import Loader from "./components/common/loader";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "./contexts/themeContexts";
import Drivers from "./components/modules/drivers";

/**
 * The main app component, wraps the InnerApp component
 * and adds a dark mode class to the root element if the theme is dark.
 *
 * @returns {React.ReactElement} The JSX element.
 */
const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { theme } = useTheme();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`App ${theme === "dark" ? "dark-mode" : ""}`}>
      <InnerApp isAuthenticated={isAuthenticated} />
    </div>
  );
};

/**
 * The inner app component, this is the actual app router.
 *
 * Renders either the Layout or the GuestLayout component
 * depending on the isAuthenticated prop.
 *
 * If isAuthenticated is true, it renders the Layout component
 * and the routes for the home, championships, drivers, about and profile.
 * If isAuthenticated is false, it renders the GuestLayout component
 * and the routes for the public home and about.
 *
 * @param {boolean} isAuthenticated - If the user is authenticated or not.
 * @returns {React.ReactElement} The JSX element.
 */
const InnerApp = ({ isAuthenticated }) => {
  const { theme } = useTheme();

  const muiTheme = createTheme({
    typography: {
      fontFamily: "'Titillium Web', sans-serif !important",
    },
    palette: {
      mode: theme,
    },
  });

  return (
    <MUIThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {isAuthenticated ? (
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="championships" element={<Championships />} />
              <Route path="drivers" element={<Drivers />} />
              <Route path="about" element={<About />} />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Route>
          ) : (
            <Route element={<GuestLayout />}>
              <Route index element={<PublicHome />} />
              <Route path="about" element={<About />} />
            </Route>
          )}
        </Routes>
      </Router>
    </MUIThemeProvider>
  );
};

export default App;
