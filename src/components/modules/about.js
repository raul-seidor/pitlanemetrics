import React from "react";
import ContactForm from "../common/contactForm";
import { Typography } from "@mui/material";

function About() {
  return (
    <div>

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
        sx={{ textAlign: "center", marginBottom: "50px", color: "#555" }}
      >
        Este proyecto personal ha sido desarrollado como parte de mi evaluación
        en mi puesto de trabajo actual. La idea es crear una aplicación que
        permita a los aficionados de la Fórmula 1 seguir las últimas noticias,
        estadísticas y resultados de las carreras. Este proyecto no solo
        demuestra mis habilidades en programación y desarrollo web, sino que
        también refleja mi pasión por el automovilismo y el deseo de mejorar
        continuamente en mi campo profesional.
      </Typography>
      <ContactForm />
    </div>
  );
}

export default About;
