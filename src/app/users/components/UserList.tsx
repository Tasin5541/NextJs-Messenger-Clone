"use client";

import { useState } from "react";

import { User } from "@prisma/client";

import SearchInput from "./SearchInput";
import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  const [searchBy, setSearchBy] = useState("");

  const filterBySearch = (user: User) => {
    if (searchBy) {
      const lowerCaseSearch = searchBy.toLocaleLowerCase();
      const email = user.email || "";
      const name = user.name || "";
      return email.includes(lowerCaseSearch) || name.includes(lowerCaseSearch);
    }
    return true;
  };

  return (
    <aside
      className="
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
        dark:border-lightgray
      "
    >
      <div className="px-5">
        <div className="flex-col">
          <div
            className="
              text-2xl 
              font-bold 
              text-neutral-800 
              py-4
              dark:text-gray-200
            "
          >
            People
          </div>
        </div>
        <SearchInput
          id="search"
          placeholder="search by name, email ..."
          setSearchBy={setSearchBy}
        />
        {items.filter(filterBySearch).map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
