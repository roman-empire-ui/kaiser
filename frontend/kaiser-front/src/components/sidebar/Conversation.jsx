import React from "react";
import useConvo from "../../zustand/useConvo";
import { useSocketContext } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthConrtext";

const Conversation = ({ conversation, emoji, index }) => {
    const {selectedConversation , setSelectedConversation} = useConvo() 
    const {loggedOutTime} = useAuthContext()
    

    const isSelected = selectedConversation?._id === conversation._id

    const {onlineUsers} = useSocketContext()
    const isOnline = onlineUsers.includes(conversation._id)
    console.log('online',isOnline)
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-sky-500' : ''}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profile} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            {isOnline ? (
              <span className="text-xl">{emoji}</span>
            ) : (
              <span className="text-sm text-gray-400">
                {loggedOutTime
                  ? `Last seen: ${loggedOutTime}` // Use loggedOutTime from context
                  : 'offline'}
              </span>
            )}
          </div>
        </div>
      </div>

      {!index && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation