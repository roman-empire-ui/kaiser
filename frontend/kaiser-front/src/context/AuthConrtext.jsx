import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("kaiser-user");
      return storedUser ? JSON.parse(storedUser) : null; 
    } catch (e) {
      console.error("Error parsing localStorage 'kaiser-user':", e);
      return null;
    }
  });
  const [loggedOutTime , setLoggedOutTime] = useState(null)

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loggedOutTime , setLoggedOutTime }}>
      {children}
    </AuthContext.Provider>
  );
};
