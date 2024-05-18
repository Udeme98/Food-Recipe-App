import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favourites, setFavourites] = useState([]);

  const navigate = useNavigate();

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
        navigate("/");
      }

      //   console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  };

  const addToFavourites = (getCurrentItem) => {
    // console.log(getCurrentItem);

    let cpyFavouritesList = [...favourites];
    const index = cpyFavouritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      cpyFavouritesList.push(getCurrentItem);
    } else {
      cpyFavouritesList.splice(getCurrentItem);
    }

    setFavourites(cpyFavouritesList);
  };

  console.log(favourites);

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipe,
        setSearchParam,
        handleSubmit,
        recipeDetails,
        setRecipeDetails,
        addToFavourites,
        favourites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;
