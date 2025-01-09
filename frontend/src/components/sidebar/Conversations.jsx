import React from "react";
import Conversation from "./Conversation";
import useGetConvo from "../../hooks/useGetConvo";
import { getRandomEmoji } from "../../utils/emoji";

const Conversations = () => {
  const { loading, convo } = useGetConvo();
  console.log("convo", convo);
  return (
    <div className="py-2 flex flex-col overflow-auto">
     {convo.map((conversation ,index) => (
        <Conversation 
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          index={index === conversation.length -1}
        
        />
     ))}

      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Conversations;