import { useLocation, Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Sidebar from "../src/components/Sidebar";

const Layout = () => {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideLayout && <Navbar />}
      {!hideLayout && <Sidebar />}

      <div className={!hideLayout ? "main" : ""}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;