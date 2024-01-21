import { createContext, useContext } from 'react';

type IsLoggedIn = {
    isLoggedIn: boolean;
}

type UserContextType = {
    isLoggedIn : boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<IsLoggedIn>>,
  };

export const UserContext = createContext<UserContextType|undefined>(undefined);

export function useUserContext(): UserContextType {
    const user = useContext(UserContext);
  
    if (user === undefined) {
      throw new Error('userContext-> useUserContext must be used within a UserContext.Provider');
    }
  
    return user;
  }
  