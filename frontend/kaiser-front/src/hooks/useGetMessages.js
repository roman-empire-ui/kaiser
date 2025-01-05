import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useConvo from '../zustand/useConvo'

const useGetMessages = () => {
 const [loading , setLoading] = useState(false)
 const {selectedConversation , messages , setMessages} = useConvo()

useEffect(() => {
    const getMessages = async() => {
        setLoading(true)
        try {
            const res = await fetch(`api/messages/${selectedConversation._id}`, {
                method: 'GET',
            })
            const data = await res.json()
            if(data.error) throw new Error(data.error) 
            setMessages(data)
        } catch(e) {
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
     }
     if(selectedConversation?._id) getMessages()
} , [selectedConversation._id , setMessages]) 
    return {loading , messages}
}

export default useGetMessages
