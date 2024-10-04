import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Box, Grid } from '@mui/material';

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
    firstName: '',
    lastName: '',
    phone: '',
    dni: '',
    gender: '',
    birthDate: '',
  });

  const [errors, setErrors] = useState({
    phone: false,
    dni: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(formValues).every(value => value !== '');
    const noErrors = !errors.phone && !errors.dni;
    setIsFormValid(allFieldsFilled && noErrors);
  }, [formValues, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (name === 'phone') {
      setErrors({ ...errors, phone: !validatePhone(value) });
    }

    if (name === 'dni') {
      setErrors({ ...errors, dni: !validateDNI(value) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Form submitted:', formValues);
    } else {
      console.log('Form has errors.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 800,
        margin: 'auto',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
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
            helperText={errors.phone ? 'Phone must have 9 digits' : ''}
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
            helperText={errors.dni ? 'Invalid DNI. Check number and letter.' : ''}
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
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
