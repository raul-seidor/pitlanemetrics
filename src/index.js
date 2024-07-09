import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import global_es from "./assets/i18n/es.json";
import global_en from "./assets/i18n/en.json";
import "./index.css";

const lang = localStorage.getItem("lang") || "es";

i18next.init({
  interpolation: { escapeValue: false },
  lng: lang,
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-kiccl8m1houg5unh.us.auth0.com"
    clientId="vEkd7BzwFfspnt4sP3lFth1wPdpEOFve"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </React.StrictMode>
  </Auth0Provider>
);

reportWebVitals();
