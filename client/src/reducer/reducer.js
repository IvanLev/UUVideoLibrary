import { filmsInitialState } from "../App";

export function filmsReducer(state, action) {
  switch(action.type) {
    case('filter_by_genre'): 
      return filmsInitialState.filter(({ genreId }) => genreId === action.payload)
    case('searching'):
      return filmsInitialState.filter(({ name }) => {
        const nameInLowerCase = name.toLowerCase();
        const searchValInLowerCase = action.value.toLowerCase();
        return nameInLowerCase.includes(searchValInLowerCase);
      });
    case('fetch_success'): 
      return action.payload;
    default: 
      return filmsInitialState;
  }
}