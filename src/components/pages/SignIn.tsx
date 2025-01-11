import { FormEvent, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../MetaData";

const SignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [developer, setDeveloper] = useState(false);

  const navigate = useNavigate();
  const userData = useContext(UserContext);

  interface ILogin {
    username: string;
    password: string;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };
  const login = async ({ username, password }: ILogin) => {
    if (username === "" || password === "") {
      toast.error("Please fill all the list");
    } else if (username === "amirhosein" && password === "1234") {
      toast.success("Login successfully");
      userData?.setUser({
        name: "amirhosein",
        username: "amirhosein",
        id: 1,
      });
      navigate("/");
    } else {
      toast.error("Username or Password not valid");
    }
  };
  return (
    <>
      <MetaData
        title="Sign In"
        description="Sign in to access your account and explore a collection of Movies, Tv shows, and People data."
        url="/signin"
      />
      <div className="relative">
        <div
          className={`w-full sm:w-auto text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            bg-slate-400 p-5 ${developer ? "" : "hidden"}`}
        >
          <p>برای ورود و تست از این داده استفاده کنید</p>
          <p>Username: amirhosein, Password: 1234</p>
        </div>
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-6">
        <div className="text-center">
          <button
            className="bg-slate-500 rounded-md p-1"
            onClick={() => setDeveloper(!developer)}
          >
            پیام توسعه دهنده
          </button>
        </div>
        <h1 className="text-center text-3xl md:text-4xl text-slate-200 font-bold">
          Sign in to your account
        </h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg"
        >
          <div className="mt-2 group">
            <label
              htmlFor="email"
              className="block md:text-lg text-slate-300 group-focus-within:text-rose-400 
                  transition-all duration-300"
            >
              Email or Username
            </label>
            <input
              className="block w-full rounded-md bg-slate-800 mt-2 px-3 pb-1.5 pt-1 text-slate-200 
                outline outline-1 -outline-offset-1 outline-slate-400 placeholder:text-slate-400 
                focus:outline-2 focus:-outline-offset-1 focus:outline-rose-600 transition-all
                text-lg md:text-xl"
              type="text"
              id="email"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-6 group">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block md:text-lg text-slate-300 group-focus-within:text-rose-400 
                    transition-all duration-300"
              >
                Password
              </label>
              <div className="">
                <Link
                  to="#"
                  className="text-rose-400 hover:text-rose-500 focus:text-rose-500 transition-all duration-300"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <input
              className="block w-full rounded-md bg-slate-800 mt-2 px-3 pb-1.5 pt-1 text-slate-200 
                outline outline-1 -outline-offset-1 outline-slate-400 placeholder:text-slate-400 
                focus:outline-2 focus:-outline-offset-1 focus:outline-rose-600 transition-all
                text-lg md:text-xl"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rose-600 text-xl cursor-default font-bold rounded py-1.5 px-2 mt-10
              hover:bg-rose-500 outline outline-2 outline-transparent focus:outline-slate-400
                transition-all duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
