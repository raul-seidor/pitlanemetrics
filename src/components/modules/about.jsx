import React from "react";
import ContactForm from "../common/contactForm";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * Componente que muestra una p gina de informaci n acerca del sitio,
 * con un t tulo, una descripci n y un formulario de contacto.
 *
 * @returns {JSX.Element}
 */
function About() {
  const { t } = useTranslation("global");
  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", color: "#D32F2F" }}
      >
        {t("aboutTitle")}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        maxWidth={800}
        margin={"0 auto"}
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "5rem", color: "#555" }}
      >
        {t("aboutDescription")}
      </Typography>
      <ContactForm />
    </>
  );
}

export default About;
