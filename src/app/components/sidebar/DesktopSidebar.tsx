"use client";

import { useState } from "react";

import useRoutes from "../../hooks/useRoutes";
import DesktopItem from "./DesktopItem";

const DesktopSidebar: React.FC = () => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="
        hidden 
        lg:fixed 
        lg:inset-y-0 
        lg:left-0 
        lg:z-40 
        lg:w-20 
        xl:px-6
        lg:overflow-y-auto 
        lg:bg-white 
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
      "
      >
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
