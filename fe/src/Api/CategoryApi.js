import { useState, useEffect } from "react";

function CategoriesAPI() {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  //   useEffect(() => {
  //     const getCategories = async () => {
  //       const response = await categoryService.getCategories();
  //       setCategories(response);
  //     };

  //     getCategories();
  //   }, [callback]);
  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
}

export default CategoriesAPI;
