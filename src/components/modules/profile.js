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

const Profile = () => {
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSave = (updatedData) => {
    setProfileData(updatedData);
    sessionStorage.setItem("userProfile", JSON.stringify(updatedData));
    setIsEditing(false);
  };

  return (
    isAuthenticated && (
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
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
                      Editar
                    </Button>
                  </>
                )}
              </Box>
            </Paper>
          </Grid>

          {cookies.favouriteDriver && (
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" sx={{ marginBottom: 4 }} gutterBottom>
                  ¡Este es tu piloto favorito! Un conductor excepcional que
                  siempre da lo mejor en cada carrera.
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
                  ¡Sigue apoyando a {cookies.favouriteDriver.full_name} y
                  disfruta de cada carrera con él al frente!
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
