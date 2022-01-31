import Marketplace from "./pages/Marketplace";
import History from "./pages/History";
import Inventory from "./pages/Inventory";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import * as React from "react";

import { themeOptions } from "./themes/Purple";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import AuthService from "./auth.service";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={themeOptions}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route
              index
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/marketplace"
              element={
                <RequireAuth>
                  <Marketplace />
                </RequireAuth>
              }
            />
            <Route
              path="history"
              element={
                <RequireAuth>
                  <History />
                </RequireAuth>
              }
            />
            <Route
              path="inventory"
              element={
                <RequireAuth>
                  <Inventory />
                </RequireAuth>
              }
            />
            <Route path="login" element={<Login />} />
            <Route
              path="*"
              element={
                <div>
                  <h1>404</h1>
                  <p>Page not found</p>
                </div>
              }
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

interface AuthContextType {
  signin: (username: string, password: string) => void;
  signout: () => void;
  getUser: () => any;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = async (username: string, password: string) => {
    const user = await AuthService.login(username, password);
    return console.log(user);
  };

  let signout = () => {
    return AuthService.logout();
  };

  let getUser = () => {
    return AuthService.getCurrentUser();
  };

  let value = { signin, signout, getUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.getUser()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
