import React from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, Select } from "@mui/material";

function LenguajeSelector() {
  const { t, i18n } = useTranslation("global");

  const lang = localStorage.getItem("lang") || "es";

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
