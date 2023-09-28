import {useMemo} from "react";
import {usePathname} from "next/navigation";
import {HiOutlineChat, HiOutlineUserCircle} from 'react-icons/hi';
import {RiLogoutCircleLine} from 'react-icons/ri';
import {signOut} from "next-auth/react";
import useConversation from "./useConversation";

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
      icon: HiOutlineUserCircle,
      active: pathname === '/users'
    },
    {
      label: 'Logout',
      onClick: () => signOut(),
      href: '#',
      icon: RiLogoutCircleLine,
    }
  ], [pathname, conversationId]);
};

export default useRoutes;
