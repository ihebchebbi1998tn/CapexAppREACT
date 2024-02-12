import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    // Retrieve user data from local storage when the component initializes
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : { nom: "", email: "", pass: "" , id: "", type: "" , groupe: "",  StayLogged: "", image:""};
  });

  const updateUser = (nom, email, pass, id, type, groupe, StayLogged ,image) => {
    const newUserData = {nom, email, pass, id, type, groupe, StayLogged ,image};
    setUserData(newUserData);

    // Store the updated user data in local storage
    localStorage.setItem("userData", JSON.stringify(newUserData));
  };

 
  

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
