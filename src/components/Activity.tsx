import React from 'react';
import { normalize } from '../screens/normalize'
import { connect} from 'react-redux';
import * as actions from '../actions';
import { View, Dimensions, StyleSheet, ActivityIndicator} from 'react-native'


const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

function Activity(props) {

  return (
   <View style={styles.container}>
          <ActivityIndicator style={props.style} size="large" color="#203152" />
       
   </View>
  );
}

const styles=StyleSheet.create({
    container:{
        alignSelf:'center'
    },
 

})

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, actions)(Activity);