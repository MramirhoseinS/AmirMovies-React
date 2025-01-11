import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Toaster } from "react-hot-toast";
import UserProvider from "./context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <div>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
        <Toaster />
      </UserProvider>
    </>
  );
}

export default App;
