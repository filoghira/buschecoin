import * as React from "react";
import { useState, useEffect } from "react";
import {
  Stack,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
} from "@mui/material";
import UserService from "../user.service";
import { GridActionsCellItem, DataGrid } from "@mui/x-data-grid";
import SellIcon from "@mui/icons-material/Sell";

async function retrieveData() {
  var data = await UserService.getInventory().then((res) => {
    return res.data.map((item) => {
      return {
        id: item.id,
        type: item.objecttypes.name,
        name: item.name,
        value: item.currValue,
      };
    });
  });
  return data;
}

export default function Inventory() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    retrieveData().then((data) => {
      setRows(data);
    });
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = React.useMemo(
    () => [
      { field: "id", headerName: "ID", flex: 0.1 },
      {
        field: "type",
        headerName: "Object type",
        flex: 1,
      },
      {
        field: "name",
        headerName: "Object name",
        flex: 1,
      },
      {
        field: "value",
        headerName: "Value",
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<SellIcon />}
            label="Sell"
            onClick={handleClickOpen}
          />,
        ],
      },
    ],
    []
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Paper
        component={Stack}
        direction="column"
        justifyContent="center"
        sx={{
          minWidth: 250,
          width: "30%",
          height: 1,
          borderRadius: 10,
          p: 2,
        }}
      >
        <DataGrid autoHeight rows={rows} columns={columns} />
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Bla bla bla</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Place on market</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
