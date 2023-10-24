import { NamedExoticComponent } from 'react';

import { Categories, useFilters } from '../../../context/FiltersProvider';

type propsType = {
  Elem: NamedExoticComponent<{ color: string }>;
  title: string;
  catKey: Categories;
};

export default function CategoryItem({ Elem, title, catKey }: propsType) {
  const { updateCategory, activeCategory } = useFilters();

  const isActive = activeCategory === catKey;
  const textColor = isActive ? 'text-accent-600' : 'text-primary-900';
  const svgColor = isActive ? 'fill-accent-600' : 'fill-primary-900';

  return (
    <li>
      <button
        className={`${textColor} myRecepBtn flex flex-col items-center justify-center gap-4 whitespace-nowrap transition-all duration-200 hover:text-accent-400`}
        onClick={() => {
          updateCategory(catKey);
        }}
      >
        <Elem color={svgColor} />
        {title}
      </button>
    </li>
  );
}
