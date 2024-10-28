import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

/**
 * Gets a value from a nested object.
 *
 * @param {object} obj The object to get the value from.
 * @param {string} key The key of the value to get. Supports nested keys using dot notation (e.g. key1.key2[key3]).
 * @returns {*} The value.
 */
const getValueFromNestedObject = (obj, key) => {
  return key
    .split(/\.|\[|\]/)
    .filter(Boolean)
    .reduce((o, k) => (o || {})[k], obj);
};

/**
 * A table component with sticky headers and pagination.
 *
 * @param {object} props The component props.
 * @param {array} props.columns The columns of the table. Each column is an object with the following properties:
 *   - id: The id of the column.
 *   - label: The label of the column.
 *   - align: The alignment of the column.
 *   - minWidth: The minimum width of the column.
 *   - format: An optional function to format the value of the column.
 * @param {array} props.rows The rows of the table. Each row is an object with the values of the columns.
 * @returns {ReactElement} The table component.
 */
export default function StickyHeadTable({ columns, rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  /**
   * Handles a change in the page.
   *
   * @param {object} event The event.
   * @param {number} newPage The new page.
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Handles a change in the number of rows per page.
   *
   * @param {object} event The event triggered by changing the number of rows per page.
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.athlete?.id || row.team?.id || rowIndex}
                  >
                    {columns.map((column) => {
                      const value = getValueFromNestedObject(row, column.id);
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
