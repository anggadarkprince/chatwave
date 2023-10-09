'use client';

import { User } from "@prisma/client";

import UserItem from "./UserItem";
import React from "react";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({items}) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-16 lg:w-[350px] lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-3">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">
            People
          </div>
        </div>
        {items.map((item) => (
          <UserItem key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
}

export default UserList;
