"use client";

import { signOut } from "next-auth/react";

const Users = () => {
  return <button onClick={() => signOut()}>Logout</button>;
};

export default Users;
