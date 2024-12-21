import React, { Suspense } from "react";
import { Box } from "@mui/material";
import Error from "./Error";
import { Await, NavLink, useLoaderData } from "react-router-dom";
import styles from "../css/Styles.module.css";

export const loader = () => {
  const usersPromise = fetch("https://jsonplaceholder.typicode.com/users")
    .then((r) => {
      if (!r.ok) {
        throw new Error("Oops...Could not fetch.");
      }
      return r.json();
    })
    .catch((error) => {
      throw error;
    });

  return { usersPromise };
};

export default function Users() {
  const { usersPromise } = useLoaderData();

  return (
    <Suspense fallback={<Box>Loading...</Box>}>
      <Await
        resolve={usersPromise}
        errorElement={<Box>Oops...Could not fetch.</Box>}
      >
        {(users) => {
          return users.map((user) => (
            <Box key={user.id} className={styles.linkBox}>
              <NavLink className={styles.navLink} to={`/user/${user.id}`}>
                {user.name}
              </NavLink>
            </Box>
          ));
        }}
      </Await>
    </Suspense>
  );
}
