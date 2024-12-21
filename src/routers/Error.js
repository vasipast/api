import React from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import stylesError from "../css/Error.module.css";

export default function Error() {
  return (
    <Box className={stylesError.container}>
      <p className={stylesError.errorNumber}>404</p>
      <p className={stylesError.pageNotFound}>PAGE NOT FOUND</p>
      <p className={stylesError.goToPage}>
        GO TO PAGE
        <NavLink to={"/albums"}>Albums</NavLink>
      </p>
    </Box>
  );
}
