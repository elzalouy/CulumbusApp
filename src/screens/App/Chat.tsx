import React, { useState, useCallback, useEffect } from 'react';
import { normalize } from '../normalize'
import { connect} from 'react-redux';
import * as actions from '../../actions';
import { View, Text, Dimensions, Animated, StyleSheet, TouchableOpacity, Image, Platform, ActivityIndicator} from 'react-native'
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

import ImageResizer from 'react-native-image-resizer';
import {check, requestMultiple, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Recorder from '../../components/Recorder';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Slider from '@react-native-community/slider';
import {API_URL} from "@env"
const audioRecorderPlayer = new AudioRecorderPlayer();
const uniqueId = require("react-native-unique-id");

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


function ChatScreen(props) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState({});
  const [isHidden, setIsHidden] = useState(true);
  const [bounceValue, setBounceValue] = useState(new Animated.Value(0));
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
  const [clientX, setClientX] = useState({});
  const [askForOffer, setAskForOffer] = useState(false);
  const [message, setMessage] = useState('');
  const [currentOffer, setCurrentOffer] = useState({_id:"x"});
  
  
    if (props.messageDeleted !== messageDeleted){
   
      setMessages((prevMessages) => prevMessages.filter(x => x._id !== props.messageDeleted+'D'));
      setMessageDeleted(props.messageDeleted)
    };

    if (props.askForOffer !== askForOffer){
        if(props.currentOffer._id){
        setMessage(`I wound like to get more info about the "${props.currentOffer.name}" offer.`)
        setShowMic(false)
      }else{
        setMessage("")
        setShowMic(true)

      }
      setCurrentOffer(props.currentOffer)
      setAskForOffer(props.askForOffer)
    };
    // if (props.currentOffer._id !== currentOffer._id){
    //   alert("jj")
    //   if(props.currentOffer._id){
    //     setMessage("I wound like to get more info about the "+props.currentOffer+" offer.")
    //   }else{
    //     setMessage("")
    //   }
    //   setCurrentOffer(props.currentOffer)
    // };
    
    useEffect(() => {
      _load()
      
    }, [])

   


    async function _load() { 
      if(props.user._id){
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
      let id=props.user.chatID
      const token = await getToken(id);
    const client = await Chat.Client.create(token);

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
          let newMessages=await fixMessages(messages.items)
          setMessages(messages.items?newMessages:[])
          setLoading(false)
    
          scrollToBottom();
        });
        setClientX(client)
      if(props.user.startedChat){

    const channel = await client.getChannelBySid(props.user.chat);
    setChannel(channel)
    joinChannel(channel);
  }else{
    setMessages([])
    setLoading(false)
    setIsLoadingEarlier(false)
  }
  }else{
    setGuest(true)
  }

    }
  

    function scrollToBottom () {
      // const scrollHeight = this.scrollDiv.current.scrollHeight;
      // const height = this.scrollDiv.current.clientHeight;
      // const maxScrollTop = scrollHeight - height;
      // this.scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    };

  async function fixMessages(msgs){
    // "image/png"
    if(msgs.length==0){
      return [];
    }
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
              avatar: 'AppIcon',
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
              avatar: 'AppIcon',
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
            avatar: 'AppIcon',
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


  function _toggleSubview() {    
    // this.setState({
    //   buttonText: !isHidden ? "Show Subview" : "Hide Subview"
    // });

    var toValue = 0;

    if(isHidden) {
        toValue = -h+w*0.25;
    }
   
    Animated.spring(
      bounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8,
        // duration: 5000,
        useNativeDriver: true
      }
    ).start();

  
    setIsHidden( !isHidden);
  }

  async function getToken  (id:String)  {
    const response = await axios.get(`${API_URL}/token/${id}`)
    return response.data.jwt;
  }



  async function joinChannel  (channel) {
    if (channel.channelState.status !== "joined") {
     await channel.join();
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

 async function sendMessage (newMessages) {
  if(props.user.startedChat){
  const attributes = { giftedId: newMessages[0]._id };
  newMessages[0].pending=true
  setMessages( GiftedChat.append(messages, newMessages));
  channel.sendMessage(newMessages[0].text, attributes);
  }else{
    const attributes = { giftedId: newMessages[0]._id };
    newMessages[0].pending=true
    setMessages( GiftedChat.append(messages, newMessages));
    let userdata=props.user.mobileNumber?{mobileNumber:props.user.mobileNumber}:{socialID:props.user.socialID}
    let channelID=props.user.mobileNumber? await props.startChat(userdata):await props.startChatSocial(userdata);
    if(channelID==="error"){
      alert("Network Error")
    }else{
      const channel = await clientX.getChannelBySid(channelID);
      setChannel(channel)
      joinChannel(channel);
      // alert("1")
      channel.sendMessage(newMessages[0].text, attributes);
    }
    //startchat
  }
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
async function sendImage(){
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
      

    RNFS.readFile(resizerResponse.path, 'base64').then(async(data) => {
    var Buffer = require('buffer/').Buffer
    data = Buffer.from(data, 'base64')
    uniqueId().then(async (id) => {
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

    if(props.user.startedChat){
    channel.sendMessage({
      contentType: 'image/png',
      media: data,
      
    },attributes).then(id2 => console.log(id2))
    .catch(e=>console.log(e))
  }else{
    let userdata=props.user.mobileNumber?{mobileNumber:props.user.mobileNumber}:{socialID:props.user.socialID}
    let channelID=props.user.mobileNumber? await props.startChat(userdata):await props.startChatSocial(userdata);
    if(channelID==="error"){
      alert("Network Error")
    }else{
      const channel = await clientX.getChannelBySid(channelID);
      setChannel(channel)
      joinChannel(channel);
      // alert("1")
      channel.sendMessage({
        contentType: 'image/png',
        media: data,
        
      },attributes).then(id2 => console.log(id2))
      .catch(e=>console.log(e))
      }

  }

  })
  })
    
  })


}

function connectToChannel(c){
  setChannel(c)
  joinChannel(c);
}


function renderActions(props) {
  return (
    <Actions
      {...props}
      icon={() => (
        <View style={{flexDirection:'row'}}>

        <Icon1 name='paperclip' size={normalize(22)} color='#203152'onPress={() => {getImage()}}/>
        {/* <Icon name='paperclip' size={normalize(22)} color='black'onPress={() => {this.state.allow?this.getImage():this.ban()}}/> */}
        {/* <TouchableOpacity onPress={() => this.micHandler()} style={{marginLeft:w*0.02}}>
          <Icon3 name='ios-mic' size={normalize(25)}  color={this.state.micOn?'red':'black'}/>
        </TouchableOpacity> */}
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
    <Animated.View style={[styles.chatBtn,{transform: [{translateY: bounceValue}]}]} >
    <TouchableOpacity activeOpacity={0.9} style={isHidden?[styles.chatBtn2,{borderTopRightRadius:10,borderTopLeftRadius:10}]:[styles.chatBtn2,{justifyContent:'flex-end',borderBottomLeftRadius:10,
    borderBottomRightRadius:10}]} onPress={()=>_toggleSubview()}>
        {isHidden?
  <View style={{alignItems:'center'}}>
<Icon style={{marginVertical:w*0.01}} name={'angle-double-up'} size={normalize(20)} color={'white'} />
<Text style={styles.txt}>{askForOffer?'Ask for Offer':'Talk to Culumbus'}</Text>
</View>
:
<View style={{alignItems:'center'}}>
  <Text style={styles.txt}>Culumbus</Text>
<Icon style={{marginVertical:w*0.01}} name={'angle-double-down'} size={normalize(20)} color={'white'} />
</View>
}
</TouchableOpacity>

<View style={styles.subContainer}>
  {guest?
    <Text style={styles.guest}>Sorry, you can't start a chat without being logged in.</Text>
  :loading?
  <Activity style={{marginTop:h*0.3}}/>
  :
  <>
  <GiftedChat
keyboardShouldPersistTaps='handled'
  textInputProps={{value:message}}
  onInputTextChanged={(txt)=>{toggleRecord(txt);setMessage(txt)}}

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
      style={{width:w*0.15,height:w*0.15,alignItems:'center',justifyContent:'center',position:'absolute',bottom:0,right:w*0.02}}>
      
          <Icon4 name='ios-mic' size={normalize(25)}  color='#203152'/>
        
        </TouchableOpacity>
        :null}
    </>
  }
</View>

<Modal style={{margin:0}} isVisible={showAvatar}>
        <View style={{ height:h,width:w,backgroundColor: '#5F6769',justifyContent:'center',alignItems:'center'}}>
        
        <Image source={avatarSource} style={styles.img2} resizeMode="cover"/>  
        <TouchableOpacity style={{width:w*0.16,height:w*0.16,position:'absolute',top:w*0.1,right:w*0.05,alignItems:'center',justifyContent:'center'}} onPress={() => {setShowAvatar(false);setAvatarSource({})}}>
        <Icon3 name='x' size={normalize(25)} color='white'/>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#32a0fe',width:w*0.16,height:w*0.16,borderRadius:w*0.08,position:'absolute',bottom:w*0.1,right:w*0.05,alignItems:'center',justifyContent:'center'}} onPress={() => sendImage()}>
        <Icon2 name='send' size={normalize(25)} color='white'/>
        </TouchableOpacity>
          </View>
      </Modal>
      {recording?
      <Recorder addRecordFunc={addRecord} user={props.user} cancel={cancelRecording} channel={channel} client={clientX} connectToChannel={connectToChannel}/>
      :null}
</Animated.View>
  );
}

const styles=StyleSheet.create({


  chatBtn:{
      width:w,
      height:h,
      position:'absolute',
      bottom:-h+w*0.25,
      alignItems:'center',
    //   borderTopLeftRadius:10,
    //   borderTopRightRadius:10,
      // borderRadius:10,
      overflow:'hidden',
      backgroundColor:'white'
  },
  chatBtn2:{
    width:w,
    height:w*0.25,
    backgroundColor:'#203152',
    justifyContent:'flex-start',
    alignItems:'center'
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
    }
})

const mapStateToProps = state => ({
  user:state.auth.user,
  messageDeleted:state.chats.messageDeleted,
  askForOffer:state.hotels.askForOffer,
  currentOffer:state.hotels.currentOffer
})

export default connect(mapStateToProps, actions)(ChatScreen);