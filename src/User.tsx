import React from "react";

interface User {
  user: {
    id: number;
    username: string;
  };
}

const Users = ({ user }: User) => {
  return (
    <div>
      <div>
        <b>ID</b>: {user.id}
      </div>
      <div>
        <b>Username:</b> {user.username}
      </div>
    </div>
  );
};

export default Users;
