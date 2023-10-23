import { categories } from '../helpers/categories';
import CategoryItem from '../helpers/CategoryItem';

function CategoryList() {
  return (
    <ul className="mt-10 flex gap-9 overflow-x-scroll pb-2 sm:overflow-x-hidden">
      {categories.map((cat) => (
        <CategoryItem Elem={cat.Elem} title={cat.title} catKey={cat.key} key={cat.key} />
      ))}
    </ul>
  );
}

export default CategoryList;
