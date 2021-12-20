import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import { CommonActions } from '@react-navigation/native';
import { Alert } from 'react-native'
// import { useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from '@apollo/client';

import {
    LOGIN_LOADING, USER, USER_ONLY
} from './types';

import { LOGIN, REGISTER, LOGIN_WITH_FACEBOOK, LOGIN_WITH_APPLE, FORGET_PASSWORD, VERIFY_FORGET, RESET_PASSWORD, DELETE_PROFILE, EDIT_PROFILE } from './queries';
import { API_URL } from "@env"

const client = new ApolloClient({
    uri: API_URL + "/graphql",
    cache: new InMemoryCache()
});



export const login = (data, nav) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_LOADING, state: true })
        await client.query({
            query: LOGIN,
            variables: data
        }).then(async function ({ data: response }) {
            // console.log(response)
            if (response.login.token) {
                dispatch({ type: USER, user: response.login.user, token: response.login.token })
                await AsyncStorage.setItem('token', response.login.token);
                await AsyncStorage.setItem('userData', JSON.stringify(response.login.user));
                if (response.login.user.role == "user") {
                    nav.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{
                                name: 'App',
                            }]
                        })
                    );
                } else if (response.login.user.role == "admin") {
                    nav.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{
                                name: 'AdminApp',
                            }]
                        })
                    );
                }

                dispatch({ type: LOGIN_LOADING, state: false })
            } else {
                dispatch({ type: LOGIN_LOADING, state: false })
                alert("This username or password is incorrect.")
            }
        })
            .catch(function (error) {
                console.log(error)
                console.log(error.data)
                dispatch({ type: LOGIN_LOADING, state: false })
                alert("This username or password is incorrect.")
            })

    }
}

export const clearUser = () => {
    return async (dispatch) => {
        dispatch({ type: USER, user: {}, token: '' })

    }
}

export const setUser = (nav, data, token) => {
    return async (dispatch) => {
        dispatch({ type: USER, user: data, token: token })
        // alert("!")
        if (data.role == "user") {
            nav.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{
                        name: 'App',
                    }]
                })
            )
        } else if (data.role == "admin") {
            nav.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{
                        name: 'AdminApp',
                    }]
                })
            )
        }



    }
}




export const register = (data, nav) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_LOADING, state: true })
        console.log(data)
        await client.mutate({
            mutation: REGISTER,
            variables: data
        }).then(async function ({ data: response }) {
            if (response.register.token) {
                dispatch({ type: USER, user: response.register.user, token: response.register.token })
                await AsyncStorage.setItem('token', JSON.stringify(response.register.token));
                await AsyncStorage.setItem('userData', JSON.stringify(response.register.user));
                nav.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [{
                            name: 'App',
                        }]
                    })
                );
                dispatch({ type: LOGIN_LOADING, state: false })
            } else {
                dispatch({ type: LOGIN_LOADING, state: false })
                //  alert("This username or password is incorrect.")
            }
        })
            .catch(function (error) {
                console.log(error)
                console.log(error.graphQLErrors)
                dispatch({ type: LOGIN_LOADING, state: false })
                if (error.graphQLErrors[0]) {
                    alert(error.graphQLErrors[0].message)
                } else {
                    alert("Network Error")

                }
            })

    }
}


export const loginWithFacbook = (data, nav) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_LOADING, state: true })
        await client.mutate({
            mutation: LOGIN_WITH_FACEBOOK,
            variables: data
        }).then(async function ({ data: response }) {
            if (response.loginWithFacebook.token) {
                dispatch({ type: USER, user: response.loginWithFacebook.user, token: response.loginWithFacebook.token })
                await AsyncStorage.setItem('token', JSON.stringify(response.loginWithFacebook.token));
                await AsyncStorage.setItem('userData', JSON.stringify(response.loginWithFacebook.user));
                nav.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [{
                            name: 'App',
                        }]
                    })
                );
                dispatch({ type: LOGIN_LOADING, state: false })
            } else {
                dispatch({ type: LOGIN_LOADING, state: false })
                //  alert("This username or password is incorrect.")
            }
        })
            .catch(function (error) {
                console.log(error)
                console.log(error.graphQLErrors)
                dispatch({ type: LOGIN_LOADING, state: false })
                if (error.graphQLErrors[0]) {
                    alert(error.graphQLErrors[0].message)
                } else {
                    alert("Network Error")

                }
            })

    }
}




