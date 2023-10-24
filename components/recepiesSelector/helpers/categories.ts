import AllRecipes from '../ui/AllRecipes';
import Breakfast from '../ui/Breakfast';
import Desserts from '../ui/Desserts';
import Dinners from '../ui/Dinners';
import Lunches from '../ui/Lunches';

export const categories = [
  {
    Elem: AllRecipes,
    title: 'Все рецепты',
    key: 'all',
  },
  {
    Elem: Breakfast,
    title: 'Завтраки',
    key: 'breakfast',
  },
  {
    Elem: Dinners,
    title: 'Обеды',
    key: 'dinners',
  },
  {
    Elem: Lunches,
    title: 'Ланчи',
    key: 'lunches',
  },
  {
    Elem: Desserts,
    title: 'Дессерты',
    key: 'desserts',
  },
] as const;
