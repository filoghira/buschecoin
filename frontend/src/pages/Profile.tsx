import * as React from "react";
import { Grid, Avatar, TextField, Stack, Paper, Box } from "@mui/material";
import UserService from "../user.service";

type ProfileProps = {
  username: string;
  name: string;
  surname: string;
  email: string;
  class: string;
};

type User = {
  username: string;
  name: string;
  surname: string;
  email: string;
  class: string;
};

export default class Home extends React.Component<{}, ProfileProps> {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      surname: "",
      email: "",
      class: "",
    };
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  handleUserChange(user: User) {
    this.setState({
      username: user.username,
      name: user.name,
      surname: user.surname,
      email: user.email,
      class: user.class,
    });
  }

  componentDidMount() {
    UserService.getUserBoard().then((res) => {
      console.log(res);
      this.handleUserChange(res);
    });
  }

  render(): React.ReactNode {
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
          sx={{ minWidth: 250, width: "30%", height: 1, borderRadius: 10, p: 2 }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
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
              <Avatar
                alt="profpic"
                src=""
                sx={{
                  minWidth: 150,
                  minHeight: 150,
                  width: "20vh",
                  height: "20vh",
                }}
              />
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
              <TextField
                id="outlined-read-only-input"
                label="Username"
                defaultValue="username"
                value={this.state.username}
                sx={{ width: 1 }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              spacing={4}
            >
              <Grid
                item
                container
                justifyContent="center"
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <TextField
                  id="outlined-read-only-input"
                  label="Nome"
                  defaultValue="nome"
                  value={this.state.name}
                  sx={{ width: 1 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <TextField
                  id="outlined-read-only-input"
                  label="Cognome"
                  defaultValue="cognome"
                  sx={{ width: 1 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              spacing={4}
            >
              <Grid
                item
                container
                justifyContent="center"
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <TextField
                  id="outlined-read-only-input"
                  label="Email"
                  defaultValue="nome.cognome@pippo.com"
                  value={this.state.email}
                  sx={{ width: 1 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <TextField
                  id="outlined-read-only-input"
                  label="Classe"
                  defaultValue="6AIN"
                  value={this.state.class}
                  sx={{ width: 1 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
