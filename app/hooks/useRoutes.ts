import {useMemo} from "react";
import {usePathname} from "next/navigation";
import {HiOutlineChat, HiOutlineUserCircle} from 'react-icons/hi';
import {signOut} from "next-auth/react";
import useConversation from "./useConversation";
import {BiLogOut} from "react-icons/bi";
import {FiUsers} from "react-icons/fi";
import {RiChatHistoryLine, RiSettings4Line, RiSettingsLine} from "react-icons/ri";
import {MdLogout} from "react-icons/md";
import {LuLogOut, LuSettings, LuSettings2} from "react-icons/lu";

const useRoutes = () => {
  const pathname = usePathname();
  const {conversationId} = useConversation();

  return useMemo(() => [
    {
      label: 'Chat',
      href: '/conversations',
      icon: HiOutlineChat,
      active: pathname === '/conversations' || !!conversationId
    },
    {
      label: 'Users',
      href: '/users',
      icon: FiUsers,
      active: pathname === '/users'
    },
    {
      label: 'Moments',
      href: '/moments',
      icon: RiChatHistoryLine,
      active: pathname === '/moments'
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: LuSettings2,
      active: pathname === '/settings'
    },
    {
      label: 'Logout',
      onClick: () => signOut(),
      href: '#',
      icon: LuLogOut,
    }
  ], [pathname, conversationId]);
};

export default useRoutes;
