'use client';

import Image from 'next/image';

import CategoryList from './ui/categoryList';
import RecipeData from './ui/recipeData';
import filterIcon from '../../public/assets/icons/Filters.svg';
import sortIcon from '../../public/assets/icons/Sort.svg';
import Button from '../button';
import Filters from '../filtersPopup/filtersPopup';
import Sort from '../sort/sort';

export default function RecepiesSelector() {
  return (
    <>
      <div className="justify-between sm:mt-8 sm:flex sm:items-center">
        <RecipeData />
        <div className="mt-4 flex items-center justify-between gap-6 text-base font-[600] sm:mt-0">
          <Filters>
            <Filters.Open>
              <Button type="empty" className="flex items-center gap-[10px]">
                <Image src={filterIcon} alt="" />
                Filters
              </Button>
            </Filters.Open>

            <Filters.Popup />
          </Filters>

          <Sort>
            <Sort.Open>
              <Button type="empty" className="flex items-center gap-[10px]">
                <Image src={sortIcon} alt="" />
                Sort
              </Button>
            </Sort.Open>

            <Sort.Select>
              <Sort.Option value="calories-asc">by calories ⬆️</Sort.Option>
              <Sort.Option value="calories-desc">by calories ⬇️</Sort.Option>
              <Sort.Option value="time-asc">by cooking time ⬆️</Sort.Option>
              <Sort.Option value="time-desc">by cooking time ⬇️</Sort.Option>
            </Sort.Select>
          </Sort>
        </div>
      </div>
      <CategoryList />
    </>
  );
}
