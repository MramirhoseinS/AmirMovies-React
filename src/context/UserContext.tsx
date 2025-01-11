import { createContext, ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IUserContext {
  user: IUserState;
  setUser: React.Dispatch<React.SetStateAction<IUserState>>;
  // login: ({ username, password }: ILogin) => void;
}
interface IUserState {
  name: string;
  username: string;
  id: number;
}


export const UserContext = createContext<IUserContext | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    id: 0,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
