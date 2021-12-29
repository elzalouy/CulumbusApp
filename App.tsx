import 'react-native-gesture-handler';
import React from 'react';
import { Text ,Dimensions, View,StatusBar, } from 'react-native';
import 'core-js/features/promise'


import { Provider } from 'react-redux';
import store from './src/store';
import { normalize } from './src/screens/normalize';
import Navigator from './src/navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ErrorBoundary from './src/screens/ErrorBoundary'

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

console.disableYellowBox = true;

// const client = new ApolloClient({
//   uri: 'http://localhost:3000/graphql',
//   cache: new InMemoryCache()
// });

export default class App extends React.Component {
  state = {
      isConnected: true,
      keyboard:false,
      isLoggedIn:false,
      isLoading:false
    };

  
  render() {
  return (
  <ErrorBoundary>
  <Provider store={store} >
      {/* <ApolloProvider client={client}> */}

  <StatusBar
      backgroundColor="#0B121A"
      barStyle="light-content"
    />
    {this.state.isConnected==false?
    
      <View style={{height:h,width:w,alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:normalize(15)}}>Sorry, No internet connection</Text>
    </View>
    :

  
      <Navigator/>
  
  }
  {/* <FlashMessage ref="myLocalFlashMessage" /> */}
  {/* </ApolloProvider> */}
   </Provider>
   </ErrorBoundary>
  );
  }
  }

