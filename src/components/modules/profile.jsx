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
 * Component that displays the current user's profile information on the application's home screen.
 * on the home screen of the application.
 *
 * The component displays a form for editing the user's profile information, and a button for saving changes.
 * The component displays a form for editing the user's profile information, and a button for saving changes.
 It also displays a button to cancel the editing of the profile and return to the * home screen.
 * and return to the home screen.
 *
 If the user has a favourite driver, the component also * displays a card with the driver's information.
 If the user has a favourite driver, the component also * displays a card with the favourite driver information.
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
   * Handler for the button to edit the user's profile.
   * When the button is clicked, the form for editing the user's profile information is displayed.
   * The user's profile information.
   */
  const handleEditClick = () => {
    setIsEditing(true);
  };

  /**
   * Handler for the button to cancel editing the user's profile.
   * Clicking the button hides the form for editing the user's profile information and returns to the state of the user profile.
   * The user's profile information and returns to the original state.
   * original.
   */
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  /**
   * Handler for the button to save changes to the user's profile.
   * Clicking the button updates the user's profile with the provided data and hides the form for editing the user's information.
   * The form for editing the user's profile information is hidden.
   * user's profile.
   * @param {Object} updatedData - The updated data in the user profile.
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
                    name={cookies.favouriteDriver.full_name}
                    team={cookies.favouriteDriver.team_name}
                    teamColor={cookies.favouriteDriver.team_colour}
                    number={cookies.favouriteDriver.driver_number}
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
