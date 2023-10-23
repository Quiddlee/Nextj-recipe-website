import { useRecipes } from '../../../context/RecipeProvider';

function RecipeData() {
  const { recipes } = useRecipes();
  const recipeNum = recipes.length;

  return (
    <div className="mt-10 flex items-center sm:mt-0">
      <p className="rounded-sm border-r-[3px] border-primary-200 pr-[10px] text-2xl font-bold">
        Browse&nbsp;Recepies
      </p>
      <p className="pl-[10px] text-sm font-[600] text-accent-500 sm:text-base">
        {recipeNum} recipes
      </p>
    </div>
  );
}

export default RecipeData;
