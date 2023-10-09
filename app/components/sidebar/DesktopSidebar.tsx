'use client';

import React, {useState} from "react";
import {User} from "@prisma/client";
import useRoutes from "@/app/hooks/useRoutes";
import DesktopItem from "@/app/components/sidebar/DesktopItem";
import Avatar from "@/app/components/Avatar";
import SettingModal from "@/app/components/sidebar/SettingModal";
import Image from "next/image";

interface DesktopSidebarProps {
  currentUser?: User | null
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({currentUser}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-16 xl:px-3 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role={"list"} className="flex flex-col items-center space-y-1">
            <li className="mb-2">
              <Image src="/images/logo.png" alt="logo" width={50} height={50} className="w-8 h-8" />
            </li>
            {routes.map((item) => (
              <DesktopItem key={item.label} label={item.label} href={item.href} icon={item.icon} active={item.active} onClick={item.onClick} />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div onClick={() => setIsOpen(true)} className="cursor-pointer hover:opacity-75 transition">
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  )
}

export default DesktopSidebar;
