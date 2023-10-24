import { cloneElement, ReactElement } from 'react';

import Footer from './ui/footer';
import Header from './ui/header';
import Main from './ui/main';
import { useFilters } from '../../context/FiltersProvider';
import useOutsideClick from '../../hooks/useOutsideClick';

interface IOpenProps {
  children: ReactElement;
}

function Filters({ children }) {
  return <div className="relative">{children}</div>;
}

function FiltersPopup() {
  const { isOpen, hide } = useFilters();
  const ref = useOutsideClick<HTMLDivElement>(hide);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute z-30 mt-4 w-80 -translate-x-6 rounded-2xl border-b border-primary-100 bg-white pb-5 drop-shadow-2xl sm:left-full sm:-translate-x-full"
    >
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

function Open({ children }: IOpenProps) {
  const { show } = useFilters();

  return cloneElement(children, { onClick: show });
}

Filters.Open = Open;
Filters.Popup = FiltersPopup;

export default Filters;
