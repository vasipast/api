import React, { Suspense } from "react";
import { NavLink, Await, useLoaderData } from "react-router-dom";
import { Box } from "@mui/material";
import { AiFillFolder } from "react-icons/ai";
import Error from "./Error";
import styles from "../css/Styles.module.css";

export const loader = ({ params: { id } }) => {
  const userPromise = fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((r) => {
      if (!r.ok) {
        throw new Error("Ooops...Could not fetch.");
      }
      return r.json();
    })
    .catch((error) => {
      throw error;
    });

  const albumsPromise = fetch(
    `https://jsonplaceholder.typicode.com/albums?userId=${id}`
  )
    .then((r) => {
      if (!r.ok) {
        throw new Error("Ooops...Could not fetch.");
      }
      return r.json();
    })
    .catch((error) => {
      throw error;
    });

  return { userPromise, albumsPromise };
};

export default function User() {
  const { userPromise, albumsPromise } = useLoaderData();

  return (
    <Suspense fallback={<Box>Loading...</Box>}>
      <Await
        resolve={userPromise}
        errorElement={<Box>Oops...Could not fetch.</Box>}
      >
        {(user) => {
          return (
            <Box>
              <h1>{user.name}</h1>
              <p>
                <b>Username:</b> {user.username}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Phone:</b> {user.phone}
              </p>
              <p>
                <b>Site:</b> {user.website}
              </p>
              <h2>Albums: </h2>
            </Box>
          );
        }}
      </Await>

      <Await
        resolve={albumsPromise}
        errorElement={<Box>Oops...Could not fetch.</Box>}
      >
        {(albums) => {
          return albums.map((album) => (
            <Box key={album.id} className={styles.linkBox}>
              <span>
                <AiFillFolder></AiFillFolder>
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
