import React, { Suspense } from "react";
import { Box } from "@mui/material";
import { NavLink, useLoaderData, Await } from "react-router-dom";
import styles from "../css/Styles.module.css";
import { AiFillFolder } from "react-icons/ai";
import Error from "./Error";

export const loader = ({}) => {
  const albumPromise = fetch("https://jsonplaceholder.typicode.com/albums")
    .then((r) => {
      if (!r.ok) {
        throw new Error("Ooops...Could not fetch.");
      }
      return r.json();
    })
    .catch((error) => {
      throw error;
    });

  return { albumPromise };
};

export default function Albums() {
  const { albumPromise } = useLoaderData();

  return (
    <Suspense fallback={<Box>Loading...</Box>}>
      <Await
        resolve={albumPromise}
        errorElement={<Box>Oops...Could not fetch.</Box>}
      >
        {(albums) => {
          return albums.map((album) => (
            <Box key={album.id} className={styles.linkBox}>
              <span role="img" aria-label="folder icon">
                <AiFillFolder />
              </span>
              <NavLink className={styles.navLink} to={`/albums/${album.id}`}>
                {album.title}
              </NavLink>
            </Box>
          ));
        }}
      </Await>
    </Suspense>
  );
}
