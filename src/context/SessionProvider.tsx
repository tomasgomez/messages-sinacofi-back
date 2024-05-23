'use client';

import React, { useEffect, createContext, useState, useCallback  } from "react";

type initialUserInfoType = {
  userInfo: {},
  setUserInfo: Function,
};

const initialUserInfoState: initialUserInfoType = {
    userInfo: {},
  setUserInfo: () => [],
};

export const SessionProviderContext = createContext(initialUserInfoState);

export const SessionProvider = ({ children }: { children: any}) => {

    const [userInfo, setUserInfo] = useState<{}>({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/permissions');
            const fetchedData = await response.json();
            setUserInfo(fetchedData);
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchData();
      }, []);
    
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
