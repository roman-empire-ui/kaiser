import React, { useState } from 'react'
import useConvo from '../zustand/useConvo'
import toast from 'react-hot-toast'

const useSendMessages = () => {
    const [loading , setLoading] = useState(false)
    const {messages , selectedConversation , setMessages} = useConvo() 

    const sendMessage = async(message) => {
        setLoading(true) 

        try {
            const res = await fetch(`/api/messages/send/${selectedConversation._id} `, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({message})
            })
            const data = await res.json() 
            if(data.error) {
                throw new Error(data.error)
            }
            setMessages([...messages ,data])
        } catch (e) {
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }
    return {sendMessage , loading }
}

export default useSendMessages
