import * as React from "react";
import {
  Grid,
  OutlinedInput,
  InputAdornment,
  TextField,
  IconButton,
  Stack,
  FormControl,
  InputLabel,
  Button,
  Collapse,
  Alert,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import authService from "../auth.service";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

export default function Login() {
  const [values, setValues] = React.useState({
    password: "",
    username: "",
    showPassword: false,
  });

  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const login = () => {
    authService
      .login(values.username, values.password)
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setOpen(true);
        console.log(this.open);
      });
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        justifyContent="center"
      >
        <Stack direction="row" justifyContent="center">
          <img src="/bitcoin.png" height="300" alt="logo" />
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        justifyContent="center"
      >
        <Stack direction="row" justifyContent="center">
          <TextField
            id="outlined-multiline-flexible"
            type="text"
            label="Username"
            required={true}
            multiline
            maxRows={4}
            value={values.username}
            onChange={handleChange("username")}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                login();
              }
            }}
            sx={{ m: 1, width: "35ch" }}
          />
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        justifyContent="center"
      >
        <Stack direction="row" justifyContent="center">
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              label="Password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              required={true}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  login();
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        justifyContent="center"
      >
        <Stack direction="row" justifyContent="center">
          <Button
            variant="contained"
            type="submit"
            size="large"
            onClick={() => login()}
          >
            Login
          </Button>
        </Stack>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        justifyContent="center"
      >
        <Stack
          direction="column"
          justifyContent="flex-end"
          style={{ position: "absolute", bottom: 50 }}
        >
          <Collapse in={open}>
            <Alert
              severity="error"
              variant="filled"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {errorMessage}
            </Alert>
          </Collapse>
        </Stack>
      </Grid>
    </Grid>
  );
}
