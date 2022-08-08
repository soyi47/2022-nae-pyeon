import { useState, createContext, PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";

import { appClient } from "@/api";
import { deleteCookie, getCookie, setCookie } from "@/util/cookie";

const COOKIE_KEY = {
  ACCESS_TOKEN: "accessToken",
};

interface UserContextType {
  isLoggedIn: boolean;
  login: (accessToken: string, memberId: number) => void;
  logout: () => void;
  memberId: number | null;
}

interface UserInfo {
  id: number;
  username: string;
  email: string;
}

const UserContext = createContext<UserContextType>(null!);

const UserProvider = ({ children }: PropsWithChildren) => {
  const accessTokenCookie = getCookie(COOKIE_KEY.ACCESS_TOKEN);

  const [isLoggedIn, setIsLoggedIn] = useState(!!accessTokenCookie);
  const [memberId, setMemberId] = useState<number | null>(null);

  useQuery<UserInfo>(
    ["memberId"],
    () =>
      appClient
        .get("/members/me", {
          headers: {
            Authorization: `Bearer ${accessTokenCookie || ""}`,
          },
        })
        .then((response) => response.data),
    {
      enabled: !!accessTokenCookie,
      onSuccess: (data) => {
        setMemberId(data.id);
        setIsLoggedIn(true);

        appClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessTokenCookie}`;
      },
    }
  );

  const autoLogin = (accessToken: string, memberId: number) => {
    appClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
    setIsLoggedIn(true);
    setMemberId(memberId);
  };

  const login = (accessToken: string, memberId: number) => {
    appClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
    setCookie(COOKIE_KEY.ACCESS_TOKEN, accessToken);
    setIsLoggedIn(true);
    setMemberId(memberId);
  };

  const logout = () => {
    appClient.defaults.headers.common["Authorization"] = `Bearer `;
    deleteCookie(COOKIE_KEY.ACCESS_TOKEN);
    setIsLoggedIn(false);
    setMemberId(null);
  };

  const value = { isLoggedIn, autoLogin, login, logout, memberId };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
