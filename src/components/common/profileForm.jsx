import React, { useReducer, useEffect } from "react";
import { TextField, Button, Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const initialState = {
  email: "",
  name: "",
  nickname: "",
  errors: {},
};

/**
 * Reducer function to handle various actions for the form state.
 *
 * @param {Object} state - The current state of the form.
 * @param {Object} action - An action object containing the type of action and additional data.
 * @returns {Object} The updated state after applying the action.
 *
 * Action Types:
 * - "SET_FIELD": Updates a specific field in the form state.
 * - "SET_ERRORS": Updates the errors in the form state.
 * - "SET_INITIAL_DATA": Sets the initial data for the form.
 * - "RESET": Resets the form state to its initial state.
 */
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

/**
 * Validates the form state and returns an object with error messages.
 * @param {Object} state - The current state of the form.
 * @param {function} t - The translation function.
 * @returns {Object} An object containing error messages for each field.
 */
const validateForm = (state, t) => {
  const errors = {};
  if (!/\S+@\S+\.\S+/.test(state.email)) errors.email = t("emailErrorFormat");
  if (!state.email.trim()) errors.email = t("emailErrorRequired");
  if (!state.name.trim()) errors.name = t("nameErrorRequired");
  if (!state.nickname.trim()) errors.nickname = t("nicknameErrorRequired");
  console.log(errors);

  return errors;
};

/**
 * A form to edit the user profile.
 * It will validate the email, name and nickname, and save the changes to
 * the user profile in the session storage.
 * @param {Object} initialData - The initial data of the user profile.
 * @param {function} onCancel - The function to call when the cancel button is clicked.
 * @param {function} onSave - The function to call when the form is submitted.
 * @returns {React.ReactElement} The form.
 */
const ProfileForm = ({ initialData, onCancel, onSave }) => {
  const { t } = useTranslation("global");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (initialData) {
      dispatch({ type: "SET_INITIAL_DATA", payload: initialData });
    }
  }, [initialData]);

  /**
   * Handles form submission.
   * @param {React.FormEvent<HTMLFormElement>} e - The event
   * Prevents default form submission behavior.
   * If the form is valid, saves the changes to the user profile in the session storage
   * and calls the onSave function, passing the updated state as an argument.
   * If the form is invalid, sets the errors in the form state.
   */
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

  /**
   * Handles a change in a form field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event
   * Updates the state with the new value of the field.
   */
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
        <Grid item xs={12} md={6}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={onCancel}
          >
            {t("profileBtnCancel")}
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {t("profileFormSubmitBtn")}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileForm;
