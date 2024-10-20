import React, { useReducer } from "react";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";

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
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

// Función para validar los datos del formulario
const validateForm = (state) => {
  const errors = {};
  if (!state.email.trim()) errors.email = "El email es requerido";
  if (!/\S+@\S+\.\S+/.test(state.email)) errors.email = "El email no es válido";
  if (!state.name.trim()) errors.name = "El nombre es requerido";
  if (!state.nickname.trim()) errors.nickname = "El nickname es requerido";
  return errors;
};

const ProfileForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(state);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
    } else {
      alert("Perfil actualizado con éxito");
      dispatch({ type: "RESET" });
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
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", color: "#D32F2F" }}
      >
        Editar Perfil
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
            fullWidth
            required
            error={!!state.errors.email}
            helperText={state.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            name="name"
            value={state.name}
            onChange={handleChange}
            fullWidth
            required
            error={!!state.errors.name}
            helperText={state.errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nickname"
            name="nickname"
            value={state.nickname}
            onChange={handleChange}
            fullWidth
            required
            error={!!state.errors.nickname}
            helperText={state.errors.nickname}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Guardar Cambios
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileForm;