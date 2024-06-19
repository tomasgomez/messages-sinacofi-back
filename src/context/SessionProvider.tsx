'use client';

import { useSession } from "next-auth/react";
import React, { useEffect, createContext, useState, useCallback  } from "react";


export interface User {
  role:            string;
  name:            string;
  institutionCode: string;
  area:            string;
  email:           string;
  status:          string;
}

export interface UserInfo {
  user:        User;
  permissions: { [key: string]: boolean };
}

type initialUserInfoType = UserInfo | undefined;

interface SessionContextType {
  userInfo: UserInfo | undefined,
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>,
}

const initialUserInfoState: SessionContextType = {
  userInfo: undefined,
  setUserInfo: () => undefined
}

export const SessionProviderContext = createContext<SessionContextType>(initialUserInfoState);

export const SessionProvider = ({ children }: { children: any}) => {

    const [userInfo, setUserInfo] = useState<initialUserInfoType | undefined>(undefined);
    const {data: session, status} = useSession();
    useEffect(() => {
    
      if(status==='authenticated'){
        const fetchData = async () => {
          try {
            const response = await fetch(`/api/permissions`);
            const fetchedData = await response.json();
            setUserInfo(fetchedData);
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchData();

      }  
      }, [status, session]);

    const contextValue = React.useMemo(
        () => ({
            userInfo, setUserInfo
        }),
        [
            userInfo, setUserInfo
        ],
    );
    return (
        <SessionProviderContext.Provider value={contextValue}>
            {children}
        </SessionProviderContext.Provider>
    );
};