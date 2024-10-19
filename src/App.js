import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./components/auth/protectedRoute";
import About from "./components/modules/about";
import Home from "./components/modules/home";
import Championships from "./components/modules/championships";
import Profile from "./components/modules/profile";
import GuestLayout from "./layouts/guestLayout";
import Layout from "./layouts/standarLayout";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicHome from "./components/modules/publicHome";
import Loader from "./components/common/loader";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "./contexts/themeContexts";

const App = () => {
  const { t, i18n } = useTranslation("global");
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
      <CssBaseline /> {/* Restablece estilos base */}
      <Router>
        <Routes>
          {isAuthenticated ? (
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="championships" element={<Championships />} />
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