export const signinWithApple = (data, nav) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_LOADING, state: true })
        console.log(data)
        await client.mutate({
            mutation: LOGIN_WITH_APPLE,
            variables: data
        }).then(async function ({ data: response }) {
            console.log(response)
            if (response.loginWithApple.token) {
                dispatch({ type: USER, user: response.loginWithApple.user, token: response.loginWithApple.token })
                await AsyncStorage.setItem('token', JSON.stringify(response.loginWithApple.token));
                await AsyncStorage.setItem('userData', JSON.stringify(response.loginWithApple.user));
                nav.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [{
                            name: 'App',
                        }]
                    })
                );
                dispatch({ type: LOGIN_LOADING, state: false })
            } else {
                dispatch({ type: LOGIN_LOADING, state: false })
                //  alert("This username or password is incorrect.")
            }
        })
            .catch(function (error) {
                console.log(error)
                console.log(error.graphQLErrors)
                dispatch({ type: LOGIN_LOADING, state: false })
                if (error.graphQLErrors[0]) {
                    alert(error.graphQLErrors[0].message)
                } else {
                    alert("Email should be provided!")

                }
            })

    }
}


export const forgetPassword = (data, nav) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_LOADING, state: true })
        console.log(data)
        await client.mutate({
            mutation: FORGET_PASSWORD,
            variables: data
        }).then(async function ({ data: response }) {
            console.log(response)
            if (response.forgetPassword.message) {
                nav.dispatch(
                    CommonActions.navigate({
                        name: 'VerifyForgetCode',
                        params: {
                            message: response.forgetPassword.message,
                            mobileNumber: data.mobileNumber
                        },
                    })
                );
                dispatch({ type: LOGIN_LOADING, state: false })
            } else {
                dispatch({ type: LOGIN_LOADING, state: false })
                //  alert("This username or password is incorrect.")
            }
        })
            .catch(function (error) {
                console.log(error)
                console.log(error.graphQLErrors)
                Alert.alert(
                    "Invalid Mobile Number",
                    "This mobile number is not registered.",
                    [

                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
                dispatch({ type: LOGIN_LOADING, state: false })

            })

    }
}


export const verifyForget = (data, nav) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_LOADING, state: true })
        await client.mutate({
            mutation: VERIFY_FORGET,
            variables: data
        }).then(async function ({ data: response }) {
            console.log(response)
            if (response.verifyForget.message) {
                nav.dispatch(
                    CommonActions.navigate({
                        name: 'ResetPassword',
                        params: {
                            mobileNumber: data.mobileNumber,
                            code: data.code,
                        },
                    })
                );
                dispatch({ type: LOGIN_LOADING, state: false })
            } else {
                dispatch({ type: LOGIN_LOADING, state: false })
                //  alert("This username or password is incorrect.")
            }
        })
            .catch(function (error) {
                console.log(error)
                console.log(error.graphQLErrors)
                Alert.alert(
                    "Invalid Code",
                    "This code is invalid! Please try again.",
                    [

                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
                dispatch({ type: LOGIN_LOADING, state: false })

            })

    }
}


export const resetPassword = (data, nav) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_LOADING, state: true })
        await client.mutate({
            mutation: RESET_PASSWORD,
            variables: data
        }).then(async function ({ data: response }) {
            console.log(response)
            if (response.resetPassword.message) {
                nav.dispatch(
                    CommonActions.navigate({
                        name: 'ForgetSuccess',
                    })
                );
                dispatch({ type: LOGIN_LOADING, state: false })
            } else {
                dispatch({ type: LOGIN_LOADING, state: false })
                //  alert("This username or password is incorrect.")
            }
        })
            .catch(function (error) {
                console.log(error)
                console.log(error.graphQLErrors)
                dispatch({ type: LOGIN_LOADING, state: false })

            })

    }
}


export const editProfile = (data, nav) => {
    return async (dispatch) => {

        dispatch({ type: LOGIN_LOADING, state: true })
        await client.mutate({
            mutation: EDIT_PROFILE,
            variables: data
        }).then(async function ({ data: response }) {
            if (response.editProfile._id) {
                dispatch({ type: USER_ONLY, user: response.editProfile })
                await AsyncStorage.setItem('userData', JSON.stringify(response.editProfile));
                nav.goBack()

                // nav.dispatch(
                //     CommonActions.navigate({
                //         name: 'Profile',
                //       })
                // );
                dispatch({ type: LOGIN_LOADING, state: false })
            } else {
                dispatch({ type: LOGIN_LOADING, state: false })
                //  alert("This username or password is incorrect.")
            }
        })
            .catch(function (error) {
                console.log(error)
                console.log(error.graphQLErrors)
                dispatch({ type: LOGIN_LOADING, state: false })

            })

    }
}


export const deleteAccount = (data, nav) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_LOADING, state: true })
        await client.mutate({
            mutation: DELETE_PROFILE,
            variables: data
        }).then(async function ({ data: response }) {
            if (response.deleteAccount.message) {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('userData');
                nav.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [{
                            name: 'Auth',
                        }]
                    })
                );
                dispatch({ type: LOGIN_LOADING, state: false })
            } else {
                dispatch({ type: LOGIN_LOADING, state: false })
                //  alert("This username or password is incorrect.")
            }
        })
            .catch(function (error) {
                console.log(error)
                console.log(error.graphQLErrors)
                dispatch({ type: LOGIN_LOADING, state: false })

            })

    }
}