import React, { createContext, useReducer } from "react";
export const BookContext = createContext();

const initialState = {
  bookData: [],
  categoryData: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_BOOK":
      return {
        ...state,
        bookData: [...state.bookData, action.bookLoad],
        categoryData: [...state.bookData, action.categoryLoad],
      };
    // case "ADD_BOOK":
    //   console.log(action.bookLoad);
    //   return {
    //     ...state,
    //     bookData: [...state.bookData, action.bookLoad],
    //   };
    // case "ADD_LIBRARY":
    //   return {
    //     ...state,
    //     libraryData: [...state.libraryData, action.libraryLoad],
    //   };
    // case "VERIFICATION":
    //   return {
    //     ...state,
    //     bookData: state.bookData.map((book) =>
    //       book.id === action.bookLoad.id
    //         ? {
    //           ...book,
    //           status: action.bookLoad.status,
    //         }
    //         : book
    //     ),
    //   };
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
