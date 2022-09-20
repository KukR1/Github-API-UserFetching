import { createContext, useContext } from "react";
import { HistoryData } from "../Overview";

export type ContextProviderType = {
  history: HistoryData[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryData[]>>;
};

export const Context = createContext<ContextProviderType>({
  history: [],
  setHistory: () => { },
});

export const useContextData = () => useContext(Context);

/* User Context */

export type UserContextType = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<UserContextType>({
  user: "",
  setUser: () => { },
});

export const useUserContext = () => useContext(UserContext);




