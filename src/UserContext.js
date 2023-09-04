import { createContext, useContext, useEffect, useState, useRef } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    // Retrieve user data from local storage when the component initializes
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : { email: "", id: "", type: "" };
  });

  const updateUser = (email, id, type) => {
    const newUserData = { email, id, type };
    setUserData(newUserData);

    // Store the updated user data in local storage
    localStorage.setItem("userData", JSON.stringify(newUserData));
  };

  // Function to clear user data and log out
  const logout = () => {
    setUserData({ email: "", id: "", type: "" });
    localStorage.removeItem("userData");
  };

  const timeoutIdRef = useRef(null); // Use a ref to store the timeout ID

  useEffect(() => {
    // Set a timeout for 15 minutes (15 * 60 * 1000 milliseconds)
    timeoutIdRef.current = setTimeout(() => {
      // After 15 minutes of inactivity, log the user out
      logout();
      // Redirect the user to the home page
      window.location.href = "/";
    }, 15 * 60 * 1000); // 15 minutes

    // Clear the timeout when the user interacts with the application
    const resetTimeout = () => {
      clearTimeout(timeoutIdRef.current);
      // Restart the timeout
      timeoutIdRef.current = setTimeout(() => {
        // After 15 minutes of inactivity, log the user out
        logout();
        // Redirect the user to the home page
        window.location.href = "/";
      }, 15 * 60 * 1000); // 15 minutes
    };

    // Add event listeners to reset the timeout when the user interacts with the app
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keydown", resetTimeout);

    // Cleanup the event listeners when the component unmounts
    return () => {
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keydown", resetTimeout);
    };
  }, []);

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
