import React, { useState, useCallback, useEffect } from 'react';
import { normalize } from '../screens/normalize'
import { connect} from 'react-redux';
import * as actions from '../actions';
import { View, Text, Dimensions, Animated, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import More from './More';
import { DrawerActions } from '@react-navigation/native';

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height)
function Header(props) {


  
  return (
   <View style={styles.container}>
       {props.nav.canGoBack()?
       <TouchableOpacity style={styles.iconContainer} onPress={()=>props.nav.goBack()}>
   <Icon  name={'arrowleft'} size={normalize(25)} color={'#203152'} />
   </TouchableOpacity>
   :<View/>}
   <TouchableOpacity style={styles.iconContainer}  onPress={()=>props.nav.openDrawer() }>
        <More />
        </TouchableOpacity>  
   </View>
  );
}

const styles=StyleSheet.create({
    container:{
        alignItems:'flex-end',
        width:w*0.9,
        height:h*0.11,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:h*0.02,

        // backgroundColor:'red'
        // padding
    },
    iconContainer:{
        width:w*0.13,
        height:w*0.13,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red'
    }
  

})

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, actions)(Header);