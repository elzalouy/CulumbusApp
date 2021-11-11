import React from 'react';
import { normalize } from '../screens/normalize'
import { connect} from 'react-redux';
import * as actions from '../actions';
import { View, Dimensions, StyleSheet, Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';


const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

function TimingCard(props) {

  return (
//    <View style={styles.container}>
//        <Icon name={props.selected?'radio-button-checked':'radio-button-unchecked'} color="#203152" style={{}}  size={normalize(20)} />
//        <View style={styles.card}>
//         <Text style={styles.txt}>{props.timing.time}</Text>
//        </View>
//    </View>
      <TouchableOpacity style={styles.container} onPress={()=>props.nav.navigate('ReservationConfirmation',{ event:props.event, date:props.date,timing:props.timing, slotIndex:props.slotIndex})}>
      <View style={styles.card}>
       <Text style={styles.txt}>{props.timing.time}</Text>
      </View>
      <Icon name={'keyboard-arrow-right'} color="#203152" style={{}}  size={normalize(25)} />

  </TouchableOpacity>
  );
}

const styles=StyleSheet.create({
    container:{
        alignSelf:'center',
        marginTop:w*0.03,
        width:w*0.9,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderWidth:2,
        borderColor:'#203152',
        borderRadius:10,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        paddingVertical:w*0.03,
        paddingHorizontal:w*0.02,
    },
    card:{
     
  
        width:w*0.8,
    },
    txt:{
        color:'#203152',
        fontSize:normalize(15),
        fontFamily:'Anderson Grotesk Bold',
    }
 

})

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, actions)(TimingCard);