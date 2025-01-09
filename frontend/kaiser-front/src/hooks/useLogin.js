import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthConrtext"








const useLogin = () => {
    const [loading , setLoading] = useState(false)

    const {setAuthUser} = useAuthContext()


    const login = async(userName , password) => {
        const success = handleInputErrorrs(userName , password)
        if(!success) return
        setLoading(true)

        try {
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({userName , password})
            })

            const data = await res.json() 
            if(data.error) {
                throw new Error(data.error)
            }
            toast.success('Logged in')

            localStorage.setItem('kaiser-user' ,JSON.stringify(data))
            setAuthUser(data)


        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {loading , login}
}


function handleInputErrorrs (userName , password) {
    if(!userName || !password) {
        toast.error('Please fill the credentials to login')
        return false
    }
    return true
                
}

export default useLogin;