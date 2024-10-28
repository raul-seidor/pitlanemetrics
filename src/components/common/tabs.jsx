import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

/**
 * Generates the props needed for the Tab component to follow the
 * WAI-ARIA specification.
 * @param {number} index - The index of the tab.
 * @returns {Object} An object with the id and aria-controls properties.
 */
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ onTabChange }) {
  const { t } = useTranslation("global");
  const [value, setValue] = React.useState(0);

  /**
   * Handles a change in the selected tab.
   * @param {React.SyntheticEvent} event - The event that triggered the change.
   * @param {number} newValue - The new value of the selected tab.
   */
  const handleChange = (event, newValue) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label={t("tabDrivers")} {...a11yProps(0)} />
          <Tab label={t("tabConstructors")} {...a11yProps(1)} />
        </Tabs>
      </Box>
    </Box>
  );
}
