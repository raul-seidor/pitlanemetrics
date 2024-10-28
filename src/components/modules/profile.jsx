import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import Loader from "../common/loader";
import ProfileForm from "../common/profileForm";
import { useCookies } from "react-cookie";
import DriverCard from "../common/driverCard";
import { useTranslation } from "react-i18next";

/**
 * Componente que muestra la informaci n del perfil del usuario actual
 * en la pantalla de inicio de la aplicaci n.
 *
 * El componente muestra un formulario para editar la informaci n
 * del perfil del usuario, y un bot n para guardar los cambios.
 * Tambi n muestra un bot n para cancelar la edici n del perfil
 * y regresar a la pantalla de inicio.
 *
 * Si el usuario tiene un conductor favorito, el componente tambi n
 * muestra una tarjeta con la informaci n del conductor favorito.
 */
const Profile = () => {
  const { t } = useTranslation("global");
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    const savedProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    return (
      savedProfile || {
        picture: user?.picture || "",
        email: user?.email || "",
        name: user?.name || "",
        nickname: user?.nickname || "",
      }
    );
  });
  const [cookies] = useCookies(["favouriteDriver"]);

  useEffect(() => {
    const savedProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    if (savedProfile) {
      setProfileData(savedProfile);
    }
  }, [user]);

  if (isLoading) {
    return <Loader />;
  }

  /**
   * Handler para el bot n de editar el perfil del usuario.
   * Al hacer clic en el bot n, se muestra el formulario para editar
   * la informaci n del perfil del usuario.
   */
  const handleEditClick = () => {
    setIsEditing(true);
  };

  /**
   * Handler para el bot n de cancelar la edici n del perfil del usuario.
   * Al hacer clic en el bot n, se oculta el formulario para editar
   * la informaci n del perfil del usuario y se vuelve al estado
   * original.
   */
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  /**
   * Handler para el bot n de guardar los cambios en el perfil del usuario.
   * Al hacer clic en el bot n, se actualiza el perfil del usuario con los datos
   * proporcionados y se oculta el formulario para editar la informaci n del
   * perfil del usuario.
   * @param {Object} updatedData - Los datos actualizados del perfil del usuario.
   */
  const handleSave = (updatedData) => {
    setProfileData(updatedData);
    sessionStorage.setItem("userProfile", JSON.stringify(updatedData));
    setIsEditing(false);
  };

  return (
    isAuthenticated && (
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{
            marginTop: { xs: 0, md: 4 },
          }}
          justifyContent="center"
        >
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3, height: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Avatar
                  alt={profileData.name}
                  src={profileData.picture}
                  sx={{ width: 100, height: 100, marginBottom: 2 }}
                />
                {isEditing ? (
                  <ProfileForm
                    initialData={profileData}
                    onCancel={handleCancelClick}
                    onSave={handleSave}
                  />
                ) : (
                  <>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontWeight: "bold" }}
                    >
                      {profileData.email}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      gutterBottom
                    >
                      {profileData.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      gutterBottom
                    >
                      {profileData.nickname}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleEditClick}
                      sx={{ marginTop: 2 }}
                    >
                      {t("profileBtnEdit")}
                    </Button>
                  </>
                )}
              </Box>
            </Paper>
          </Grid>

          {cookies.favouriteDriver && (
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 3, height: "100%" }}>
                <Typography variant="h6" sx={{ marginBottom: 4 }} gutterBottom>
                  {t("favouriteDriverTitle")}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <DriverCard
                    img={cookies.favouriteDriver.headshot_url}
                    nombre={cookies.favouriteDriver.full_name}
                    equipo={cookies.favouriteDriver.team_name}
                    colorEquipo={cookies.favouriteDriver.team_colour}
                    numero={cookies.favouriteDriver.driver_number}
                    isFavourite={true}
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  sx={{ marginTop: 2 }}
                >
                  {t("favouriteDriverText1")}
                  {cookies.favouriteDriver.full_name}
                  {t("favouriteDriverText2")}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    )
  );
};

export default Profile;
