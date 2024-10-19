import React from "react";
import ContactForm from "../common/contactForm";
import { Typography } from "@mui/material";

function About() {
  return (
    <div style={{ marginTop: "3rem" }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", color: "#D32F2F" }}
      >
        Sobre este proyecto
      </Typography>
      <Typography
        variant="h6"
        component="p"
        maxWidth={800}
        margin={"0 auto"}
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "5rem", color: "#555" }}
      >
        Este proyecto personal ha sido desarrollado como parte de mi evaluación
        en mi puesto de trabajo actual y consiste en desarrollar un proyecto en
        React, que contenga como mínimo: enrutamiento, componentes
        reutilizables, integraciones con API, formularios, manejo de errores,
        internacionalización, persistencia de datos, autenticación, Hooks y
        pruebas unitarias con JEST.
      </Typography>
      <ContactForm />
    </div>
  );
}

export default About;
