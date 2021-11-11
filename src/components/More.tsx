import React from 'react';
import { normalize } from '../screens/normalize'
import { connect} from 'react-redux';
import * as actions from '../actions';
import { View, Dimensions, StyleSheet} from 'react-native'


const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

function More() {

  return (
   <View style={styles.container}>
       <View style={styles.line}/>
       <View style={styles.line2}/>
       <View style={styles.line}/>
       
   </View>
  );
}

const styles=StyleSheet.create({
    container:{
        alignItems:'center'
    },
    line:{
        width:w*0.09,
        height:3,
        backgroundColor:'#203152',
        borderRadius:5
    },
    line2:{
        width:w*0.05,
        height:3,
        backgroundColor:'#203152',
        marginVertical:w*0.01,
        borderRadius:5
    }

})

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, actions)(More);