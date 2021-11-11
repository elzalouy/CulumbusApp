import React, { useState, useCallback, useEffect } from 'react';
import { normalize } from '../screens/normalize'
import { connect} from 'react-redux';
import * as actions from '../actions';
import { View, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator, Text} from 'react-native'
import FastImage from 'react-native-fast-image'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

function ChatCard(props) {
    const [chat, setChat] = useState({
      online:false,
      friendlyName:'',
      lastMessage:null
    });

    useEffect(() => {

      setChat(props.chat)
      
    }, [])

  return (
    chat.lastMessage?
    <>
    <TouchableOpacity style={styles.card} onPress={() => props.nav.navigate('AdminChat',{chat:chat,client:props.client})}>
    {chat.online?
    <View style={{borderColor:'#2E2D2C',borderWidth:0,zIndex:1,left:w*0.15,bottom:w*0.045,backgroundColor:'#00CC00',width:w*0.014,height:w*0.014,borderRadius:w*0.007}}/>
    :
    <View style={{width:w*0.04,height:w*0.04}}/>
    }
    <FastImage
    source={{uri: 'profile'}}
    style={styles.img}
    // PlaceholderContent={<ActivityIndicator/>}
    />
    <View>
    <View style={{flexDirection:'row',alignItems:'center',width:w*0.75,justifyContent:'space-between'}}>
    <Text style={{marginLeft:w*0.05,color:'#203152',fontWeight:'bold',fontSize:normalize(15),}}>{chat.friendlyName?chat.friendlyName:"User"}</Text>


    <Text style={{fontSize:normalize(10),color:'#888888'}}> {chat.lastMessage?timeAgo.format(chat.lastMessage.dateCreated):''}</Text>
    
    </View>
    <Text style={{marginLeft:w*0.05,marginTop:w*0.01,color:'#888888',fontSize:normalize(10)}}>xx</Text>
    </View>
    </TouchableOpacity>
        <View style={styles.line}/>
      </>
      :null
  );
}

const styles=StyleSheet.create({
    line:{
        width:w*0.75,
        height:1,
        backgroundColor:'silver',
        alignSelf:'flex-end',
        marginTop:w*0.02,
        // backgroundColor:'silver'
    },
     
    img:{
        width: w*0.15,
        height: w*0.15,
        borderRadius:100,
        backgroundColor:'silver'
      },
      card:{
        width: w,
        height: w*0.2,
        alignSelf:'center',
        alignItems:'center',
        borderRadius:20,
        flexDirection:'row',
      },
      flag:{
        marginTop:w*0.05,
        marginLeft:w*0.01,
        width:w*0.08,
        height:w*0.05,
        borderRadius:5
      },
     
})

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, actions)(ChatCard);