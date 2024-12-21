import { Box, Container, Divider } from "@mui/material";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "../css/Layout.module.css";

export default function Layout() {
  return (
    <Container className={styles.container}>
      <Box className={styles.headerNavigation}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.navLink
          }
          to="/albums"
        >
          Albums
        </NavLink>
        <NavLink
          to="/"
          end={true}
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.navLink
          }
        >
          Users
        </NavLink>
      </Box>
      <Box className={styles.outlet}>
        <Outlet></Outlet>
      </Box>
    </Container>
  );
}
