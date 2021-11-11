import React, { Component } from 'react';
import { connect} from 'react-redux';
import * as actions from '../../actions';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'

import { styles } from './styles';
import RNRestart from 'react-native-restart'
import Icon from 'react-native-vector-icons/Ionicons'


const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height)

export default class index extends Component {
      state = {
          error:false,
        };

      static getDerivedStateFromError (error) {
        return { error: true };
      }

      // componentDidCatch(error, errorInfo) {
      //   fetch(API_URL + '/log/error', {
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //      errorInfo: errorInfo
      //     }),
      //     method: "POST"
      //   })
      //   .catch(e => {
      //     console.log('failed to send errorInfo');
      //   })
      // }
  
  render(){
   if(this.state.error) {
    return(
      <View style={styles.container}>
          <Icon
            name='ios-information-circle-outline'
            size={60}
            color={'#203152'}
          
          />
          <View style={{width:w*0.9,alignSelf:'center'}}>
        <Text style={styles.title}>Oops. Something Went Wrong!</Text>
        <Text style={styles.body}>The app ran into a problem and could not continue. We apologise for any inconvenience this has caused! Press the button below to restart the app. Please contact us if this issue persists.</Text>
        <TouchableOpacity style={styles.btn} onPress={()=>RNRestart.Restart()
  }>
                      <Text style={styles.txt4}>Back</Text>
                      </TouchableOpacity>
                      </View>
      </View>
      );
      } else {
   

    return this.props.children; 
  }
}
}
