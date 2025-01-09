import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthConrtext";


const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser , setLoggedOutTime} = useAuthContext()

  const logout = async () => {
    setLoading(true)
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await res.json();
              console.log(data.localTime)
              if(data.error) {
                  throw new Error(data.error)
              }
              toast.success('logged out')
              localStorage.removeItem('kaiser-user')
              setAuthUser(null)
              setLoggedOutTime(data.localTime)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
  };
  return { logout, loading };
};

export default useLogout;
