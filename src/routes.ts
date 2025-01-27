import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/pages/Home";
import Movies from "./components/pages/Movies";
import Movie from "./components/pages/Movie";
import TvShow from "./components/pages/TvShow";
import Tv from "./components/pages/Tv";
import People from "./components/pages/People";
import Person from "./components/pages/Person";
import GenreMovie from "./components/pages/GenreMovies";
import GenreTv from "./components/pages/GenreTvs";
import SignIn from "./components/pages/SignIn";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/movies",
        Component: Movies,
      },
      {
        path: "/movies/:id/:page",
        Component: Movies,
      },
      {
        path: "/movie/:id",
        Component: Movie,
      },
      {
        path: "/tvshow",
        Component: TvShow,
      },
      {
        path: "/tvshow/:id/:page",
        Component: TvShow,
      },
      {
        path: "/tv/:id",
        Component: Tv,
      },
      {
        path: "/people",
        Component: People,
      },
      {
        path: "/people/:id/:page",
        Component: People,
      },
      {
        path: "/person/:id",
        Component: Person,
      },
      {
        path: "/genre/:id/movie/:page",
        Component: GenreMovie,
      },
      {
        path: "/genre/:id/tv/:page",
        Component: GenreTv,
      },
      {
        path: "/signin",
        Component: SignIn,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/*",
        Component: NotFound
      }
    ],
  },
]);
