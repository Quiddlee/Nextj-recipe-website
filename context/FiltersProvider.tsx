import { createContext, ReactNode, useContext, useReducer } from 'react';

enum FilterActionTypes {
  IS_VEGAN_UPDATED = 'filters/isVeganUpdated',
  IS_SPICY_UPDATED = 'filters/isSpicyUpdated',
  CALORIES_UPDATED = 'filters/caloriesUpdated',
  COOKING_UPDATED = 'filters/cookingUpdated',
  CLEAR_ALL = 'filters/clearAll',
  OPEN = 'filters/open',
  CLOSE = 'filters/close',
}

type InitialState = Readonly<{
  isVegan: boolean;
  isSpicy: boolean;
  calories: [number, number];
  cooking: [number, number];
  isOpen: boolean;
}>;

interface IAction {
  type: FilterActionTypes;
  payload?: any;
}

interface IFiltersProviderProps {
  children: ReactNode;
}

interface IFiltersProvider extends InitialState {
  updateCooking: (min: number, max: number) => void;
  updateCalories: (min: number, max: number) => void;
  updateSpicy: (isSpicy: boolean) => void;
  updateVegan: (isVegan: boolean) => void;
  clearAll: () => void;
  show: () => void;
  hide: () => void;
}

const initialState: InitialState = {
  calories: [0, 0],
  cooking: [0, 0],
  isVegan: false,
  isSpicy: false,
  isOpen: true,
};

const FiltersContext = createContext<IFiltersProvider>({} as IFiltersProvider);

function reducer(state: InitialState, action: IAction): InitialState {
  switch (action.type) {
    case FilterActionTypes.IS_VEGAN_UPDATED:
      return { ...state, isVegan: action.payload };

    case FilterActionTypes.IS_SPICY_UPDATED:
      return { ...state, isSpicy: action.payload };

    case FilterActionTypes.CALORIES_UPDATED:
      return { ...state, calories: action.payload };

    case FilterActionTypes.COOKING_UPDATED:
      return { ...state, cooking: action.payload };

    case FilterActionTypes.OPEN:
      return { ...state, isOpen: true };

    case FilterActionTypes.CLOSE:
      return { ...state, isOpen: false };

    case FilterActionTypes.CLEAR_ALL:
      return initialState;

    default:
      throw new Error('Unknown filter action!');
  }
}

function FiltersProvider({ children }: IFiltersProviderProps) {
  const [{ isVegan, isSpicy, calories, cooking, isOpen }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function updateCooking(min: number, max: number) {
    return dispatch({ type: FilterActionTypes.COOKING_UPDATED, payload: [min, max] });
  }

  function updateCalories(min: number, max: number) {
    return dispatch({ type: FilterActionTypes.CALORIES_UPDATED, payload: [min, max] });
  }

  function updateSpicy(isSpicy: boolean) {
    return dispatch({ type: FilterActionTypes.IS_SPICY_UPDATED, payload: isSpicy });
  }

  function updateVegan(isVegan: boolean) {
    return dispatch({ type: FilterActionTypes.IS_VEGAN_UPDATED, payload: isVegan });
  }

  function clearAll() {
    dispatch({ type: FilterActionTypes.CLEAR_ALL });
  }

  function show() {
    dispatch({ type: FilterActionTypes.OPEN });
  }

  function hide() {
    dispatch({ type: FilterActionTypes.CLOSE });
  }

  return (
    <FiltersContext.Provider
      value={
        {
          isVegan,
          isSpicy,
          calories,
          cooking,
          isOpen,
          updateCooking,
          updateCalories,
          updateSpicy,
          updateVegan,
          clearAll,
          show,
          hide,
        } as IFiltersProvider
      }
    >
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters(): IFiltersProvider {
  const context = useContext(FiltersContext);

  if (context === undefined) throw new Error('FiltersContext is used outside the FiltersProvider!');

  return context;
}

export default FiltersProvider;
