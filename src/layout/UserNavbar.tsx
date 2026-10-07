import { NavLink } from "react-router";
import { Button } from "../components/ui/button";

const UserNavbar = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center gap-2 px-6">
        <NavLink to="/posts">
          {({ isActive }) => (
            <Button variant={isActive ? "default" : "ghost"}>All Posts</Button>
          )}
        </NavLink>

        <NavLink to="/albums">
          {({ isActive }) => (
            <Button variant={isActive ? "default" : "ghost"}>Albums</Button>
          )}
        </NavLink>

        <NavLink to="/photos">
          {({ isActive }) => (
            <Button variant={isActive ? "default" : "ghost"}>Photos</Button>
          )}
        </NavLink>

        <NavLink to="/comments">
          {({ isActive }) => (
            <Button variant={isActive ? "default" : "ghost"}>Comments</Button>
          )}
        </NavLink>

        <NavLink to="/todos">
          {({ isActive }) => (
            <Button variant={isActive ? "default" : "ghost"}>Todos</Button>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default UserNavbar;
