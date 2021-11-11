import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import { CommonActions } from '@react-navigation/native';
import { Alert } from 'react-native'
// import { useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery,createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { DELETE_MSG,USER_ONLY, RESTRICTIONS, RESTRICTIONS_LOADING } from './types';

import { DELETE_MESSAGE, START_CHAT, START_CHAT_SOCIAL, LIST_COUNTRY_RESTRICTIONS,  } from './queries';
import {API_URL} from "@env"

const httpLink = createHttpLink({
    uri: API_URL+"/graphql",
  });

const authLink =  setContext(async(_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await AsyncStorage.getItem('token');
    // console.log(token)
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
// console.log(client)
// client.mutate({
//     mutation: DELETE_MESSAGE,
//     variables: { message_id:'IMe11d95fab14a48bea2537ff8c89baeed',}
//  }).then(async function ({data:response}) {
//     console.log(response)
//  }).catch(function (error) {
//     console.log(error)
//     console.log(error.graphQLErrors)
//     // dispatch({type: LOGIN_LOADING, state:false})
//     // alert("This username or password is incorrect.")
//     })

export const deleteMessage = (data) => {
    return async(dispatch) => {
        await client.mutate({
            mutation: DELETE_MESSAGE,
            variables: data
         }).then(async function ({data:response}) {
            console.log(response)
         if(response.deleteMessage.message){
            dispatch({type: DELETE_MSG, id:data.message_id})
         }
  
        })
        .catch(function (error) {
            console.log(error)
            console.log(error.graphQLErrors)
            })
    }
}

export const startChat = (data) => {
  return async(dispatch) => {
    console.log(data)
      let id=await client.mutate({
          mutation: START_CHAT,
          variables: data
       }).then(async function ({data:response}) {
          console.log(response)
       if(response.startChat.user){
        dispatch({type: USER_ONLY, user:response.startChat.user})
        await AsyncStorage.setItem('userData', JSON.stringify(response.startChat.user));
        return response.startChat.user.chat
          // dispatch({type: DELETE_MSG, id:data.message_id})
       }
      })
      .catch(function (error) {
          console.log(error)
          console.log(error.graphQLErrors)
          return 'error';
          })
    return id;

  }

}


export const startChatSocial = (data) => {
  return async(dispatch) => {
    console.log(data)
      let id=await client.mutate({
          mutation: START_CHAT_SOCIAL,
          variables: data
       }).then(async function ({data:response}) {
          console.log(response)
       if(response.startChatSocial.user){
        dispatch({type: USER_ONLY, user:response.startChatSocial.user})
        await AsyncStorage.setItem('userData', JSON.stringify(response.startChatSocial.user));
        return response.startChatSocial.user.chat
          // dispatch({type: DELETE_MSG, id:data.message_id})
       }
      })
      .catch(function (error) {
          console.log(error)
          console.log(error.graphQLErrors)
          return 'error';
          })
    return id;

  }

}


export const listCountryRestrions = () => {
  return async(dispatch) => {
  dispatch({type: RESTRICTIONS_LOADING, state:true})

  await client.query({
      query: LIST_COUNTRY_RESTRICTIONS }).then(async function ({data:response}) {
        console.log(response)
        //  if(response.login.token){
  
      dispatch({type: RESTRICTIONS, restrictions:response.listCountryRestrictions})
      dispatch({type: RESTRICTIONS_LOADING, state:false})

  //  }else{
  //     dispatch({type: LOGIN_LOADING, state:false})
  //      alert("This username or password is incorrect.")
  //  }
  })
  .catch(function (error) {
      console.log(error)
      dispatch({type: RESTRICTIONS_LOADING, state:false})

      // console.log(error.data)
      // dispatch({type: LOGIN_LOADING, state:false})
      // alert("This username or password is incorrect.")
      })

  }
}