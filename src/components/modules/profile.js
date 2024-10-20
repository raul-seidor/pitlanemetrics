import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../common/loader";
import ProfileForm from "../common/profileForm";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        {isEditing ? (
          <ProfileForm />
        ) : (
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <button onClick={handleEditClick}>Editar</button>
          </div>
        )}
      </div>
    )
  );
};

export default Profile;
