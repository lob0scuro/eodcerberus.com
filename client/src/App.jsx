// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./routes/Home/Home";
import Register from "./routes/Auth/Register";
import Login from "./routes/Auth/Login";
import ProtectedLayout from "./layout/ProtectedLayout";
import Reports from "./routes/Reports/Reports";
import Settings from "./routes/Settings/Settings";
import Users from "./routes/Users/Users";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<ProtectedLayout />}>
          <Route index element={<Home />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="users" element={<Users />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
