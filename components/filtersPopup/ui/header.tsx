import Image from 'next/image';

import { useFilters } from '../../../context/FiltersProvider';
import cross from '../../../public/assets/icons/cross.svg';
import Button from '../../button';

function Header() {
  const { hide } = useFilters();

  return (
    <header className="relative flex items-center border-b border-primary-100 px-6 py-5">
      <Button className="absolute cursor-pointer p-1" onClick={hide} type="rounded">
        <Image className="h-6 w-6" src={cross} alt="" />
      </Button>

      <h4 className="mx-auto font-extrabold">Filters</h4>
    </header>
  );
}

export default Header;
