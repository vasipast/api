import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routers/Layout";
import Users from "./routers/Users";
import User from "./routers/User";
import Photos from "./routers/Photos";
import Albums from "./routers/Albums";
import Error from "./routers/Error";
import { loader as albumsLoader } from "./routers/Albums";
import { loader as usersLoader } from "./routers/Users";
import {
  loader as userLoader,
  loader as albumUserLoader,
} from "./routers/User";
import {
  loader as photosLoader,
  loader as albumPhotosLoader,
  loader as userPhotosLoader,
} from "./routers/Photos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        loader: usersLoader,
        element: <Users />,
      },
      {
        path: "/user/:id",
        loader: userLoader,
        albumUserLoader,
        element: <User />,
      },
      {
        path: "/albums",
        loader: albumsLoader,
        element: <Albums />,
      },
      {
        path: "/albums/:albumId",
        loader: photosLoader,
        albumPhotosLoader,
        userPhotosLoader,
        element: <Photos />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
