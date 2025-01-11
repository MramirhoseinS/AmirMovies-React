import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const menuItem = [
  {
    path: "/movies",
    name: "Movies",
  },
  {
    path: "/tvshow",
    name: "Tv Shows",
  },
  {
    path: "/people",
    name: "People",
  },
  {
    path: "/about",
    name: "About us",
  },
];

const Navigation = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const userData = useContext(UserContext);

  const handleActive = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "text-rose-500"
      : "hover:text-rose-300 transition-all duration-300";
  };

  const handleLogout = () => {
    userData?.setUser({
      name: "",
      username: "",
      id: 0,
    });
    localStorage.clear();
    toast.error("Sign Out");
    navigate("/", { replace: true });
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      userData?.setUser(JSON.parse(user));
    }
  }, []);

  return (
    <>
      <nav className="mx-auto flex items-center text-slate-200">
        <div className="flex items-center">
          <Link to="/" onClick={() => setIsOpenMenu(false)}>
            <h1 className="text-4xl mr-4 lg:mr-12">
              Amir<span className="text-rose-500">Movies</span>
            </h1>
          </Link>
          <ul className="hidden md:flex text-sm pt-2 pl-5 lg:p-0 lg:text-base gap-4 lg:gap-7 uppercase">
            {menuItem.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={handleActive}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex ml-auto text-sm pt-2 lg:p-0 lg:text-base">
          {userData?.user.id !== 0 ? (
            <>
              <div className="flex gap-2 lg:gap-4 items-center">
                <span className="text-xl">{userData?.user.name}</span>
                <button
                  onClick={handleLogout}
                  className="uppercase bg-rose-600 hover:bg-rose-300 transition-all duration-300 hover:text-slate-950 py-1.5 px-2.5 rounded-2xl text-white"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <ul className="flex gap-3 lg:gap-8 uppercase">
              <li>
                <NavLink
                  to="/signin"
                  className="hover:text-rose-300 transition-all duration-300"
                >
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="bg-rose-600 hover:bg-rose-300 transition-all duration-300 hover:text-slate-950 py-2 px-4 rounded-2xl text-white"
                  to="#"
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className="md:hidden ml-auto">
          <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
        </div>
      </nav>
      <div
        className={`${isOpenMenu ? `h-[225px] pt-4` : `h-[0]`}
          md:hidden overflow-hidden transition-all duration-200
          text-slate-200`}
      >
        <ul className="flex flex-col text-center gap-4 uppercase">
          {menuItem.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={handleActive}
                onClick={() => setIsOpenMenu(false)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        {userData?.user.id !== 0 ? (
          <div className="flex justify-center mt-4 gap-2 lg:gap-4 items-center">
            <span className="text-lg">{userData?.user.name}</span>
            <button
              onClick={handleLogout}
              className="uppercase bg-rose-600 hover:bg-rose-300 transition-all duration-300 hover:text-slate-950 py-1.5 px-2.5 rounded-2xl text-white"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <ul className="flex justify-center mt-6 pl-8 text-center gap-4 uppercase">
            <li>
              <NavLink
                to="signin"
                className="hover:text-rose-300 transition-all duration-300"
                onClick={() => setIsOpenMenu(false)}
              >
                Sign In
              </NavLink>
            </li>
            <li>
              <Link
                className="bg-rose-600 hover:bg-rose-300 transition-all duration-300 hover:text-slate-950 py-2 px-4 rounded-2xl text-white"
                to="#"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Navigation;
