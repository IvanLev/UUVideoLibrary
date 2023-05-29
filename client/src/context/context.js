import { createContext, useEffect, useState } from "react";

const UserContext = createContext(null);
const PopupContex = createContext(null);
const VideoContext = createContext(null)

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const saveUser = (user) => {
    const jsonUser = JSON.stringify(user);
    localStorage.setItem('user', jsonUser);
    setUser(user);
  }

  useEffect(() => {
    const storage = localStorage.getItem('user');
    const user = storage ? JSON.parse(storage) : null;
    setUser(user);
  }, [])

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { ContextProvider, UserContext, PopupContex, VideoContext };
