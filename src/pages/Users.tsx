import { useEffect, useState } from "react";
import { request } from "../lib/service";
import UserList from "../components/users/UserList";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await request("users");
      setUsers(data);
    };

    getUsers();
  }, []);

  return (
    <main className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Users</h1>

      <UserList users={users} />
    </main>
  );
};

export default Users;
