import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function NavigationButtons() {
  const [open, setOpen] = React.useState(false);
  const [nextID, setNextID] = React.useState();

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/get-new-student-id")
      .then((result) => {
        setNextID(result.data);
        console.log(result.data);
        
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const studentData = {
      ...formJson,
      studentID: nextID,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/register-student", studentData);
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error( error);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To register a student, please enter details here.
          </DialogContentText>
          <DialogTitle sx={{ p: 2, pl: 0, pb: 1 }}>
            Student ID: {nextID}
          </DialogTitle>
          <span style={{ marginRight: "30px" }}>Image:</span>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>
          <TextField
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="age"
            name="age"
            label="Age"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="contact"
            name="contact"
            label="Contact"
            fullWidth
            variant="standard"
          />
          <DialogTitle sx={{ p: 2, pl: 0, pb: 1 }}>
            Guardian Details
          </DialogTitle>
          <TextField
            required
            margin="dense"
            id="gname"
            name="gname"
            label="Guardian Name"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="gaddress"
            name="gaddress"
            label="Guardian Address"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="gcontact"
            name="gcontact"
            label="Guardian Contact"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Register</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ m: "4rem" }}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpen(true)}
          >
            Add Student
          </Button>
          <Button variant="contained">Reload</Button>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
