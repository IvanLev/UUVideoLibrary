import { filmsInitialState } from "../App";

export function filmsReducer(state, action) {
  switch(action.type) {
    case('searching'):
      return filmsInitialState.filter(({ name }) => {
        const nameInLowerCase = name.toLowerCase();
        const searchValInLowerCase = action.value.toLowerCase();
        return nameInLowerCase.includes(searchValInLowerCase);
      });
    default: 
      return filmsInitialState;
  }
}