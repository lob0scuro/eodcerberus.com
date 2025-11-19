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
import Analytics from "./routes/Analytics/Analytics";
import Settings from "./routes/Settings/Settings";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<ProtectedLayout />}>
          <Route index element={<Home />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
