import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import {
  standingsDrivers,
  standingsControllers,
} from "../../services/f1-motorsport-data";
import StickyHeadTable from "../common/table";
import BasicTabs from "../common/tabs";
import Loader from "../common/loader";

// MOCKS
import driversChampionshipsMock from "../../assets/mocks/driversChampioship.json";
import controllersChampionshipsMock from "../../assets/mocks/controllersChampioship.json";

function Championships() {
  const [driversChampionships, setDriversChampionships] = useState([]);
  const [controllersChampionships, setControllersChampionships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  // useEffect(() => {
  //   const getDataDrivers = async () => {
  //     try {
  //       const currentYear = new Date().getFullYear();
  //       const queryParams = {
  //         year: currentYear,
  //       };
  //       const result = await standingsDrivers(queryParams);
  //       setDriversChampionships(result.standings.entries);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const getDataControllers = async () => {
  //     try {
  //       const currentYear = new Date().getFullYear();
  //       const queryParams = {
  //         year: currentYear,
  //       };
  //       const result = await standingsControllers(queryParams);
  //       setControllersChampionships(result.standings.entries);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getDataDrivers();
  //   getDataControllers();
  // }, []);

  // if (loading) return <Loader />;
  // if (error) return <div>Error: {error}</div>;

  const columnsDrivers = [
    { id: "stats[0].displayValue", label: "Posición", minWidth: 170 },
    { id: "athlete.displayName", label: "Piloto", minWidth: 100 },
    { id: "stats[1].displayValue", label: "Puntos", minWidth: 170 },
    { id: "athlete.flag.alt", label: "País", minWidth: 170 },
  ];

  const columnsControllers = [
    { id: "stats[0].displayValue", label: "Posición", minWidth: 170 },
    { id: "team.displayName", label: "Equipo", minWidth: 100 },
    { id: "stats[1].displayValue", label: "Puntos", minWidth: 170 },
  ];

  const columns = selectedTab === 0 ? columnsDrivers : columnsControllers;
  // const rows =
  //   selectedTab === 0 ? driversChampionships : controllersChampionships;
  // MOCK
  const rowsDrivers = driversChampionshipsMock.standings.entries;
  const rowsControllers = controllersChampionshipsMock.standings.entries;
  const rows = selectedTab === 0 ? rowsDrivers : rowsControllers;

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", color: "#D32F2F" }}
      >
        Campeonatos de Fórmula 1
      </Typography>
      <Typography
        variant="h6"
        component="p"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "30px", color: "#555" }}
      >
        Aquí encontrarás las últimas estadísticas y posiciones en el campeonato
        de constructores y pilotos de la temporada actual.
      </Typography>

      <BasicTabs onTabChange={handleTabChange} />
      <StickyHeadTable columns={columns} rows={rows} />
    </div>
  );
}

export default Championships;
