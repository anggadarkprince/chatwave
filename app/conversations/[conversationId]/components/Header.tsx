'use client';

import { Conversation, User } from "@prisma/client";
import React, {useMemo, useState} from "react";
import useOtherUser from "@/app/hooks/useOtherUser";
import Link from "next/link";
import {HiChevronLeft, HiEllipsisVertical} from "react-icons/hi2";
import AvatarGroup from "@/app/components/AvatarGroup";
import Avatar from "@/app/components/Avatar";
import ProfileDrawer from "@/app/conversations/[conversationId]/components/ProfileDrawer";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}
const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return isActive
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full flex border-b-[1px] sm:px-3 py-2 px-2 lg:px-4 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link href="/conversations" className="lg:hidden block text-gray-600 hover:text-gray-800 transition cursor-pointer">
            <HiChevronLeft size={28} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisVertical
          size={28}
          onClick={() => setDrawerOpen(true)}
          className="cursor-pointer text-gray-600 hover:text-gray-800 transition"
        />
      </div>
    </>
  )
}
export default Header;
