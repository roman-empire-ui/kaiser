import React, {  useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthConrtext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext()

  const signup = async ({fullName, userName, password,confirmPassword,gender}) => {

    const success = hanInputErrors({fullName, userName, password,confirmPassword,gender}) 
    if(!success) return  
    setLoading(true);
    try {
        const response = await fetch('/api/auth/signup' ,{
            method: 'POST',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({fullName, userName, password,confirmPassword,gender})
        })

        const data = await response.json()
        console.log(data)
        if(data.error) {
            throw new Error(data.error)
        }

        localStorage.setItem('kaiser-user', JSON.stringify(data))
        setAuthUser(data)

    } catch(e) {
        toast.error(e.message)
    } finally {
        setLoading(false)
    }

   
  };
   return {loading , signup}
};

function hanInputErrors({
  fullName,
  userName,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error('Please fill in all fields');
  }

  if(password !== confirmPassword) {
    toast.error('No matching password')
  }

  if(password.length < 6) {
    toast.error('Password must be 6 characters long')
  }

  return true
}

export default useSignup;
