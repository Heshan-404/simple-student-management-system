import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import axios from "axios";
import data from "../data/studentData";

const columns = [
  { field: "studentID", headerName: "Name", width: 300 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 50,
  },
  { field: "contact", headerName: "Contact", width: 120 },
  { field: "address", headerName: "Address", width: 200 },
];

export default function DataTable() {
  var row = [];
  const paginationModel = { page: 0, pageSize: 5 };
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    // axios
    //   .get("http://localhost:3000/api/get-all-student-list")
    //   .then((result) => {
    //     rows = result.data;
    //     console.log(rows);

    //   })
    //   .catch((error) => console.log(error));
    row = data;
  });
  return (
    <Box sx={{ m: "2rem" }}>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={row}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          checkboxSelection
          onRowSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
            setSelectedRows(selectedRows);
          }}
        />
      </Paper>
      <Button
        onClick={() => {
          console.log(selectedRows);
        }}
      >
        log
      </Button>
    </Box>
  );
}
