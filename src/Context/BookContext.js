import React, { createContext, useReducer } from "react";
import { BookLibrary } from "../Component/FakeData";
export const BookContext = createContext();

const initialState = {
  bookData: BookLibrary,
  libraryData: [1, 2, 3],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      console.log(action.bookLoad);
      return {
        ...state,
        bookData: [...state.bookData, action.bookLoad],
      };
    case "ADD_LIBRARY":
      return {
        ...state,
        libraryData: [...state.libraryData, action.libraryLoad],
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
