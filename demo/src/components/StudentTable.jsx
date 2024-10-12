import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import axios from "axios";

const columns = [
  { field: "studentID", headerName: "Student ID", width: 150 },
  { field: "name", headerName: "Name", width: 300 },
  { field: "age", headerName: "Age", type: "number", width: 50 },
  { field: "contactNo", headerName: "Contact", width: 120 },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/get-all-student-list"
        );
        const transformedData = result.data.map((item, index) => ({
          ...item,
          id: `${item.studentID}`,
        }));
        setRows(transformedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ m: "2rem" }}>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          checkboxSelection
          onRowSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = rows.filter((row) =>
              console.log(ids)            
            );
            setSelectedRows(selectedRows);
          }}
        />
      </Paper>
      <Button
        onClick={() => {
          console.log(selectedRows);
        }}
      >
        Log Selected
      </Button>
    </Box>
  );
}
