import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

/**
 * A component that renders a button with the text "Login" translated to the current language.
 * When clicked, it logs in the user using the Auth0 service.
 *
 * @returns {React.ReactNode} The component.
 */
const LoginButton = () => {
  const { t } = useTranslation("global");
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => loginWithRedirect()}
    >
      {t("login")}
    </Button>
  );
};

export default LoginButton;
