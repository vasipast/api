import React, { Suspense, useEffect, useState } from "react";
import Error from "./Error";
import { useLoaderData, Await } from "react-router-dom";

import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent
} from "@mui/material";
import styles from "../css/Photos.module.css";

export const loader = ({ params: { albumId } }) => {
  const photosPromise = fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
  ).then((r) => {
    if (!r.ok) {
      throw new Error("Oops...Could not fetch");
    }
    return r.json();
  });

  const albumsPromise = fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`
  ).then((r) => {
    if (!r.ok) {
      throw new Error("Oops...Could not fetch");
    }
    return r.json();
  });

  const userPromise = albumsPromise.then((albums) =>
    fetch(`https://jsonplaceholder.typicode.com/users/${albums.userId}`).then(
      (r) => {
        if (!r.ok) {
          throw new Error("Oops...Could not fetch");
        }
        return r.json();
      }
    )
  );

  return { photosPromise, albumsPromise, userPromise };
};

export default function Photos() {
  const { photosPromise, albumsPromise, userPromise } = useLoaderData();
  const [album, setAlbum] = useState({});

  useEffect(() => {
    albumsPromise
      .then((albumData) => {
        setAlbum(albumData);
      })
      .catch((error) => {
        console.error("Error fetching album:", error);
      });
  }, [albumsPromise]);

  return (
    <Suspense fallback={<Box>Loading...</Box>}>
      <Await
        resolve={userPromise}
        errorElement={<Box>Oops...Could not fetch</Box>}
      >
        {(user) => (
          <Box>
            <h1>Photos for Album: "{album.title}".</h1>
            <h3>Created by: {user.name}</h3>
          </Box>
        )}
      </Await>
      <Await
        resolve={photosPromise}
        errorElement={<Box>Oops...Could not fetch</Box>}
      >
        {(photos) => (
          <Grid container spacing={1} className={styles.container}>
            {photos.map((photo) => (
              <Grid item xs={12} md={4} key={photo.id}>
                <Card className={styles.card}>
                  <CardMedia>
                    <img src={photo.thumbnailUrl} alt={photo.title} />
                  </CardMedia>
                  <CardContent>
                    <Typography>{photo.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Await>
    </Suspense>
  );
}
