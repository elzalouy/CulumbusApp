import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import { CommonActions } from '@react-navigation/native';
import { Alert } from 'react-native'

import { DATES, TIMINGS, TIMINGS_LOADING  } from './types';
import { client ,MAKE_ORDER  } from './queries';

let url="https://sandbox.musement.com/api/v3/"

export const listActivityDates = (id,start,end) => {
    return async(dispatch) => {
       // '+id+'
    await axios.get(url+'activities/c9b910a7-02f9-4c23-b35f-c2737f8f1093/dates?date_from='+start+'&date_to='+end,{}).then(async function (response) {
      dispatch({type: DATES, dates:response.data})    
    }).catch(function (error) {
    console.log(error.response)
    console.log(error)
  })
  }
  }

  export const listAvailableTimings = (date) => {
    return async(dispatch) => {
        dispatch({type: TIMINGS_LOADING, status:true})    
    await axios.get(url+'activities/c9b910a7-02f9-4c23-b35f-c2737f8f1093/dates/'+date,{}).then(async function (response) {
      console.log(response)
      dispatch({type: TIMINGS, timings:response.data[0].groups[0].slots})  
      dispatch({type: TIMINGS_LOADING, status:false})      
    }).catch(function (error) {
    console.log(error.response)
    console.log(error)
    dispatch({type: TIMINGS_LOADING, status:false})    
    dispatch({type: TIMINGS, timings:[]})  

  })
  }
  }


  export const continueToPayment = (data,nav) => {
    return async(dispatch) => {
      await client.mutate({
        mutation: MAKE_ORDER,
        variables: data
     }).then(async function ({data:response}) {
        console.log(response)
     if(response.makeOrder.message){
        // dispatch({type: DELETE_MSG, id:data.message_id})
     }

    })
    .catch(function (error) {
        console.log(error)
        console.log(error.graphQLErrors)
        })
  }
  }

  