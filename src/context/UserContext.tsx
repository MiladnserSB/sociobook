import { createContext, useState } from "react";

export const userContext = createContext({
  userId: -1,
  setUserId: (_userId: number) => {},
});

export const UserProvider = ({ children }: { children }) => {
  const [userId, setUserId] = useState(-1);

  return (
    <userContext.Provider value={{ userId, setUserId }}>
      {children}
    </userContext.Provider>
  );
};
