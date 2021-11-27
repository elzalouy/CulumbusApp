import {
  VENUES,
  EVENTS,
  CITIES,
  ADRENALINE_CITIES,
  ADRENALINE_EVENTS,
} from '../actions/types';

const cityLoader = {id: '', cover_image_url: '', name: '', country: {name: ''}};
const initialState = {
  venues: [],
  events: [],
  cities: [],
  adrenalineCities: [],
  adrenalineEvents: [],
};

export default (state = initialState, action) => {
  // console.log(action.type, ' reducer');
  switch (action.type) {
    case VENUES:
      return {...state, venues: action.venues};
    case EVENTS:
      return {...state, events: action.events};
    case ADRENALINE_CITIES:
      return {...state, adrenalineCities: action.cities};
    case ADRENALINE_EVENTS:
      return {...state, adrenalineEvents: action.events};
    case CITIES: {
      if (action.page == state.cities.length) {
        let newArray = state.cities.concat(action.cities);
        return {...state, cities: newArray};
      } else {
        return;
      }
    }

    default:
      return state;
  }
};
