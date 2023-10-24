'use client';

import Image from 'next/image';
import { useState } from 'react';

import getCategoriesList from './helpers/getCategoriesList';
import { useRecipes } from '../../context/RecipeProvider';
import filterIcon from '../../public/assets/icons/Filters.svg';
import sortIcon from '../../public/assets/icons/Sort.svg';
import Button from '../button';
import Filters from '../filtersPopup/filtersPopup';
import Sort from '../sort/sort';

export default function RecepiesSelector() {
  const [activeCat, setActiveCat] = useState('all');
  const { recipes } = useRecipes();

  const recipeNum = recipes.length;

  const catList = getCategoriesList({ activeCat, setActiveCat });

  return (
    <div>
      <div className="justify-between sm:mt-8 sm:flex sm:items-center">
        <div className="mt-10 flex items-center sm:mt-0">
          <p className="rounded-sm border-r-[3px] border-primary-200 pr-[10px] text-2xl font-bold">
            Browse&nbsp;Recepies
          </p>
          <p className="pl-[10px] text-sm font-[600] text-accent-500 sm:text-base">
            {recipeNum} recipes
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-6 text-base font-[600] sm:mt-0">
          <div className="relative">
            <Filters>
              <Filters.Open>
                <Button type="empty" className="flex items-center gap-[10px]">
                  <Image src={filterIcon} alt="" />
                  Filters
                </Button>
              </Filters.Open>

              <Filters.Popup />
            </Filters>
          </div>

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
      <ul className="mt-10 flex gap-9 overflow-x-scroll pb-2 sm:overflow-x-hidden">{catList}</ul>
    </div>
  );
}
