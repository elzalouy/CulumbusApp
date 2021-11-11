import React, { useState, useCallback, useEffect } from 'react';
import { normalize } from '../normalize'
import { connect} from 'react-redux';
import * as actions from '../../actions';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, Platform, ActivityIndicator} from 'react-native'
import  Clipboard from '@react-native-community/clipboard'

import Icon from 'react-native-vector-icons/FontAwesome';
import {GiftedChat,Bubble,InputToolbar, Actions} from 'react-native-gifted-chat';
import axios from 'axios';
import Activity from '../../components/Activity';
import RNFS from 'react-native-fs';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/Ionicons';
import Icon5 from 'react-native-vector-icons/AntDesign';

import ImageResizer from 'react-native-image-resizer';
import {check, requestMultiple, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Recorder from '../../components/Recorder';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const uniqueId = require("react-native-unique-id");
import Slider from '@react-native-community/slider';
import {API_URL} from "@env"

var options 
options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height)
const Chat = require("twilio-chat");


// export declare type ImagePickerResponse = {
//   uri:String,

// };


function AdminChatScreen(props) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState(null);
  const [isHidden, setIsHidden] = useState(true);
  const [showAvatar, setShowAvatar] = useState(false);
  const [avatarSource, setAvatarSource] = useState({});
  const [imageResponse, setImageResponse] = useState({});
  const [messageDeleted, setMessageDeleted] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [refreshmsg, setRefreshmsg] = useState(false);
  const [showMic, setShowMic] = useState(true);
  const [playingValue, setPlayingValue] = useState({});
  const [playingTime, setPlayingTime] = useState({});
  const [currentlyPlaying, setCurrentlyPlaying] = useState('');
  const [guest, setGuest] = useState(false);

  
    if (props.messageDeleted !== messageDeleted){
   
      setMessages((prevMessages) => prevMessages.filter(x => x._id !== props.messageDeleted+'D'));
      setMessageDeleted(props.messageDeleted)
    };

    useEffect(() => {

      _load()
      
    }, [])


    async function _load() { 
      setLoading(true)
      if (Platform.OS === 'android') {
        try {
          const grants = await requestMultiple([
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.RECORD_AUDIO
            ]);
      
      
          if (
            grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PERMISSIONS.RESULTS.GRANTED &&
            grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PERMISSIONS.RESULTS.GRANTED &&
            grants['android.permission.RECORD_AUDIO'] ===
            PERMISSIONS.RESULTS.GRANTED
          ) {
            console.log('Permissions granted');
          } else {
            console.log('All required permissions not granted');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }

    // let client=props.route.params.client
    let id=props.user.chatID
    const token = await getToken(id);
    // console.log(props.route.params)
    const client = props.route.params.client;
    client.on("tokenAboutToExpire", async () => {
      const token = await getToken(props.user.chatID);
      client.updateToken(token);
    });
  
    client.on("tokenExpired", async () => {
      const token = await getToken(props.user.chatID);
      client.updateToken(token);
    });
    client.on("channelJoined", async (channel) => {
      const messages = await channel.getMessages(30);

      if(!messages.hasPrevPage){
        setIsLoadingEarlier(false)
      }

      
      // this.setState({ messages: messages.items || [] });
      let newMessages=[]
      if(messages.items.length>0){
        newMessages=await fixMessages(messages.items)
        setMessages(newMessages)
      }else{
        setMessages([])
      }

      setLoading(false)

      scrollToBottom();
    });
    
    // const channel = await client.getChannelBySid(props.route.params.chat.sid);
    const channel = props.route.params.chat;
    console.log(channel)
    setChannel(channel)
    joinChannel(channel);
    // console.log("JOINING")
    // const channel = props.route.params.chat
    // // const channel = await client.getChannelBySid(props.user.chat);
    // setChannel(channel)
    // await joinChannel(props.route.params.chat);
    // console.log('done')

  }
    
  

    function scrollToBottom () {
      // const scrollHeight = this.scrollDiv.current.scrollHeight;
      // const height = this.scrollDiv.current.clientHeight;
      // const maxScrollTop = scrollHeight - height;
      // this.scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    };

  async function fixMessages(msgs){
    //.media.state.contentType=="audio/mp4"
    // "image/png"
    let x=[]
    setIndex(msgs[0].state.index-1)
    for(let i=0;i<msgs.length;i++){
      if (msgs[i].type === 'media') {
        // msgs[i].media.getContentTemporaryUrl().then(function(url) {
          let url=await msgs[i].media.getContentTemporaryUrl()
                // console.log(url)
          if(msgs[i].media.state.contentType==="audio/mp4"){
          x.push({
            _id: msgs[i].state.sid,
            audio: url,
            duration:msgs[i].state.attributes.duration,
            createdAt: msgs[i].state.timestamp,
            user: {
              _id: msgs[i].state.author,
              name: 'x',
              avatar: 'user',
            },
            sent:true
          })
        }else{
          x.push({
            _id: msgs[i].state.sid,
            image: url,
            createdAt: msgs[i].state.timestamp,
            user: {
              _id: msgs[i].state.author,
              name: 'x',
              avatar: 'user',
            },
            sent:true
          })
        }
          
        // });
      }else{
        x.push({
          _id: msgs[i].state.sid,
          text: msgs[i].state.body,
          createdAt: msgs[i].state.timestamp,
          user: {
            _id: msgs[i].state.author,
            name: 'x',
            avatar: 'user',
            // avatar: 'https://placeimg.com/140/140/any',
          },
          sent:true
        })
      }

    }
    return x.reverse();
  }
    
  async function fixMessage(msg){
    let x={}

    if (msg.type === 'media') {
      // msgs[i].media.getContentTemporaryUrl().then(function(url) {
        let url=await msg.media.getContentTemporaryUrl()
        if(msg.media.state.contentType==="audio/mp4"){
        x={
          _id: msg.state.sid,
          audio: url,
          duration:msg.state.attributes.duration,
          createdAt: msg.state.timestamp,
          user: {
            _id: msg.state.author,
            name: 'x',
            // avatar: 'https://placeimg.com/140/140/any',
          },
          sent:true
        }
      }else{
        x={
          _id: msg.state.sid,
          image: url,
          createdAt: msg.state.timestamp,
          user: {
            _id: msg.state.author,
            name: 'x',
            // avatar: 'https://placeimg.com/140/140/any',
          },
          sent:true
        }
      }
      }else{
        x= {
          _id: msg.state.sid,
          text: msg.state.body,
          createdAt: msg.state.timestamp,
          user: {
            _id: msg.state.author,
            name: 'x',
            // avatar: 'https://placeimg.com/140/140/any',
          },
          sent:true
        }
      }
     
    
    return x;
  }



  async function getToken  (id:String)  {
    const response = await axios.get(`${API_URL}/token/${id}`)
    return response.data.jwt;
  }



  async function joinChannel  (channel) {
    if (channel.channelState.status !== "joined") {
     await channel.join();
   }else{
     const messages = await channel.getMessages(30);

      if(!messages.hasPrevPage){
        setIsLoadingEarlier(false)
      }

      
      // this.setState({ messages: messages.items || [] });
      let newMessages=[]
      if(messages.items.length>0){
        newMessages=await fixMessages(messages.items)
        setMessages(newMessages)
      }else{
        setMessages([])
      }

      setLoading(false)

      scrollToBottom();
   }
 
   channel.on("messageAdded", handleMessageAdded);
   scrollToBottom();
 };
 
 function alreadyAdded(id){
  messages.filter(obj => {
    return obj._id === id
  })
  return false
 }
 
 async function handleMessageAdded  (message) {
  if(!alreadyAdded(message.state.sid)){
    let newMessages
    newMessages=await fixMessage(message)
    setMessages((prevMessages) => GiftedChat.append(prevMessages.filter(x => x._id !== message.state.attributes.giftedId), newMessages));
  }

 };

 function sendMessage (newMessages) {
  const attributes = { giftedId: newMessages[0]._id };
  newMessages[0].pending=true
  setMessages( GiftedChat.append(messages, newMessages));

  channel.sendMessage(newMessages[0].text, attributes);

  // let notEmpty = message[0].text.trim().length > 0;
  
//   if (notEmpty) {
//   const { text, channel } = this.state;
//   if (text) {
//     this.setState({ loading: true });
//     channel.sendMessage(String(text).trim());
//     this.setState({ text: "", loading: false });
//   }
// }
};



function getImage(){
  launchImageLibrary(options, (response) => {

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
        const source = { uri: response.assets[0].uri };
        setAvatarSource(source)
        setShowAvatar(true)
        setImageResponse(response.assets[0])
        // var z=response.assets[0].uri.replace("file://", "/private");
       
        // this.setState({
        //   avatarSource: source,
        //   showAvatar:true,
        //   img:{
        //     name: response.fileName,
        //     type: response.type,
        //     uri:
        //       Platform.OS === "android" ? response.uri : z,
        //     width:response.width,
        //     height:response.height
        //   }
        // });
      }
    })
}

function addRecord(x){
  // console.log(x)
  setMessages((prevMessages) => GiftedChat.append(prevMessages, x));

}
function sendImage(){
  setShowAvatar(false)
  setAvatarSource({})
  var z=avatarSource.uri;
  let width,height;

  if(imageResponse.width>512 || imageResponse.height>512){
    width=512
    height=512
  }else{
    width=imageResponse.width
    height= imageResponse.height
  }
  ImageResizer.createResizedImage(Platform.OS=='ios'?z.replace("file://",""):z, width, height, "JPEG", 70, 0).then( async (resizerResponse) =>{
      

    RNFS.readFile(resizerResponse.path, 'base64').then((data) => {
    var Buffer = require('buffer/').Buffer
    data = Buffer.from(data, 'base64')
    uniqueId().then(id => {
    const attributes = { giftedId: id };
   
    
    let x={
      _id: id,
      image: z,
      createdAt: new Date(),
      user: {
        _id: props.user.chatID,
        name: 'x',
        // avatar: 'https://placeimg.com/140/140/any',
      },
      pending:true
    }
    setMessages((prevMessages) => GiftedChat.append(messages, x));

    channel.sendMessage({
      contentType: 'image/png',
      media: data,
      
    },attributes).then(id2 => console.log(id2))
    .catch(e=>console.log(e))
  })
  })
    
  })


}


function renderActions(props) {
  return (
    <Actions
      {...props}
      icon={() => (
        <View style={{flexDirection:'row'}}>

        <Icon1 name='paperclip' size={normalize(22)} color='#203152'onPress={() => {getImage()}}/>
       
        </View>
      )}
      
      onSend={(args) => console.log(args)}
    />
  );
}


function renderEarlier(props1) {
  return (
    props1.isLoadingEarlier?
    <ActivityIndicator style={{paddingTop:w*0.03,paddingBottom:w*0.02}} size="small" color="#203152" />
    :null

  )
}

function onLongPress(context,currentMessage) {
//  console.log(currentMessage)
//  console.log(currentMessage.text)
    // if (currentMessage.text) {
      const options = [
        'Delete Message',
        'Copy Text',
        'Cancel',
      ];
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions({
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            deleteMessage(currentMessage._id);
            break;
          case 1:
            Clipboard.setString(currentMessage.text);
            break;
        }
      });
    // }
  
}

function deleteMessage(id){
  // console.log(props.user.chat)
  let i=0
  let x= [...messages]
  while(i<messages.length){
    if(x[i]._id==id){
      if(x[i].image){
        delete x[i]['image']
      }
      if(x[i].audio){
        x[i].audio=null
      }
      x[i].text='Deleting message ...'
      x[i]._id+="D"
      // console.log(x)
      setMessages(x)

      break;
    }

    i++;
  }
  props.deleteMessage({message_id:id,chat:props.user.chat})

  // client.conversations.conversations(props.user.chat)
  //                   .messages(id)
  //                   .remove();
}

 function loadMore(){
  //  alert("1")
  channel.getMessages(30, index, 'backwards').then(async function(messagesPage) {
    let newMessages
    newMessages=await fixMessages(messagesPage.items)
    setMessages((prevMessages) => GiftedChat.append(newMessages,prevMessages));
    if(!messagesPage.hasPrevPage){
      setIsLoadingEarlier(false)
    }
    setRefreshing(false)
    // setIndex(index+1)
  });
  

}

function isCloseToTop({ layoutMeasurement, contentOffset, contentSize }) {
  const paddingToTop = 80;
  return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
}

function toggleRecord(txt){
  if(!txt)  
  setShowMic(true)
  else
  setShowMic(false)
}

function startRecording(){
setRecording(true)
}
function cancelRecording(){
  setRecording(false)
}

async function onStartPlay (msg) {
  // console.log('onStartPlay');
  // alert(msg.audio)
  let time={...playingTime}
  let value={...playingValue}
  delete time[currentlyPlaying]
  delete value[currentlyPlaying]
  console.log(time)
  setPlayingTime(time)
  setPlayingValue(value)
  await audioRecorderPlayer.stopPlayer();
  const l = await audioRecorderPlayer.startPlayer(msg.audio);
  audioRecorderPlayer.addPlayBackListener((e) => {
      setCurrentlyPlaying(msg._id)
      let x={...playingValue}
      x[msg._id]=e.currentPosition/e.duration
      setPlayingValue(x)
      // setPlayingValue(e.currentPosition/e.duration)
      let y={...playingTime}
      y[msg._id]=audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)).slice(0, -3)
      setPlayingTime(y)
      if(e.currentPosition===e.duration){
        onStopPlay()
      }
    // this.setState({
    //   currentPositionSec: e.currentPosition,
    //   currentDurationSec: e.duration,
    //   playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
    //   duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
    // });
    return;
  });

};

