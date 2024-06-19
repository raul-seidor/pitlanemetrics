import "./App.css";
import Layout from "./layouts/standarLayout";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation("global");
  return (
    <Layout>
      <div>
        <h1>{t("hello")}</h1>
      </div>
    </Layout>
  );
}

export default App;
