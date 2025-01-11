import MetaData from "../MetaData";
import MovieTab from "../movieData/MovieTab";

const movies = [
  { name: "Now Playing", path: "now_playing" },
  { name: "Popular", path: "popular" },
  { name: "Top Rated", path: "top_rated" },
  { name: "Upcoming", path: "upcoming" },
];

const tv = [
  { name: "Airing Today", path: "airing_today" },
  { name: "On The Air", path: "on_the_air" },
  { name: "Popular", path: "popular" },
  { name: "Top Rated", path: "top_rated" },
];

const Home = () => {
  <MetaData
    title="Home"
    Otitle="AmirMovies"
    description="Collection of Movies, TV Shows, and People Data"
    url="/"
  />;
  return (
    <>
      <div className="container mx-auto">
        <div>
          <MovieTab basePath="/movie" list={movies} name="Movies" />
        </div>
        <div className="mt-10">
          <MovieTab basePath="/tv" list={tv} name="Tv Shows" />
        </div>
      </div>
    </>
  );
};

export default Home;
