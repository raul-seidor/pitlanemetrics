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
import { useTranslation } from "react-i18next";

/**
 * Validate a phone number.
 * @param {string} phone the phone number to validate
 * @return {boolean} true if the phone is valid, false otherwise
 */
const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate a Spanish DNI.
 * @param {string} dni the DNI to validate
 * @return {boolean} true if the DNI is valid, false otherwise
 */
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

/**
 * A form to contact with the web administrator.
 * It will validate the phone number and the Spanish DNI.
 * If the form is valid, it will show a success message.
 * If the form is not valid, it will show an error message.
 * @returns {React.ReactElement} The form.
 */
const ContactForm = () => {
  const { t } = useTranslation("global");
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

  /**
   * Handles a change in a form field.
   * @param {React.ChangeEvent<HTMLInputElement>} e the event
   */
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

  /**
   * Handles form submission.
   * @param {React.FormEvent<HTMLFormElement>} e the event
   * Prevents default form submission behavior.
   * If the form is valid, displays a success snackbar message.
   * If the form is invalid, displays an error snackbar message.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setSnackbarMessage(t("contactFormSuccessMessage"));
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      console.log("Form submitted:", formValues);
    } else {
      setSnackbarMessage(t("contactFormErrorMessage"));
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  /**
   * Handles closing the snackbar message.
   * Resets the snackbar open state to false.
   */
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
        {t("contactFormTitle")}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "20px", color: "#555" }}
      >
        {t("contactFormDescription")}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            inputRef={firstNameRef}
            label={t("firstName")}
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{ "data-testid": "firstName" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={t("lastName")}
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{ "data-testid": "lastName" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={t("phone")}
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            error={errors.phone}
            helperText={errors.phone ? t("phoneError") : ""}
            fullWidth
            required
            inputProps={{ "data-testid": "phone" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={t("dni")}
            name="dni"
            value={formValues.dni}
            onChange={handleChange}
            error={errors.dni}
            helperText={errors.dni ? t("dniError") : ""}
            fullWidth
            required
            inputProps={{ "data-testid": "dni" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label={t("gender")}
            name="gender"
            value={formValues.gender}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{ "data-testid": "gender" }}
          >
            <MenuItem value="male">{t("male")}</MenuItem>
            <MenuItem value="female">{t("female")}</MenuItem>
            <MenuItem value="other">{t("other")}</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={t("birthdate")}
            name="birthDate"
            type="date"
            value={formValues.birthDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
            inputProps={{ "data-testid": "birthDate" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {t("contactFormSubmitBtn")}
          </Button>
        </Grid>
      </Grid>

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
