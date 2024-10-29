import React from "react";
import ContactForm from "../common/contactForm";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * Component that displays a page of information about the site,
 * with a title, a description and a contact form.
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
