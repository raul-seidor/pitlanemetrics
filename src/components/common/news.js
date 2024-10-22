import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  CardMedia,
  Grid,
  Pagination,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const news = [
  {
    title: "¡Fernando Alonso gana su carrera número 33!",
    description:
      "El piloto español Fernando Alonso ha logrado su tan esperada victoria número 33 en el Gran Premio de Japón. Un hito histórico en su carrera.",
    date: "4 de octubre de 2024",
    image: "alonso_33.webp",
  },
  {
    title: "Sebastian Vettel vuelve a la Fórmula 1",
    description:
      "Sebastian Vettel ha anunciado su regreso a la Fórmula 1 para la temporada 2025 con el equipo Red Bull. Los fanáticos están entusiasmados por su retorno.",
    date: "4 de octubre de 2024",
    image: "Sebatian-Vettel.jpg",
  },
  {
    title: "Lewis Hamilton rompe récord de poles",
    description:
      "Con una espectacular vuelta en Monza, Lewis Hamilton se convierte en el piloto con más poles en la historia de la F1, alcanzando las 104.",
    date: "27 de septiembre de 2024",
    image: "lewis-hamilton.webp",
  },
  {
    title: "Max Verstappen asegura su tercer campeonato mundial",
    description:
      "El piloto neerlandés Max Verstappen se coronó campeón del mundo por tercera vez consecutiva en el Gran Premio de México.",
    date: "15 de septiembre de 2024",
    image: "max-verstappen.jpg",
  },
  {
    title: "Carlos Sainz firma extensión con Ferrari hasta 2026",
    description:
      "El equipo Ferrari ha confirmado la renovación del contrato de Carlos Sainz hasta el 2026, asegurando su lugar en la escudería italiana por dos años más.",
    date: "10 de agosto de 2024",
    image: "Carlos-Sainz.jpg",
  },
  {
    title: "Oscar Piastri logra su primer podio en la F1",
    description:
      "El joven piloto australiano de McLaren, Oscar Piastri, subió al podio por primera vez en su carrera en el Gran Premio de Bélgica.",
    date: "3 de julio de 2024",
    image: "oscar-piastri.jpg",
  },
  {
    title: "George Russell gana su primera carrera en F1",
    description:
      "George Russell obtuvo su primera victoria en la Fórmula 1 en el Gran Premio de Canadá, dominando una carrera llena de acción.",
    date: "12 de junio de 2024",
    image: "george-russell.jpg",
  },
  {
    title: "Red Bull anuncia nuevo patrocinio con Puma",
    description:
      "El equipo Red Bull ha firmado un acuerdo de patrocinio con la marca deportiva Puma, que comenzará en la temporada 2025.",
    date: "29 de mayo de 2024",
    image: "redbull.webp",
  },
  {
    title: "Mercedes planea gran actualización para la próxima temporada",
    description:
      "El equipo Mercedes ha anunciado una actualización significativa para el chasis y motor en la temporada 2025 para volver a pelear por el título.",
    date: "22 de mayo de 2024",
    image: "mercedes.jpg",
  },
  {
    title: "Lando Norris renueva contrato con McLaren hasta 2027",
    description:
      "Lando Norris ha renovado su contrato con McLaren hasta 2027, consolidando su futuro en el equipo británico por varios años más.",
    date: "15 de abril de 2024",
    image: "lando-norris.jpg",
  },
  {
    title: "Esteban Ocon sorprende con podio en Mónaco",
    description:
      "El piloto francés Esteban Ocon sorprendió a todos al conseguir el tercer lugar en el prestigioso Gran Premio de Mónaco.",
    date: "28 de marzo de 2024",
    image: "esteban-ocon.webp",
  },
  {
    title: "Nyck de Vries se une al equipo Williams en 2025",
    description:
      "El joven piloto holandés Nyck de Vries ha sido confirmado como piloto de Williams para la temporada 2025, reemplazando a Logan Sargeant.",
    date: "14 de marzo de 2024",
    image: "deVries.jpg",
  },
];

export default function NewsComponent() {
  const { t } = useTranslation("global");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const handleChange = (event, value) => setPage(value);

  const displayedNews = news.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", color: "#D32F2F" }}
      >
        {t("newsTitle")}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "30px", color: "#555" }}
      >
        {t("newsDescription")}
      </Typography>

      <Grid
        container
        spacing={3}
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        {displayedNews.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ width: 300, height: 400 }}>
              <CardActionArea sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`images/${item.image}`}
                  alt={item.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "200px",
                    padding: "16px",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ marginBottom: "8px" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      height: "40px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    color="text.secondary"
                    align="right"
                    sx={{ marginTop: "auto" }}
                  >
                    {item.date}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(news.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        sx={{ display: "flex", justifyContent: "center", mt: 3 }}
      />
    </Box>
  );
}
