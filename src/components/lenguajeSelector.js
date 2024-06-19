import React from "react";
import { useTranslation } from "react-i18next";

function LenguajeSelector() {
  const { t, i18n } = useTranslation();

  const lang = localStorage.getItem("lang") || "es";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <select value={lang} onChange={(e) => changeLanguage(e.target.value)}>
      <option value="es">{t("es")}</option>
      <option value="en">{t("en")}</option>
    </select>
  );
}

export default LenguajeSelector;
