import React, { useState, useCallback, useEffect } from 'react';
import { normalize } from '../normalize'
import { connect} from 'react-redux';
import * as actions from '../../actions';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, FlatList, Platform, Image} from 'react-native'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ChatCard from '../../components/ChatCard';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import {API_URL} from "@env"

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);
const Chat = require("twilio-chat");

function ListChats(props) {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [channels, setChannels] = useState([]);
    const [client, setClient] = useState({});

    if (props.loading !== loading){
        // alert(props.cities.length)
        setLoading(props.loading)
        // console.log(cities)
    };

    useEffect(() => {

        _load()
        
      }, [])
      async function _load() { 
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
  
      const channels = await client.getSubscribedChannels();
      let x=[...channels.items]
      x=x.filter(item => !!item.lastMessage)
      x=x.sort(function(a,b){
        return new Date(b.lastMessage.dateCreated) - new Date(a.lastMessage.dateCreated);
      });
      setChannels(x)
      setClient(client)
    //   console.log(channels)
    //   joinChannel(channel);
  
      
      }
  
  
      async function getToken  (id:String)  {
        const response = await axios.get(`${API_URL}/token/${id}`)
        return response.data.jwt;
      }
    
    
    
    //   async function joinChannel  (channel) {
    //     if (channel.channelState.status !== "joined") {
    //      await channel.join();
    //    }
     
    //    channel.on("messageAdded", handleMessageAdded);
    //    scrollToBottom();
    //  };

  return (
        <View style={styles.container}>
          <View style={styles.header}>
          <TouchableOpacity style={styles.iconContainer} onPress={()=>props.navigation.navigate('Logout')}>
   <Icon name={'logout'} size={normalize(25)} color={'#203152'} />
   </TouchableOpacity>
        <Image source={{uri: 'logo'}} resizeMode="contain" style={styles.logo}/>
        </View>

        <FlatList 
                // extraData={cities}
                data={channels}
                style={{paddingBottom:w*0.01,width:w}}
                keyExtractor={(item, index) => item.sid }
                renderItem={({ item:channel, index }) =>   
                <ChatCard nav={props.navigation} chat={channel} client={client}/>
            }/>


        </View>


  );
}

const styles=StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor:'white',
        alignItems:'center',
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
    txt:{
        color:'#203152',
        fontSize:normalize(28),
        fontFamily:'Anderson Grotesk',
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
    right:w*0.02,
    top:w*0.12,
}

})

const mapStateToProps = state => ({
    cities:state.venues.cities,
    user: state.auth.user
})

export default connect(mapStateToProps, actions)(ListChats);