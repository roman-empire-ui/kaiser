import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConvo from "../zustand/useConvo";
import notification from '../assets/notification.mp3'


const useMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages, messages } = useConvo();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true
      const ringtone = new Audio(notification)
      ringtone.play()
      setMessages([...messages , newMessage])
    });
  
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages , messages]);
  
};

export default useMessages;
