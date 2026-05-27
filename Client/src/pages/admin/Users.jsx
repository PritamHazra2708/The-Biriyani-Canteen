import { useEffect, useState } from "react";
import axios from "axios";

function Users() {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/auth/users"
      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  return (

    <div className="p-8 text-white">

      <h1 className="text-5xl font-black text-pink-500 mb-10">
        USERS
      </h1>

      <div className="grid gap-5">

        {users.map((user) => (

          <div
            key={user._id}
            className="bg-white/10 p-5 rounded-2xl"
          >

            <h2 className="text-2xl font-bold">
              {user.name}
            </h2>

            <p className="text-gray-400">
              {user.email}
            </p>

            <p className="text-pink-400 mt-2">
              Role: {user.role}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Users;