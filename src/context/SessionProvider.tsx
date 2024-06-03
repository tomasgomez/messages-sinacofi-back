"use client";

import React, { useEffect, createContext, useState, useCallback } from "react";

export interface User {
  role: string;
  name: string;
  institutionCode: string;
  area: string;
  email: string;
  status: string;
}

export interface UserInfo {
  user: User;
  permissions: { [key: string]: boolean };
}
type initialUserInfoType = {
  userInfo: UserInfo | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
};

const initialUserInfoState: initialUserInfoType = {
  userInfo: undefined,
  setUserInfo: () => undefined,
};

export const SessionProviderContext = createContext(initialUserInfoState);

export const SessionProvider = ({ children }: { children: any }) => {
  const [userInfo, setUserInfo] = useState<initialUserInfoType | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/permissions");
        const fetchedData = await response.json();
        setUserInfo(fetchedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const contextValue = React.useMemo(
    (): initialUserInfoType => ({
      userInfo: userInfo as UserInfo | undefined,
      setUserInfo: setUserInfo as React.Dispatch<React.SetStateAction<UserInfo | undefined>>,
    }),
    [userInfo, setUserInfo]
  );
  
  return (
    <SessionProviderContext.Provider
      value={contextValue}
    >
      {children}
    </SessionProviderContext.Provider>
  );
};
