import React, { useReducer, useEffect } from "react";
import { TextField, Button, Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

// Estado inicial del formulario
const initialState = {
  email: "",
  name: "",
  nickname: "",
  errors: {},
};

// Reducer para manejar las acciones del formulario
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    case "SET_INITIAL_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

// Función para validar los datos del formulario
const validateForm = (state , t) => {
  const errors = {};
  if (!/\S+@\S+\.\S+/.test(state.email)) errors.email = t("emailErrorFormat");
  if (!state.email.trim()) errors.email = t("emailErrorRequired");
  if (!state.name.trim()) errors.name = t("nameErrorRequired");
  if (!state.nickname.trim()) errors.nickname = t("nicknameErrorRequired");  
  console.log(errors);
  
  return errors;
};

const ProfileForm = ({ initialData, onCancel, onSave }) => {
  const { t } = useTranslation("global");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (initialData) {
      dispatch({ type: "SET_INITIAL_DATA", payload: initialData });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(state, t);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
    } else {
      sessionStorage.setItem("userProfile", JSON.stringify(state));
      onSave(state);
    }
  };

  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label={t("email")}
            name="email"
            value={state.email}
            onChange={handleChange}
            fullWidth
            error={!!state.errors.email}
            helperText={state.errors.email}
            inputProps={{ "data-testid": "email" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("name")}
            name="name"
            value={state.name}
            onChange={handleChange}
            fullWidth
            error={!!state.errors.name}
            helperText={state.errors.name}
            inputProps={{ "data-testid": "name" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("nickname")}
            name="nickname"
            value={state.nickname}
            onChange={handleChange}
            fullWidth
            error={!!state.errors.nickname}
            helperText={state.errors.nickname}
            inputProps={{ "data-testid": "nickname" }}
          />
        </Grid>
        <Grid item xs={12} md={6} >
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={onCancel}
          >
            {t("profileBtnCancel")}
          </Button>
        </Grid>
        <Grid item xs={12} md={6} >
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {t("profileFormSubmitBtn")}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileForm;
