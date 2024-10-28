import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * A component that renders a button to log out from the Auth0 session.
 * When the button is clicked, it calls the `logout` function from `@auth0/auth0-react`
 * with the `returnTo` parameter set to the current `window.location.origin`.
 * This will redirect the user to the specified URL after the log out process is
 * completed.
 */
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
