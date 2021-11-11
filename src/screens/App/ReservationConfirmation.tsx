import React, { useState, useEffect } from 'react';
import { normalize } from '../normalize'
import { connect} from 'react-redux';
import * as actions from '../../actions';
import { View, Dimensions, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import Header from '../../components/Header';
import ProductsCard from '../../components/ProductsCard';


const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

function ReservationConfirmation(props) {
    const [event, setEvent] = useState({title:'',meeting_point:'', city:{name:'', country:{name:''}}, cover_image_url:'',description:'',about:'',longitude:'',latitude:''});
    const [date, setDate] = useState('');
    const [timing, setTiming] = useState({time:"",products:[{min_buy:0,max_buy:0,product_id:'',type:'',retail_price:{value:0}}]});
    // const [slotIndex, setSlotIndex] = useState(0);
    const [selected, setSelected] = useState(0);



  useEffect(() => {
      console.log(props.route.params.timing.products)
    setEvent(props.route.params.event)
    setDate(props.route.params.date)
    setTiming(props.route.params.timing)
    // setSlotIndex(props.route.params.slotIndex)
}, []);

    function handleCardPress(index){
        setSelected(index)
    }


    function continueToPayment(){
        let quantity=timing.products[selected].max_buy==timing.products[selected].min_buy?timing.products[selected].max_buy:timing.products[selected].min_buy
        // let data={
        //     "tickets": [
        //         {
        //           "product": {
        //             "id": timing.products[selected].product_id,
        //             "type": timing.products[selected].type
        //           },
        //           "passengers_info": [],
        //           "quantity": quantity
        //         }
        //       ]
        // }
        let name= props.user.name.split(" ")
        let data={
            order:{
            "type" : "musement",
            "product_identifier" : timing.products[selected].product_id,
            "quantity": quantity,
            "language": "en"
            },
            user:{ 
                "customer":{
                "firstname": "TEST_"+name[0],
                "lastname": "TEST_"+name[1]?name[1]:"Culumbus",
                "email": "TEST_"+props.user.email
                }
            }
        }
        // props.continueToPayment(data,props.navigation)
    }

  return (
   <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
                <Header nav={props.navigation}/>
                <Text style={styles.txt}>{event.title}</Text>

            <View style={styles.subContainer}>


            <Text style={styles.dateTime}>{date}, {timing.time}</Text>

          <FlatList 
                // extraData={cities}
                scrollEnabled={false}
                data={timing.products}
                style={{marginTop:w*0.05,width:w*0.9}}
                // keyExtractor={(item, index) => item.id }
                renderItem={({ item, index }) =>
                <TouchableOpacity activeOpacity={1.0} onPress={()=>handleCardPress(index)}>
                <ProductsCard data={item} selected={selected==index}/>
                </TouchableOpacity>
            }/>
                <View style={styles.totalContainer}>
                <Text style={styles.txt2}>Total:</Text>
                
                    <Text style={styles.txt3}>{timing.products[selected].min_buy==timing.products[selected].max_buy?timing.products[selected].min_buy*timing.products[selected].retail_price.value:null}$</Text>
                    </View>


                    <TouchableOpacity style={styles.loginButton} onPress={()=>continueToPayment()} activeOpacity={0.9}>
                    <Text style={styles.txt4}>Continue</Text>
                    </TouchableOpacity>

          </View>
   </ScrollView>
  );
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white',
    },
    subContainer:{
        width:w*0.9
    },
    txt:{
        color:'#203152',
        fontSize:normalize(15),
        fontFamily:'Anderson Grotesk',
        width:w*0.7,
        textAlign:'center'
    },
    dateTime:{
        color:'#203152',
        fontSize:normalize(12),
        // fontFamily:'Anderson Grotesk Light Oblique',
        alignSelf:'flex-start',
        marginTop:w*0.05
    },
    txt2:{
        color:'#203152',
        fontSize:normalize(16),
        fontFamily:'Anderson Grotesk',
    },
    txt3:{
        color:'#203152',
        fontSize:normalize(20),
        fontFamily:'Anderson Grotesk',
        marginLeft:w*0.02

    },
    totalContainer:{
        flexDirection:'row',
        marginTop:w*0.1,
        alignItems:'center'
    },
    loginButton:{
        width:w*0.8,
        backgroundColor:'#203152',
        paddingVertical:w*0.05,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        alignSelf:'center',
        marginTop:w*0.05
    },
    txt4:{
        color:'white',
        fontSize:normalize(14),
        fontFamily:'Anderson Grotesk',
    },
 

})

const mapStateToProps = state => ({
    user:state.auth.user,
})

export default connect(mapStateToProps, actions)(ReservationConfirmation);