import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { Channel, Members } from "pusher-js";

import { pusherClient } from "../libs/pusher";
import useActiveList from "./useActiveList";

const useActiveChannel = () => {
  const session = useSession();

  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    // Only subscribe to channel after user logs in so the user's active status gets updated real time
    if (session?.status !== "authenticated") {
      return;
    }

    if (!channel) {
      channel = pusherClient.subscribe("presence-messenger");
      setActiveChannel(channel);
    }

    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) => initialMembers.push(member.id));
      set(initialMembers);
    });

    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      add(member.id);
    });

    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe("presence-messenger");
        setActiveChannel(null);
      }
    };
  }, [activeChannel, set, add, remove, session?.status]);
};

export default useActiveChannel;
