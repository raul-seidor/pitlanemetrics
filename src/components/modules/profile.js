import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Typography, Button, Box, Container } from "@mui/material";
import Loader from "../common/loader";
import ProfileForm from "../common/profileForm";

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
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            marginTop: 4,
            bgcolor: "#f5f5f5",
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
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {profileData.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
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
      </Container>
    )
  );
};

export default Profile;
