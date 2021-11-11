import React, { Component } from 'react';
import { ActivityIndicator, View ,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import { connect } from 'react-redux';
import * as actions from '../actions';
const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

class Loading extends Component {


  componentDidMount(){
    // AsyncStorage.removeItem('token');
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this._bootstrapAsync();
    });
  }

  _bootstrapAsync = async () => {
    // this.props.getUser();
    // await AsyncStorage.removeItem('token');
    const userToken = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('userData');
    if(userToken){  
      this.props.setUser(this.props.navigation,JSON.parse(user),userToken);
      
    }else{
      this.props.navigation.navigate('Auth');
    }
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  render(){
    return (
      <View style={styles.container}>
    <ActivityIndicator style={{marginTop:h*0.4}} size="large" color="#203152" />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor:'white',

  }
};

const mapStateToProps = ( state ) => ({
  // auth: state.auth.isSigned
})

export default connect(mapStateToProps, actions)(Loading);
