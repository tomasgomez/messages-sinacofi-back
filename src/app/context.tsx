import { createContext, useContext } from "react";

export const MyContexLayout = createContext({});


type AppContextType = {
  selectedInstitution: any;
}

export const useAppContext = (): AppContextType => {
  const context = useContext(MyContexLayout) as AppContextType;

  return context;
};