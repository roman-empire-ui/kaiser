import  { useState } from 'react'
import {BsSend} from 'react-icons/bs'
import useSendMessages from '../../hooks/useSendMessages'
const MessageInput = () => {

  const {loading , sendMessage} = useSendMessages()
  const [message , setMessage] = useState('')

  const hanSubmit = async(e) => {
    e.preventDefault()
    await sendMessage(message)
    setMessage('')

  }
  return (
    <form className='px-4 my-3' onSubmit={hanSubmit} >
    <div className='w-full relative'>
      <input
        type='text'
        className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
        placeholder='Send a message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}

      />
      <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
       {loading? <span className='loading loading-spinner'></span> : <BsSend/>}
      </button>
    </div>
  </form>
  )
}

export default MessageInput