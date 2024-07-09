import { Home } from "@mui/icons-material";
import "./App.css";
import About from "./components/modules/about";
import Profile from "./components/modules/profile";
import Layout from "./layouts/standarLayout";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const { t, i18n } = useTranslation("global");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
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
