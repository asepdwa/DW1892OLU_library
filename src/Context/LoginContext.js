import React, { createContext, useReducer } from "react";
import { UserDummy } from "../Component/FakeData";
export const LoginContext = createContext();

const initialState = {
  userData: UserDummy,
  loginData: {},
  isLogin: false || localStorage.getItem("isLogin"),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("isLogin", true);
      localStorage.setItem("loginData", JSON.stringify(action.loginData));

      return {
        ...state,
        isLogin: true,
        loginData: action.loginData,
      };

    case "REGISTER":
      localStorage.setItem("userData", JSON.stringify(action.userData));
      return {
        ...state,
        userData: [...state.userData, action.userData],
      };
    case "LOGOUT":
      localStorage.removeItem("isLogin");
      localStorage.removeItem("loginData");

      return {
        ...state,
        isLogin: false,
        loginData: [],
      };
    default:
      throw new Error();
  }
};

export default function LoginContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LoginContext.Provider value={[state, dispatch]}>
      {props.children}
    </LoginContext.Provider>
  );
}
