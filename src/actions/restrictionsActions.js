import axios from 'axios';
// import { useQuery } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from '@apollo/client';

import {RESTRICTIONS} from './types';
// import { onError } from 'apollo-link-error'

import {LIST_COUNTRY_RESTRICTIONS} from './queries';

const BASE_URL = process.env.REACT_APP_API_URL;

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
  // link:errorLink
});

//   export const listCountryRestrions = () => {
//     return async(dispatch) => {
//     // dispatch({type: LOGIN_LOADING, state:true})
//     console.log('1')

//     await client.query({
//         query: LIST_COUNTRY_RESTRICTIONS }).then(async function ({data}) {
//           console.log('response')
//           console.log(data)
//           //  if(response.login.token){

//         // dispatch({type: RESTRICTIONS, countries:response.listCountryRestrictions})
//     //  }else{
//     //     dispatch({type: LOGIN_LOADING, state:false})
//     //      alert("This username or password is incorrect.")
//     //  }
//     })
//     .catch(function (error) {
//         console.log(error)
//         // console.log(error.data)
//         // dispatch({type: LOGIN_LOADING, state:false})
//         // alert("This username or password is incorrect.")
//         })

//     }
// }
