import React, { useState, useCallback, useEffect } from 'react';
import { normalize } from '../screens/normalize'
import { connect} from 'react-redux';
import * as actions from '../actions';
import { View, Dimensions, StyleSheet, ActivityIndicator, Text,TouchableOpacity, Platform} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
const uniqueId = require("react-native-unique-id");


const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);
const audioRecorderPlayer = new AudioRecorderPlayer();
// const dirs = RNFetchBlob.fs.dirs;
const recordPath = Platform.select({
  ios: 'audio.mp4',
  // android: `${this.dirs.CacheDir}/hello.mp3`,
});

function Recorder(props) {
    const [timer, setTimer] = useState(0);
    const [time, setTime] = useState('');
    const [recordSecs, setRecordSecs] = useState(0);
    const [recordTime, setRecordTime] = useState('');
    const [path, setPath] = useState('');

    useEffect(() => {

      // onStartPlay()
            onStartRecord()

        return () => {
            // clearInterval(cycle);
            // audioRecorderPlayer.removeRecordBackListener();
            onStopRecord()
            setRecordSecs(0)
        }
        
      }, [])

    async function onStartRecord () {
      // const result = await audioRecorderPlayer.startRecorder(recordPath);
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
          // console.log(e.currentPosition)
          setRecordSecs(e.currentPosition)
          // setTime(toTime(e.currentPosition));
          setRecordTime(audioRecorderPlayer.mmssss(
            Math.floor(e.currentPosition)).slice(0, -3))
        return;
        });
        setPath(result)
  };

  async function sendRecord() {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordSecs(0)
      let x=result.replace("file://","")
      
      RNFS.readFile(x, 'base64').then((data) => {
      var Buffer = require('buffer/').Buffer
      data = Buffer.from(data, 'base64')
      uniqueId().then(async (id) => {
        const attributes = { giftedId: id,duration:recordTime };
 
        let data1={
          _id: id,
          audio: result,
          createdAt: new Date(),
          user: {
            _id: props.user.chatID,
            name: 'x',
            // avatar: 'https://placeimg.com/140/140/any',
          },
          pending:true,
          duration:recordTime
        }
        props.addRecordFunc(data1)
        if(props.user.startedChat){
      props.channel.sendMessage({
        contentType: 'audio/mp4',
        media: data,
        
      },attributes).then(id2 => console.log(id2))
      .catch(e=>console.log(e))
    }else{
      let userdata=props.user.mobileNumber?{mobileNumber:props.user.mobileNumber}:{socialID:props.user.socialID}
      let channelID=props.user.mobileNumber? await props.startChat(userdata):await props.startChatSocial(userdata);
      if(channelID==="error"){
        alert("Network Error")
      }else{
        const channel = await props.client.getChannelBySid(channelID);
        props.connectToChannel(channel)
        channel.sendMessage({
          contentType: 'audio/mp4',
          media: data,
          
        },attributes).then(id2 => console.log(id2))
        .catch(e=>console.log(e))
      }
    }

    })
    })
    props.cancel()
  }
  
  async function onStopRecord () {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0)
    console.log(result);
  };
  
  // async function onStartPlay () {
  //   console.log('onStartPlay');
  //   const msg = await audioRecorderPlayer.startPlayer('https://media.us1.twilio.com/ME6ae83cc06293905e832b0d1982c3031d?Expires=1625159060&Signature=VCroDci8cgssMNGieFWR6GRJhsVPKv8IqOMCySn8qPEfvVBYz6STigek3ZT1UReKOJ~ztHSw2g~WCJzhPj~J8uOiHaELy9ad3b9dMwLyg9UwPWgsDIodRyfOhfz1qUIiyzPGH7RmzVQ5viWio2d-Ont5zud5Va4~ea1fBT86rjZ0ZiFkVo4q9EiWwNBLOEiIt9kTKit7~zkpssgEK4tH-Q-HL9aDV-hyLWR-Au6~X74-pIl~M~7VKXLtMqMPAZ-tnsmPLK-8krHxc8LLJXgcbabb7ME2F5N3kFHXEhN8KukRurEcdU~X501Dn9jS22qLVIu0hDYQYXMjUcy0ww4lmg__&Key-Pair-Id=APKAJWF6YVTMIIYOF3AA');
  //   // console.log(msg);
  //   audioRecorderPlayer.addPlayBackListener((e) => {
  //     // this.setState({
  //     //   currentPositionSec: e.currentPosition,
  //     //   currentDurationSec: e.duration,
  //     //   playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
  //     //   duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
  //     // });
  //     return;
  //   });
  // };
  
  async function onPausePlay () {
    await audioRecorderPlayer.pausePlayer();
  };
  
 
  function toTime(x) {
    let quotient = Math.floor(x/60);
    let remainder = x % 60;
    let fin=remainder.toString().length>1?remainder:'0'+remainder
    return quotient+":"+fin
  }

  function startTimer() {
            //    console.log(timer)
            setTimer(timer+1)
            let x=toTime(timer)
            // console.log(x)
    
            setTime(x);
    
  }


  return (
    <View style={styles.container}>
        <View style={styles.part1}>
        {/* <Text style={styles.txt2}>{time}</Text> */}
        <Text style={styles.txt2}>{recordTime}</Text>

        </View>
        <TouchableOpacity style={styles.part2} onPress={()=>props.cancel()}>
            <Text style={styles.txt}>Cancel</Text>
        </TouchableOpacity>
        <View style={styles.part3}>
          <TouchableOpacity style={{paddingHorizontal:w*0.02,height:w*0.15,justifyContent:'center',alignItems:'center'}} onPress={()=>sendRecord()}>
        <Icon name='send' style={{marginBottom:w*0.02}} size={normalize(25)} color='white'/>
        </TouchableOpacity>

        </View>
           
        
    </View>
   );
 }
 
 const styles=StyleSheet.create({
     container:{
        //  alignSelf:'center',
         width:w,
         height:w*0.2,
         backgroundColor:'#203152',
         position:'absolute',
         bottom:0,
         flex:1,
         flexDirection:'row',
         paddingBottom:w*0.05
     },
     part1:{
         flex:1,
         justifyContent:'center',
         alignItems:'flex-start',
     },
     part2:{
         flex:1,
         justifyContent:'center',
         alignItems:'center',
     },
     part3:{
         flex:1,
         justifyContent:'center',
         alignItems:'flex-end',
         paddingRight:w*0.03,
     },
     txt:{
        color:'white',
        fontSize:normalize(17),
        fontFamily:'Anderson Grotesk',
     },
     txt2:{
        color:'white',
        fontSize:normalize(17),
        fontFamily:'Anderson Grotesk',
        marginLeft:w*0.03
     }
  
 
 })
 
 const mapStateToProps = state => ({
   user:state.auth.user,

 })
 
 export default connect(mapStateToProps, actions)(Recorder);