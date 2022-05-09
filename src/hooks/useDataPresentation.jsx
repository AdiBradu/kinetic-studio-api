import { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext.js";

const useTableViewAndDelete = (navlink) => {

  const { itemObj } = useContext(AppContext);
  const [empty, setEmpty] = useState(false);
  const [item, setItem] = itemObj;

  const handleView = (e) => {
    setItem(e);
  };

  const handleDelete = (e) => {
    console.log("Delete item", e, "from", navlink);
  };

  return { handleView, handleDelete, empty };
};

export default useTableViewAndDelete;
