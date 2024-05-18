import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();

      if (data?.data?.recipes) {
        setRecipe(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
      }

      //   console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  };

  return (
    <GlobalContext.Provider
      value={{ searchParam, loading, recipe, setSearchParam, handleSubmit }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;
