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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: "'Titillium Web', sans-serif !important",
  },
});

function App() {
  const { t, i18n } = useTranslation("global");
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Restablece estilos base */}
      <div className="App">
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
              // Rutas para usuarios no autenticados
              <Route element={<GuestLayout />}>
                <Route index element={<PublicHome />} />
                <Route path="about" element={<About />} />
              </Route>
            )}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;