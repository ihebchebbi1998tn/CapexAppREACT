import { createContext, useContext, useState } from "react";

// Create a new context for managing session data
const SessionContext = createContext();

// Custom hook to access session data
export function useSession() {
  return useContext(SessionContext);
}

// SessionProvider component to manage session data
export function SessionProvider({ children }) {
  // Initialize session data using local storage or default values
  const [sessionData, setSessionData] = useState(() => {
    const storedSessionData = localStorage.getItem("sessionData");
    return storedSessionData
      ? JSON.parse(storedSessionData)
      : { Logingout: "", loginoutInactive: ""};
  });

  // Function to update session data
  const updateSession = (Logingout, loginoutInactive) => {
    const newSessionData = { Logingout, loginoutInactive };
    setSessionData(newSessionData);

    // Store the updated session data in local storage
    localStorage.setItem("sessionData", JSON.stringify(newSessionData));
  };

  return (
    <SessionContext.Provider value={{ sessionData, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
}
