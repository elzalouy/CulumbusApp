import {
  RESTRICTIONS,
  RESTRICTIONS_LOADING,
  SAVE_LAST_UPDATED_DATE,
} from '../actions/types';

const initialState = {
  restrictions: [],
  restrictionsLoading: false,
  lastUpdatedAt: {},
};

export default (state = initialState, action) => {
  // console.log(action.type)
  switch (action.type) {
    case RESTRICTIONS:
      return {...state, restrictions: action.restrictions};
    case RESTRICTIONS_LOADING:
      return {...state, restrictionsLoading: action.state};
    case SAVE_LAST_UPDATED_DATE:
      return {...state, lastUpdatedAt: action.field};

    default:
      return state;
  }
};