async function onStopPlay () {
  // console.log('onStopPlay');
  audioRecorderPlayer.stopPlayer();
  audioRecorderPlayer.removePlayBackListener();
 
};

function renderMessageAudio(msgprops) {
  return (
    //  { props.currentMessage._id === this.state.currentPlayedMessage ? this.myPro : null }
    currentlyPlaying===msgprops.currentMessage._id?
    <View
    key={msgprops.currentMessage._id}
      {...msgprops}
      // containerStyle={{
      //   width: 70,
      // }}
      style={{position:'relative',padding:w*0.05,alignItems:'center',}}
      // onSend={(args) => console.log(args)}
    >
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <TouchableOpacity style={{paddingHorizontal:w*0.01,paddingVertical:w*0.02}} activeOpacity={1.0}>
      <Icon1 name='play' size={normalize(15)} color='silver'onPress={() => {onStartPlay(msgprops.currentMessage)}}/>
      </TouchableOpacity>
      <Slider
    disabled={true}
    style={{width: w*0.4, 
      transform: [{ scaleX: .75 }, { scaleY: .75 }]
    }}    value={playingValue[msgprops.currentMessage._id]}
    minimumValue={0}
    maximumValue={1}
    minimumTrackTintColor="#FFFFFF"
    maximumTrackTintColor="#000000"
    thumbTintColor="silver"
  />
  </View>
  <Text style={styles.playingTime}>{playingTime[msgprops.currentMessage._id]?playingTime[msgprops.currentMessage._id]:"00:00"}-{msgprops.currentMessage.duration}</Text>
     {/* {this.state.showAudio==props.currentMessage._id?<Text> {this.state.timerDisplay} </Text>:null}  */}
    {/* <Text>{this.state.showAudio}-{props.currentMessage._id}</Text> */}
      </View>
      :
      <View
      key={msgprops.currentMessage._id}
        {...msgprops}
        style={{position:'relative',padding:w*0.05,alignItems:'center',}}
      >
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity style={{paddingHorizontal:w*0.01,paddingVertical:w*0.02}} activeOpacity={1.0}>
      <Icon1 name='play' size={normalize(15)} color='silver'onPress={() => {onStartPlay(msgprops.currentMessage)}}/>
      </TouchableOpacity>
        <Slider
        disabled={true}
      style={{width: w*0.4, 
        transform: [{ scaleX: .75 }, { scaleY: .75 }]
      }}
      value={0}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
  
    />
    </View>
    <Text style={styles.playingTime}>00:00-{msgprops.currentMessage.duration}</Text>

        </View>

  );
}

