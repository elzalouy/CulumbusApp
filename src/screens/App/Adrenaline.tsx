import React, { useState, useEffect } from 'react';
import { normalize } from '../normalize'
import { connect} from 'react-redux';
import * as actions from '../../actions';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Header from '../../components/Header';
import Card from '../../components/Card';


const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height)

function Adrenaline(props) {
  const [events, setEvents] = useState([]);
  const [load, setLoad] = useState([false,false,false,false,false,false]);

//   if (props.venues.length !== venues.length) {
//     // Row changed since last render. Update isScrollingDown.
//     setVenues(props.venues);
//   }
if (props.events.length !== events.length){
  setEvents(props.events)
};

  useEffect(() => {
        // setEvents([])
      // props.listEvents()
      props.listCityActivities(props.route.params.city.id)
      return () => {
        props.clearCityActivities()
      }
  }, [])
  function imageLoaded(index){
    let x=load
    x[index]=true
    setLoad(x)
  }


  return (
    <View style={styles.container}>
           
        <Header nav={props.navigation}/>
        <Text style={styles.txt}>Adrenaline</Text>


        <ScrollView style={styles.subContainer} contentContainerStyle={{paddingBottom:w*0.05}} showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
            <Text style={styles.txt2}>Let us inspire you</Text>
            <TouchableOpacity>
            <Text style={styles.txt3}>View More</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.header2}>
            <Card event={events[0]} nav={props.navigation} loading={load[0]} onload={()=>imageLoaded(0)}/>

            <Card event={events[1]} nav={props.navigation} loading={load[1]} onload={()=>imageLoaded(1)} right={true}/>
            </View>
            </View>
            

            <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
            <Text style={styles.txt2}>Popular active experiences</Text>
            <TouchableOpacity>
            <Text style={styles.txt3}>View More</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.header2}>
            <Card event={events[2]} nav={props.navigation} loading={load[2]} onload={()=>imageLoaded(2)}/>

            <Card event={events[3]} nav={props.navigation} loading={load[3]} onload={()=>imageLoaded(3)} right={true}/>
            </View>
            </View>

            <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
            <Text style={styles.txt2}>Around your City</Text>
            <TouchableOpacity>
            <Text style={styles.txt3}>View More</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.header2}>
            <Card event={events[4]} nav={props.navigation} loading={load[4]} onload={()=>imageLoaded(4)}/>

            <Card event={events[5]} nav={props.navigation} loading={load[5]} onload={()=>imageLoaded(5)} right={true}/>
            </View>

            </View>

        </ScrollView>
 
     
    </View>
  );
}
const styles=StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor:'white',
        alignItems:'center',
        width:w,
        height:h
    },

logo:{
    width:w*0.27,
    height:w*0.15
},
txt:{
    color:'#203152',
    fontSize:normalize(28),
    fontFamily:'Anderson Grotesk',
},
header2:{
    flexDirection:'row',
    width:w*0.9,
    alignItems:'center',
    justifyContent:'space-between',
    // marginTop:w*0.03
},
subContainer:{
    width:w*0.9,
    marginTop:w*0.02,
    

},
cardContainer:{
marginTop:w*0.08
},
card:{
    // backgroundColor:'silver',
    width:w*0.435,
    height:w*0.35,
    borderRadius:15,
    justifyContent:'flex-end',
    overflow:'hidden'
},
cardHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:w*0.9,
    alignItems:'center',
    marginBottom:w*0.02
},
txt2:{
    color:'black',
    fontSize:normalize(18),
    fontFamily:'Anderson Grotesk',
},
txt3:{
    color:'black',
    fontSize:normalize(13),
    fontFamily:'Anderson Grotesk',
    textDecorationLine:'underline'
},
cardTitle:{
  backgroundColor:'white',
  opacity:0.8,
  width:w*0.35,
  marginBottom:w*0.02,
  borderBottomRightRadius:10,
  borderTopRightRadius:10,
  paddingVertical:w*0.02,
  alignItems:'center'
},
cardText:{
  color:'#203152',
  fontSize:normalize(8),
  fontFamily:'Anderson Grotesk',
  width:w*0.32
},
priceContainer:{
  backgroundColor:'#203152',
  padding:w*0.02,
  position:'absolute',
  top:w*0.02,
  right:w*0.02,
  borderRadius:15,
  justifyContent:'center',
  alignItems:'center'
},
price:{
  color:'white',
  fontSize:normalize(12),
  fontFamily:'Anderson Grotesk',
}


})
const mapStateToProps = state => ({
  venues:state.venues.venues,
  events:state.venues.events,
})

export default connect(mapStateToProps, actions)(Adrenaline);