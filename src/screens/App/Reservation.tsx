import React, { useState, useCallback, useEffect } from 'react';
import { normalize } from '../normalize'
import { connect} from 'react-redux';
import * as actions from '../../actions';
import { View, Text, Dimensions, Animated, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import {Calendar,} from 'react-native-calendars';
import Header from '../../components/Header';
import Activity from '../../components/Activity';
import TimingCard from '../../components/TimingCard';

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height)

function Reservation(props) {
    const [event, setEvent] = useState({title:'',meeting_point:'', city:{name:'', country:{name:''}}, cover_image_url:'',description:'',about:''});
    const [markedDates, setMarkedDates] = useState({});
    const [dates, setDates] = useState([]);
    const [timings, setTimings] = useState([]);
    const [timingsLoading, setTimingsLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [date, setDate] = useState('');
    
    if (props.dates !== dates){
        let x=markedDates
        // console.log(props.dates)
        for(let i=0;i<props.dates.length;i++){
            if(!x[props.dates[i].day]){
                x[props.dates[i].day]={marked: true,dotColor:'#7CFC00',selected:false}
            }else{
                x[props.dates[i].day]={marked: true,dotColor:'#7CFC00',selected:false}
            }
        }
        setDates(props.dates)
        setMarkedDates(x)

    };

    if (props.timings.length !== timings.length){
        let x=[]
        x.push(true)
        for(let i=0;i<props.timings.length-1;i++){
            x.push(false)
        }
        setTimings(props.timings)
        setSelected(x)
    }
    if (props.timingsLoading !== timingsLoading){
        setTimingsLoading(props.timingsLoading)
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    useEffect(() => {
            setEvent(props.route.params.event)
            var today = new Date();
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            var future=new Date(year + 1, month, day);
            // future.setMonth(future.getMonth()+2)
            let xx=formatDate(today)
            let xx2=formatDate(future)
            let x={}
            // alert(formatDate(today.toDateString))
            // props.listAvailableTimings(formatDate(today.toDateString))
            props.listActivityDates(props.route.params.event.uuid,xx,xx2)

            x[xx]={selected: true,selectedColor:'#203152'}
            // let x={
                
            //         // '2021-06-20': {marked: true,dotColor:'#7CFC00'},
            //         new Date(): {selected: true,selectedColor:'#203152'},
                  
            // }
            setMarkedDates(x)
    }, [])

  function handleDayPress(day){
    let x=Object.keys(markedDates)
    let dat={...markedDates}
    for(let i=0;i<x.length;i++){
        if(x[i]==day.dateString){
            dat[x[i]].selected=true
            dat[x[i]].selectedColor='#203152'
        }else{
            dat[x[i]].selected=false
        }
    }
    setMarkedDates(dat)
    setDate(day.dateString)
    props.listAvailableTimings(day.dateString)
  }
  return (
   <View style={styles.container}>
         
         <Header nav={props.navigation}/>
         <Text style={styles.txt}>{event.title}</Text>


        <Calendar
         style={{
            // borderWidth: 1,
            // borderColor: 'gray',
            // height: 350,
            // backgroundColor:'silver',
            width:w*0.9

          }}
  current={new Date()}
  minDate={new Date()}
//   maxDate={'2021-05-30'}
  onDayPress={(day) => handleDayPress(day)}
//   firstDay={1}
  disableAllTouchEventsForDisabledDays={true}
  enableSwipeMonths={true}
  markingType={'dot'}
  markedDates={JSON.parse(JSON.stringify(markedDates))}
/>
          {timingsLoading?
          <Activity style={{marginTop:w*0.3}}/>
          :
          timings.length>0?
          <View style={{width:w*0.9}}>
              <Text style={styles.txt3}>Select a timing:</Text>
               <FlatList 
                // extraData={cities}
                data={timings}
                style={{marginTop:w*0.05,paddingBottom:w*0.01,width:w*0.9}}
                // keyExtractor={(item, index) => item.id }
                renderItem={({ item, index }) =>   
                <TimingCard timing={item} slotIndex={index} nav={props.navigation} event={event} date={date}/>
            }/>

          </View>
          :
          <Text style={styles.txt2}>There are no available tickets for this day</Text>
          }

    </View>
  );
}

const styles=StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor:'white',
        alignItems:'center'
    },
    txt:{
        color:'#203152',
        fontSize:normalize(15),
        fontFamily:'Anderson Grotesk',
        width:w*0.7,
        textAlign:'center'
    },
    txt2:{
        color:'#203152',
        fontSize:normalize(15),
        fontFamily:'Anderson Grotesk',
        width:w*0.7,
        textAlign:'center',
        marginTop:w*0.1
    },
    txt3:{
        color:'#203152',
        fontSize:normalize(15),
        fontFamily:'Anderson Grotesk',
        textAlign:'center',
        marginTop:w*0.05,
        alignSelf:'flex-start'
    },
})

const mapStateToProps = state => ({
    dates:state.reservation.dates,
    timings:state.reservation.timings,
    timingsLoading:state.reservation.timingsLoading
})

export default connect(mapStateToProps, actions)(Reservation);