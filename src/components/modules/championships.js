import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { standingsDrivers, standingsControllers } from "../../services/f1-motorsport-data";
import mockData from "../../assets/mocks/driversChampioship.json";
import StickyHeadTable from "../common/table";
function Championships() {
  const [driversChampionships, setDriversChampionships] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         const currentYear = new Date().getFullYear();
  //         const queryParams = {
  //           year: currentYear,
  //         };
  //         const result = await standingsDrivers(queryParams);
  //         setDriversChampionships(result);
  //       } catch (error) {
  //         setError(error.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     getData();
  //   }, []);

  //   if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error}</div>;

  const columnsDrivers = [
    { id: "stats[0].displayValue", label: "Posición", minWidth: 170 },
    { id: "athlete.displayName", label: "Nombre", minWidth: 100 },
    { id: "stats[1].displayValue", label: "Puntos", minWidth: 170 },
    { id: "athlete.flag.alt", label: "País", minWidth: 170 },
  ];

  const rowsDrivers = mockData.standings.entries;


  return (
    <div>
      <h1>Data from API:</h1>
      {/* <pre>{JSON.stringify(mockData, null, 2)}</pre> */}
      <StickyHeadTable columns={columnsDrivers} rows={rowsDrivers} />
    </div>
  );
}

export default Championships;
