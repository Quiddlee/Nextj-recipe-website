'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { IRecipe, useRecipes } from '../../context/RecipeProvider';
import searchIcon from '../../public/assets/icons/search.svg';

export default function SearchInput() {
  const [search, setSearch] = useState('');
  const { allRecipes, updateRecipes } = useRecipes();

  const searchResult = useRef<IRecipe[]>([]);

  function handleSearch() {
    if (search === '') return updateRecipes(allRecipes);

    updateRecipes(searchResult.current);
  }

  function handleClick(value: string) {
    setSearch(value);
  }

  useEffect(() => {
    searchResult.current = allRecipes.filter((recipe) => {
      const match = recipe.title.toLowerCase().match(search.toLowerCase());
      return match;
    });
  }, [allRecipes, search, updateRecipes]);

  return (
    <div className="mt-6 w-full px-5 sm:absolute sm:right-[25px] sm:top-[10px] sm:mt-0 sm:w-[280px] sm:px-0">
      <label htmlFor="searchInp" className="relative flex gap-[6px]">
        <Image className="absolute bottom-0 left-3 top-0 my-auto" src={searchIcon} alt="" />
        <input
          onBlur={() => {
            handleSearch();
          }}
          className="peer w-full rounded-md px-3 py-2 pl-10 text-sm font-medium text-black shadow-[0px_1px_2px_2px_rgba(239,239,239,1)] transition-all placeholder:text-accent-secondary-400 focus:border-transparent focus:outline-none focus:ring focus:ring-accent-600 focus:ring-opacity-50"
          id="searchInp"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="What would you like to cook?"
        />

        <div className="absolute mt-14 flex h-auto w-full flex-col justify-start rounded-xl bg-primary-50 py-3 opacity-0 shadow-md transition-all peer-focus:opacity-100">
          {searchResult.current.map((recipe) => {
            return (
              <p
                onClick={(e) => {
                  handleClick((e.target as HTMLParagraphElement)?.textContent ?? '');
                }}
                className="flex h-11 cursor-pointer items-center gap-4 px-4 transition-all hover:bg-black-100"
                key={recipe.title}
              >
                <Image src={searchIcon} alt="" />
                {recipe.title}
              </p>
            );
          })}
        </div>
      </label>
    </div>
  );
}
