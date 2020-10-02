import React, { createContext, useReducer } from "react";
import { BookLibrary } from "../Component/FakeData";
export const BookContext = createContext();

const initialState = {
  bookData: BookLibrary,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return {
        ...state,
        bookData: [...state.bookData, action.bookLoad],
      };
    default:
      throw new Error();
  }
};

export default function BookContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BookContext.Provider value={[state, dispatch]}>
      {props.children}
    </BookContext.Provider>
  );
}
