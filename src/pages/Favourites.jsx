import RecipeItem from "../components/RecipeItem";
import { useContext } from "react";
import { GlobalContext } from "../context";

const Favourites = () => {
  const { favourites } = useContext(GlobalContext);
  // console.log(favourites);

  return (
    <div className="container mx-auto gap-10 flex flex-col">
      <div>
        <h2 className="text-4xl text-center font-bold">Favourites</h2>
      </div>
      <div className="flex gap-10">
        {favourites && favourites.length > 0 ? (
          favourites.map((item) => <RecipeItem item={item} key={item.id} />)
        ) : (
          <div>
            <p className="text-xl text-center text-black font-extrabold lg:text-3xl">
              Nothing is Added to Favourites!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Favourites;
