import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import {Alert} from 'react-native';
import {
  client,
  LIST_ADRENALINE_EVENTS,
  LIST_ADRENALINE_CITIES,
} from './queries';

import {
  VENUES,
  EVENTS,
  CITIES,
  ADRENALINE_CITIES,
  ADRENALINE_EVENTS,
} from './types';
let url = 'https://sandbox.musement.com/api/v3/';

let categories =
  'arts-culture,sightseeing,entertainment,food-wine,adventure,sports,nightlife,new-activities,new-air-activities,new-cable-car,new-hot-air-balloon,new-city-activities,new-cruises,new-hop-on-hop-off,new-shopping,new-great-outdoors,new-hiking-bike-tours,new-nature';
export const listVenues = () => {
  return async (dispatch) => {
    await axios
      .get(url + 'venues', {})
      .then(async function (response) {
        dispatch({type: VENUES, venues: response.data});
      })
      .catch(function (error) {
        console.log(error.response);
        console.log(error);
      });
  };
};

export const listEvents = () => {
  return async (dispatch) => {
    await axios
      .get(url + 'events?limit=6', {})
      .then(async function (response) {
        console.log(response);
        dispatch({type: EVENTS, events: response.data});
      })
      .catch(function (error) {
        console.log(error.response);
        console.log(error);
      });
  };
};

export const listActivities = () => {
  return async (dispatch) => {
    await axios
      .get(url + 'activities?limit=6', {})
      .then(async function (response) {
        console.log(response);
        dispatch({type: EVENTS, events: response.data.data});
      })
      .catch(function (error) {
        console.log(error.response);
        console.log(error);
      });
  };
};

export const listCityActivities = (cityID) => {
  return async (dispatch) => {
    console.log('response');
    dispatch({type: EVENTS, events: []});
    // await axios.get(url+'activities?limit=6&city_in='+cityID+'&category_in='+categories,{}).then(async function (response) {

    await axios
      .get(
        url +
          'cities/' +
          cityID +
          '/activities?limit=6&category_in=' +
          categories,
        {},
      )
      .then(async function (response) {
        console.log(response);
        dispatch({type: EVENTS, events: response.data.data});
      })
      .catch(function (error) {
        console.log(error.response);
        console.log(error);
      });
  };
};

export const clearCityActivities = (cityID) => {
  return async (dispatch) => {
    dispatch({type: EVENTS, events: []});
  };
};

export const listCities = (page) => {
  return async (dispatch) => {
    await axios
      .get(url + 'cities?limit=20&offset=' + page, {})
      .then(async function (response) {
        // console.log(response);
        dispatch({type: CITIES, cities: response.data, page: page});
      })
      .catch(function (error) {
        console.log(error.response);
        console.log(error);
      });
  };
};
export const listAdrenalineCities = (page) => {
  console.log('!!');
  return async (dispatch) => {
    await client
      .query({
        query: LIST_ADRENALINE_CITIES,
      })
      .then(async function ({data: response}) {
        // console.log(response, ' cities');

        if (response.listCities) {
          dispatch({type: ADRENALINE_CITIES, cities: response.listCities});
        }
      })
      .catch(function (error) {
        console.log(error.response);
        console.log(error);
      });
  };
};

export const listAdrenalineEvents = (page) => {
  return async (dispatch) => {
    await client
      .query({
        query: LIST_ADRENALINE_EVENTS,
      })
      .then(async function ({data: response}) {
        // console.log(response, ' eventss');

        if (response.listEvents) {
          // console.log(response.listEvents, ' eventss');
          dispatch({type: ADRENALINE_EVENTS, events: response.listEvents});

          // dispatch({type: ADRENALINE_EVENTS, events: response.listEvents});
        }
      })
      .catch(function (error) {
        console.log(error.response);
        console.log(error);
      });
  };
};
