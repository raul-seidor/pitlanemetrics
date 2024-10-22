import React, { useState, useEffect } from "react";
import Loader from "../common/loader";
import { driversInfo } from "../../services/open-f1-data";
import DriverCard from "../common/driverCard";
import Grid from "@mui/material/Grid";
import { useCookies } from "react-cookie";
import { Alert, Snackbar } from "@mui/material";

const Drivers = () => {
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["favouriteDriver"]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const getDriversInfo = async () => {
      try {
        const queryParams = { session_key: 9158 };
        const result = await driversInfo(queryParams);
        setDrivers(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getDriversInfo();
  }, []);

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
    setSnackbarMessage("Se ha actualizado el Piloto Favorito correctamente");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h2>Drivers:</h2>
      <Grid container spacing={2} sx={{ paddingX: "60px" }}>
        {drivers.map((driver, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            sx={{ padding: "10px" }}
          >
            <DriverCard
              img={driver.headshot_url}
              nombre={driver.full_name}
              equipo={driver.team_name}
              colorEquipo={driver.team_colour}
              numero={driver.driver_number}
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

export default Drivers;
