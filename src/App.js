import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./components/auth/protectedRoute";
import About from "./components/modules/about";
import Home from "./components/modules/home";
import Profile from "./components/modules/profile";
import GuestLayout from "./layouts/guestLayout";
import Layout from "./layouts/standarLayout";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { t, i18n } = useTranslation("global");

  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          {isAuthenticated ? (
            <Route element={<Layout />}>
              <Route index element={<Home />} />
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
            // Rutas para usuarios no autenticados
            <Route element={<GuestLayout />}>
              <Route index element={<Home />} />
            </Route>
          )}
        </Routes>
      </Router>
    </div>

    // <Layout>
    //   <div>
    //     <h1>{t("hello")}</h1>
    //   </div>
    // </Layout>
  );
}

export default App;
