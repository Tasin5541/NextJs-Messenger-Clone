"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import { User } from "@prisma/client";

import MobileItem from "./MobileItem";
import ProfileItem from "./ProfileItem";

interface MobileFooterProps {
  currentUser: User;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
        fixed 
        justify-between 
        w-full 
        bottom-0 
        z-40 
        flex 
        items-center 
        bg-white 
        border-t-[1px] 
        lg:hidden
      "
      >
        {routes.map((route) => (
          <MobileItem
            key={route.href}
            href={route.href}
            active={route.active}
            icon={route.icon}
            onClick={route.onClick}
          />
        ))}
        <div
          className="
            group 
            flex 
            gap-x-3 
            text-sm 
            leading-6 
            font-semibold 
            w-full 
            justify-center 
            text-gray-500 
            "
        >
          <ProfileItem currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
