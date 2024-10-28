import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  standingsDrivers,
  standingsControllers,
} from "../../services/f1-motorsport-data";
import StickyHeadTable from "../common/table";
import BasicTabs from "../common/tabs";
import Loader from "../common/loader";
import { useTranslation } from "react-i18next";

// MOCKS
// import driversChampionshipsMock from "../../assets/mocks/driversChampioship.json";
// import controllersChampionshipsMock from "../../assets/mocks/controllersChampioship.json";

/**
 * Championships component
 *
 * Componente que renderiza la tabla de campeonatos de F1, tanto para pilotos como para constructores.
 *
 * @returns {JSX.Element} Componente JSX
 */
function Championships() {
  const { t } = useTranslation("global");
  const [driversChampionships, setDriversChampionships] = useState([]);
  const [controllersChampionships, setControllersChampionships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const getDataDrivers = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const queryParams = { year: currentYear };
        const result = await standingsDrivers(queryParams);
        setDriversChampionships(result.standings.entries);
      } catch (error) {
        setError("Ha ocurrido un error al intentar obtener los datos.");
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    const getDataControllers = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const queryParams = { year: currentYear };
        const result = await standingsControllers(queryParams);
        setControllersChampionships(result.standings.entries);
      } catch (error) {
        setError("Ha ocurrido un error al intentar obtener los datos.");
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    getDataDrivers();
    getDataControllers();
  }, []);

  if (loading) return <Loader />;

  const columnsDrivers = [
    { id: "stats[0].displayValue", label: t("tablePosition"), minWidth: 170 },
    { id: "athlete.displayName", label: t("tableDriver"), minWidth: 100 },
    { id: "stats[1].displayValue", label: t("tablePoints"), minWidth: 170 },
    { id: "athlete.flag.alt", label: t("tableCountry"), minWidth: 170 },
  ];

  const columnsControllers = [
    { id: "stats[0].displayValue", label: t("tablePosition"), minWidth: 170 },
    { id: "team.displayName", label: t("tableTeam"), minWidth: 100 },
    { id: "stats[1].displayValue", label: t("tablePoints"), minWidth: 170 },
  ];

  const columns = selectedTab === 0 ? columnsDrivers : columnsControllers;
  const rows =
    selectedTab === 0 ? driversChampionships : controllersChampionships;

  // MOCK
  // const rowsDrivers = driversChampionshipsMock.standings.entries;
  // const rowsControllers = controllersChampionshipsMock.standings.entries;
  // const rows = selectedTab === 0 ? rowsDrivers : rowsControllers;

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div style={{ paddingX: "20px" }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", color: "#D32F2F" }}
      >
        {t("championshipsTitle")}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "30px", color: "#555" }}
      >
        {t("championshipsDescription")}
      </Typography>

      <BasicTabs onTabChange={handleTabChange} />
      <StickyHeadTable columns={columns} rows={rows} />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error || "Ocurrió un error desconocido."}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Championships;
