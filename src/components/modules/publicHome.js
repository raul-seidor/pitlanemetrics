import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";

const Root = styled("div")({
  height: "90vh",
  backgroundImage: `url('images/wallpaper.jpg')`,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  backgroundBlendMode: "darken",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ContentBox = styled(Box)({
  padding: "4rem",
  borderRadius: "8px",
  textAlign: "center",
  width: "100%",
  height: "80%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const PublicHome = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Root>
      <ContentBox>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: "#fff" }}
        >
          Bienvenido a Pitlane Metrics
        </Typography>
        <Typography
          variant="h6"
          component="p"
          gutterBottom
          sx={{ color: "#fff" }}
        >
          ¡Únete para vivir la experiencia completa!
        </Typography>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          sx={{ color: "#fff" }}
        >
          Regístrate para tener acceso a las últimas noticias, resultados, y
          mucho más.
        </Typography>
        <Button
          onClick={() => loginWithRedirect()}
          variant="contained"
          color="primary"
          sx={{
            marginTop: "2rem",
            padding: "0.75rem 2rem",
            borderColor: "#fff",
            fontSize: "1rem",
          }}
        >
          Regístrate Ahora
        </Button>
      </ContentBox>
    </Root>
  );
};

export default PublicHome;