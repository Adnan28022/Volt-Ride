import { Outlet } from "react-router-dom";
import Navbar from "../component/layout/Navbar";
import Footer from "../component/layout/Footer";

const UserLayout = () => {
  return (
    <div className="">
      <Navbar />
      <main className="pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;