import { memo } from 'react';

import CaloriesRange from './caloriesRange';
import CookingRange from './cookingRange';
import Essentials from './essentials';

const Main = memo(function Main() {
  return (
    <main className="max-h-72 overflow-y-scroll p-6">
      <Essentials />
      <CaloriesRange />
      <CookingRange />
    </main>
  );
});

export default Main;
