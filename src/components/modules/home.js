import React from "react";
import NewsComponent from "../common/news";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const sectionStyle = {
    backgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('images/f1-home.avif')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    marginBottom: "5rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  };

  const titleStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#e10600",
    textTransform: "uppercase",
    letterSpacing: "2px",
  };

  const paragraphStyle = {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const linkStyle = {
    color: "#e10600",
    cursor: "pointer",
    textDecoration: "none",
    fontWeight: "bold",
  };

  return (
    <div>
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Bienvenido a la Fórmula 1</h2>
        <p style={paragraphStyle}>
          La Fórmula 1 es la categoría de automovilismo más prestigiosa y
          seguida en el mundo. Con una historia que se remonta a 1950, cuenta
          con los autos más rápidos y avanzados tecnológicamente, compitiendo en
          algunos de los circuitos más icónicos del planeta.
        </p>
        <p style={paragraphStyle}>
          Cada temporada está llena de emociones con equipos legendarios como
          Ferrari, Mercedes y Red Bull, y pilotos que desafían los límites de la
          velocidad y la habilidad. Mantente al tanto de las últimas noticias y
          eventos de la F1 aquí.
        </p>
        <p style={linkStyle} onClick={() => navigate("/about")}>
          Conoce más sobre nosotros.
        </p>
      </section>
      <NewsComponent />
    </div>
  );
}

export default Home;
