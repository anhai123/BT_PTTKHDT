import { createContext, useEffect, useState } from "react";
import FilmsAPI from "./Api/FilmApi";
import UserAPI from "./Api/UserApi";
import CategoriesAPI from "./Api/CategoryApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const state = {
    flimsAPI: FilmsAPI(),
    categoriesAPI: CategoriesAPI(),
    userAPI: UserAPI(),
    socket,
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
