"use client";

import { useState } from "react";

import { User } from "@prisma/client";

import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";

interface ProfileItemProps {
  currentUser: User;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div onClick={() => setIsOpen(true)} className="cursor-pointer hover:opacity-75 transition">
        <Avatar user={currentUser} />
      </div>
    </>
  );
};

export default ProfileItem;
