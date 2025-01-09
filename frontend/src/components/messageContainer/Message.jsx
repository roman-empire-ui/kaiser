import React from 'react'
import { useAuthContext } from '../../context/AuthConrtext'
import useConvo from '../../zustand/useConvo'
import { extractTime } from '../../utils/extractTime'

const Message = ({message}) => {
  const {authUser} = useAuthContext() 
  const {selectedConversation} = useConvo() 
  const myMessage = message.senderId === authUser._id
  const chat = myMessage ? 'chat-end' : 'chat-start'
  const profilePic = myMessage ? authUser.profile : selectedConversation?.profile
  const theme = myMessage? 'bg-sky-500' : 'bg-slate-500'
  const time = extractTime(message.createdAt)

  const shakeClass = message.shouldShake ? 'shake' : ''
  return (
    <div className={`chat ${chat}`}>
    <div className='chat-image avatar'>
      <div className='w-10 rounded-full'>
        <img src={profilePic} alt='Tailwind CSS chat bubble component'  />
      </div>
    </div>
    <div className={`chat-bubble text-white  pb-2 ${theme} ${shakeClass}`}> {message.message} </div>
    <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'> {time} </div>
  </div>
  )
}

export default Message