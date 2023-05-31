"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import useConversation from "@/app/hooks/useConversation";
import { find } from "lodash";

import { pusherClient, pusherEvents } from "../../../libs/pusher";
import { FullMessageType } from "../../../types";
import MessageBox from "./MessageBox";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          // update the message only if it matches the new message id
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind(pusherEvents.NEW_MESSAGE, messageHandler);
    pusherClient.bind(pusherEvents.UPDATE_MESSAGE, updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind(pusherEvents.NEW_MESSAGE, messageHandler);
      pusherClient.unbind(pusherEvents.UPDATE_MESSAGE, updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox isLast={i === messages.length - 1} key={message.id} data={message} />
      ))}
      <div className="pt-1" ref={bottomRef} />
    </div>
  );
};

export default Body;
