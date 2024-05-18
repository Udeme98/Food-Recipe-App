import { useContext } from "react";
import { GlobalContext } from "../context";
import RecipeItem from "../components/RecipeItem";

const Home = () => {
  const { loading, recipe } = useContext(GlobalContext);
  //   console.log(recipe);

  if (loading) return <div>Loading... Please Wait!</div>;

  return (
    <div className="container mx-auto py-8 flex flex-wrap justify-center gap-10">
      {recipe && recipe.length > 0 ? (
        recipe.map((item) => <RecipeItem item={item} key={item.id} />)
      ) : (
        <div>
          <p className="text-xl text-center text-black font-extrabold lg:text-3xl">
            Nothing to Show. Please Search A Recipe!
          </p>
        </div>
      )}
    </div>
  );
};
export default Home;