function renderBubble (props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#203152",
        }
      }}
    />
  )
}


  return (
    <View  style={styles.container}>
  
  <View style={styles.header}>
  <TouchableOpacity style={styles.iconContainer} onPress={()=>props.navigation.goBack()}>
   <Icon5 name={'arrowleft'} size={normalize(25)} color={'#203152'} />
   </TouchableOpacity>
        <Image source={{uri: 'logo'}} resizeMode="contain" style={styles.logo}/>
        </View>

<View style={styles.subContainer}>
  {loading?
  <Activity style={{marginTop:h*0.3}}/>
  :
  <>
<GiftedChat
      loadEarlier={true}
      // infiniteScroll={true}
      // onLoadEarlier={()=>loadMore()}
      shouldUpdateMessage = {(props, nextProps) => {
        return props.extraData.playingTime !== nextProps.extraData.playingTime
   }}
      extraData={{messages:messages,playingTime:playingTime}}
      isLoadingEarlier={isLoadingEarlier}
      renderLoadEarlier={renderEarlier}
      messages={refreshmsg?messages:messages}
      onSend={(messages) => sendMessage(messages)}
      renderActions={renderActions}
      onLongPress={onLongPress}
      user={{ _id: props.user.chatID }}
      onInputTextChanged={(txt)=>{toggleRecord(txt)}}
      renderMessageAudio={renderMessageAudio.bind(playingTime)}
      listViewProps={isLoadingEarlier?{
        scrollEventThrottle: 400,
        onScroll: ({ nativeEvent }) => {
          if(!refreshing){
            if (isCloseToTop(nativeEvent)) {
              loadMore()
              setRefreshing(true)
            }
          }
        }
      }:null}
      renderBubble={renderBubble}
      
    />
    {showMic?
     <TouchableOpacity 
     onPress={() => {startRecording()}}
      style={{width:w*0.15,height:w*0.15,alignItems:'center',justifyContent:'center',position:'absolute',bottom:w*0.07,right:w*0.02}}>
      
          <Icon4 name='ios-mic' size={normalize(25)}  color='#203152'/>
        
        </TouchableOpacity>
        :null}
    </>
  }
</View>

<Modal style={{margin:0}} isVisible={showAvatar}>
        <View style={{ height:h,width:w,backgroundColor: '#5F6769',justifyContent:'center',alignItems:'center'}}>
        
        <Image source={avatarSource} style={styles.img2} resizeMode="cover"/>  
        {/* <Image style={styles.img2}  source={{uri: this.state.img}} /> */}
        <TouchableOpacity style={{width:w*0.16,height:w*0.16,position:'absolute',top:w*0.1,right:w*0.05,alignItems:'center',justifyContent:'center'}} onPress={() => {setShowAvatar(false);setAvatarSource({})}}>
        <Icon3 name='x' size={normalize(25)} color='white'/>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#32a0fe',width:w*0.16,height:w*0.16,borderRadius:w*0.08,position:'absolute',bottom:w*0.1,right:w*0.05,alignItems:'center',justifyContent:'center'}} onPress={() => sendImage()}>
        <Icon2 name='send' size={normalize(25)} color='white'/>
        </TouchableOpacity>
          </View>
      </Modal>
      {recording?
      <Recorder addRecordFunc={addRecord} user={props.user} cancel={cancelRecording} channel={channel}/>
      :null}
</View>
  );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    txt:{
        color:'white',
        fontSize:normalize(19),
        fontFamily:'Anderson Grotesk',
    },
    subContainer:{
        height:h-w*0.3,
        width:w
    },
    img2:{
      width:w,
      height:w,
      backgroundColor:'silver'
    },
    playingTime:{
      color:'white',
      fontSize:normalize(10),
      fontFamily:'Anderson Grotesk',
      alignSelf:'flex-end',
      marginRight:w*0.05
    },
    guest:{
      color:'#203152',
      fontSize:normalize(17),
      fontFamily:'Anderson Grotesk',
      width:w*0.9,
      alignSelf:'center',
      marginTop:h*0.3,
      textAlign:'center'
    },
    header:{
        width:w,
        height:w*0.3,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
  
        elevation: 7,
        alignItems:'center'
      },
      logo:{
        width:w*0.27,
        height:w*0.15,
        marginTop:w*0.1,
        
    },
    iconContainer:{
        width:w*0.13,
        height:w*0.13,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        left:w*0.02,
        top:w*0.12,
    }
})

const mapStateToProps = state => ({
  user:state.auth.user,
  messageDeleted:state.chats.messageDeleted
})

export default connect(mapStateToProps, actions)(AdminChatScreen);