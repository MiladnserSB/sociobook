import { Outlet } from "react-router";
import UserNavbar from "./UserNavbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <UserNavbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
