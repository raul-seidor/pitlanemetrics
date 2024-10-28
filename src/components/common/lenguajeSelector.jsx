import React from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, Select } from "@mui/material";

/**
 * LenguajeSelector
 *
 * A dropdown list to select the language to display the app in.
 *
 * @returns A Select component with two options, "es" for Spanish and "en" for English.
 * The selected value is stored in localStorage and used to set the language for the i18next translation tool.
 */
function LenguajeSelector() {
  const { t, i18n } = useTranslation("global");

  const lang = localStorage.getItem("lang") || "es";

  /**
   * changeLanguage
   *
   * Sets the language for the i18next translation tool and stores it in localStorage.
   *
   * @param {string} lng - The language to set. It must be one of the languages in the i18next config.
   */
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <Select
      sx={{
        color: "white",
        border: "none",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiSvgIcon-root": {
          color: "white",
        },
      }}
      value={lang}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      <MenuItem value="es">{t("es")}</MenuItem>
      <MenuItem value="en">{t("en")}</MenuItem>
    </Select>
  );
}

export default LenguajeSelector;
