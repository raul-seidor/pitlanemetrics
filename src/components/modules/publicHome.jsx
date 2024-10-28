import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

const Root = styled("div")({
  backgroundImage: `url('images/wallpaper.jpg')`,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  backgroundBlendMode: "darken",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  objectFit: "cover",
  width: "100%",
  height: "100%",
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

/**
 * Component that renders the public home page. It displays a background image
 * with a container that has a title, a subtitle, a description and a button
 * to register/login.
 *
 * @returns {React.ReactElement} The public home page component.
 */
const PublicHome = () => {
  const { t } = useTranslation("global");
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
          {t("publicHomeTitle")}
        </Typography>
        <Typography
          variant="h6"
          component="p"
          gutterBottom
          sx={{ color: "#fff" }}
        >
          {t("publicHomeSubtitle")}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          sx={{ color: "#fff" }}
        >
          {t("publicHomeDescription")}
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
          {t("publicHomeRegisterBtn")}
        </Button>
      </ContentBox>
    </Root>
  );
};

export default PublicHome;
