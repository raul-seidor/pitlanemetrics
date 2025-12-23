import React, { useState } from "react";
import { Provider } from "react-redux";
import Loader from "../common/loader";
import { useGetDriversQuery } from "../../store/api/driversApi";
import { store } from "../../store";
import DriverCard from "../common/driverCard";
import Grid from "@mui/material/Grid";
import { useCookies } from "react-cookie";
import { Alert, Snackbar, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * RTK Query version of Drivers component
 * 
 * This component demonstrates Redux Toolkit Query usage alongside
 * the traditional version for comparison purposes.
 */
const DriversRTKContent = () => {
  const { t } = useTranslation("global");
  const [cookies, setCookie, removeCookie] = useCookies(["favouriteDriver"]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // RTK Query hook - automatically handles loading, error, and data states
  const {
    data: drivers = [],
    error,
    isLoading: loading
  } = useGetDriversQuery({ session_key: 9158 });

  /**
   * Toggles the favourite status of a driver. Same logic as original component.
   *
   * @param {Object} driver - The driver object to be toggled as favourite.
   */
  const handleToggleFavourite = (driver) => {
    if (cookies.favouriteDriver) {
      const favouriteActual = cookies.favouriteDriver;
      if (favouriteActual.driver_number !== driver.driver_number) {
        setCookie("favouriteDriver", driver, { path: "/" });
      } else {
        removeCookie("favouriteDriver");
      }
    } else {
      setCookie("favouriteDriver", driver, { path: "/" });
    }
    setSnackbarMessage("Se ha actualizado el Piloto Favorito correctamente (RTK)");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  /**
   * Closes the snackbar message.
   */
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Show error in snackbar if API fails
  React.useEffect(() => {
    if (error) {
      setSnackbarMessage(`Error al cargar pilotos: ${error.message || 'Error desconocido'}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [error]);

  if (loading) return <Loader />;

  return (
    <div>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}
        >
          {t("driversTitle")} - RTK Query 🚀
        </Typography>
        <Typography
          variant="h6"
          component="p"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: "30px", color: "#555" }}
        >
          {t("driversDescription")} (Versión con Redux Toolkit Query)
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ paddingX: { md: "60px" } }}>
        {drivers.map((driver, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <DriverCard
              img={driver.headshot_url}
              name={driver.full_name}
              team={driver.team_name}
              teamColor={driver.team_colour}
              number={driver.driver_number}
              onToggleFavourite={() => handleToggleFavourite(driver)}
              isFavourite={
                cookies.favouriteDriver
                  ? cookies.favouriteDriver.driver_number ===
                    driver.driver_number
                  : false
              }
            />
          </Grid>
        ))}
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
    </div>
  );
};

/**
 * Wrapper component that provides Redux store only for this RTK demo
 * This allows RTK to coexist with the rest of the app without interfering
 */
const DriversRTK = () => {
  return (
    <Provider store={store}>
      <DriversRTKContent />
    </Provider>
  );
};

export default DriversRTK;