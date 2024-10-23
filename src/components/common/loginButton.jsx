import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

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
