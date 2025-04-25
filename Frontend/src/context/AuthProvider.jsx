import React, { createContext, useContext, useState, useEffect } from "react";

// Create context for auth
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // Get initial user from localStorage
  const initialAuthUser = localStorage.getItem("Users");
  
  // Initialize authUser: null if not found
  const [authUser, setAuthUser] = useState(
    initialAuthUser ? JSON.parse(initialAuthUser) : null
  );

  //  Update localStorage whenever authUser changes
  useEffect(() => {
    if (authUser && typeof authUser === "object" && authUser._id && authUser.token)  {
      // Save valid user
      localStorage.setItem("Users", JSON.stringify(authUser));
    } else if (authUser === null) {
      // Remove on logout
      localStorage.removeItem("Users");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

// Export hook for using auth
export const useAuth = () => useContext(AuthContext);


