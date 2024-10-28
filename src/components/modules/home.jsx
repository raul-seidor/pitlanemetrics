import React from "react";
import NewsComponent from "../common/news";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Component that renders the homepage of the app.
 *
 * It shows a big background image with a title, a couple of paragraphs
 * and a link to the about page. Under that, it shows the news component
 * with the latest news.
 *
 * @returns {React.ReactElement} The component.
 */
function Home() {
  const { t } = useTranslation("global");
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
        <h2 style={titleStyle}>{t("homeTitle")}</h2>
        <p style={paragraphStyle}>{t("homeText1")}</p>
        <p style={paragraphStyle}>{t("homeText2")}</p>
        <p style={linkStyle} onClick={() => navigate("/about")}>
          {t("homeLinkAbout")}
        </p>
      </section>
      <NewsComponent />
    </div>
  );
}

export default Home;
