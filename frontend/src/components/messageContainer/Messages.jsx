import { useEffect, useRef } from "react";

import useGetMessages from "../../hooks/useGetMessages";
import Skeleton from "../Skeleton/Skeleton";
import Message from "./Message";
import useMessages from "../../hooks/useMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages(); 
  useMessages()
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message key={message._id} message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, index) => <Skeleton key={index} />)}

      {!loading && messages.length === 0 && (
        <p>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages