import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{9}$/;
  return phoneRegex.test(phone);
};

const validateDNI = (dni) => {
  const dniRegex = /^[0-9]{8}[A-Za-z]$/;
  if (!dniRegex.test(dni)) {
    return false;
  }

  const dniLetters = "TRWAGMYFPDXBNJZSQVHLCKE";
  const numbers = dni.slice(0, 8);
  const letter = dni.slice(8).toUpperCase();
  const correctLetter = dniLetters[numbers % 23];

  return letter === correctLetter;
};

const ContactForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dni: "",
    gender: "",
    birthDate: "",
  });

  const [errors, setErrors] = useState({
    phone: false,
    dni: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const firstNameRef = useRef(null);

  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const allFieldsFilled = Object.values(formValues).every(
      (value) => value !== ""
    );
    const noErrors = !errors.phone && !errors.dni;
    setIsFormValid(allFieldsFilled && noErrors);
  }, [formValues, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (name === "phone") {
      setErrors({ ...errors, phone: !validatePhone(value) });
    }

    if (name === "dni") {
      setErrors({ ...errors, dni: !validateDNI(value) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setSnackbarMessage("Formulario enviado con éxito.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      console.log("Form submitted:", formValues);
    } else {
      setSnackbarMessage("Por favor, corrige los errores en el formulario.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 800,
        margin: "auto",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", color: "#D32F2F" }}
      >
        Formulario de Contacto
      </Typography>
      <Typography
        variant="h6"
        component="p"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "20px", color: "#555" }}
      >
        Si desea ponerse en contacto con nosotros, por favor, rellene el
        formulario a continuación.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            inputRef={firstNameRef}  // Se establece la referencia en este campo
            label="First Name"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            error={errors.phone}
            helperText={errors.phone ? "Phone must have 9 digits" : ""}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="DNI"
            name="dni"
            value={formValues.dni}
            onChange={handleChange}
            error={errors.dni}
            helperText={
              errors.dni ? "Invalid DNI. Check number and letter." : ""
            }
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Gender"
            name="gender"
            value={formValues.gender}
            onChange={handleChange}
            fullWidth
            required
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Birth Date"
            name="birthDate"
            type="date"
            value={formValues.birthDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;