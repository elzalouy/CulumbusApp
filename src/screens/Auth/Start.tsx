import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet, Dimensions , Image, TouchableOpacity, Platform} from 'react-native'
import { normalize } from '../normalize'
import { connect} from 'react-redux';
import * as actions from '../../actions';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage'
import {  Profile, AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { appleAuth } from '@invertase/react-native-apple-authentication';

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

function Start(props) {
    async function continueAsAGuest(){
        // const userToken = await AsyncStorage.removeItem('token');
        // const user = await AsyncStorage.removeItem('userData');
        props.navigation.reset({
            index: 1,
            routes:[{
            name: 'App',
        }]
        });
        // .navigate('App', {screen:'Home'})
    }

    function loginWithFacebook(){
        try{
          LoginManager.logInWithPermissions(["public_profile","email"]).then(
              function(result) {
                if (result.isCancelled) {
                  console.log("Login cancelled");
                } else {
                 
                  console.log(result );
                  AccessToken.getCurrentAccessToken().then(
                      function(data) {
                          props.loginWithFacbook({token:data.accessToken},props.navigation)
                          console.log(data.accessToken)
                        // fetch('https://graph.facebook.com/v2.5/me?fields=id,first_name,last_name,picture,email&access_token=' + data.accessToken.toString())
                        // .then((response) => response.json())
                        // .then((user) => {
                        //   let info={
                        //     social_user_id:user.id,
                        //     social_first_name:user.first_name,
                        //     social_last_name:user.last_name,
                        //     social_email:user.email,
                        //     provider_id: "fb"
                        //   }
                        //   props.checkSocialID(info,props,props.navigation)
                        //   // console.log(json)     
                        // })
                        // .catch(() => {
                        //   reject('ERROR GETTING DATA FROM FACEBOOK')
                        // })
  
                      }.bind(this)
                  )
                }
              }.bind(this),
              function(error) {
                console.log("Login fail with error: " + error);
              }
            );
  
        }
        catch(e){
          alert(JSON.stringify(e))
        }
      }

      async function signInWithApple ()  {
        try{
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
         const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
         console.log(appleAuthRequestResponse)
        if (credentialState === appleAuth.State.AUTHORIZED) {
        //   if(!appleAuthRequestResponse.email){
        //     // Linking.openURL('App-Prefs:Privacy&path=LOCATION')
        //         alert("You have to give the permission to access your email.")
        //   }else{
          let info={UserInputApple:{
            socialID:appleAuthRequestResponse.user,
            socialType:appleAuthRequestResponse.user,
            name:appleAuthRequestResponse.fullName.givenName?appleAuthRequestResponse.fullName.givenName+" "+appleAuthRequestResponse.fullName.familyName:null,
            email:appleAuthRequestResponse.email,   
            identityToken:appleAuthRequestResponse.identityToken
          }
          }

          props.signinWithApple(info,props.navigation)
        // }
        }
    
      }
      catch(error){
        console.log(error)
      }
        
       
      }


        return (
            <ImageBackground source={{uri: 'img'}} style={styles.container}>

            <Image source={{uri: 'logo'}} style={styles.logo} resizeMode="contain"/>
            <Text style={styles.tagline}>Cool tagline goes here</Text>

            <TouchableOpacity style={styles.btn} onPress={()=> loginWithFacebook()}>
            <View style={{flex:2,alignItems:'center'}}>
                <Icon  name={'logo-facebook'} size={normalize(20)} color={'white'} />
            </View>
            <View style={{flex:6}}>
                <Text style={styles.txt}>SIGN IN WITH FACEBOOK</Text>
            </View>
            </TouchableOpacity>
            {Platform.OS === 'ios'?
            <TouchableOpacity style={[styles.btn2,{backgroundColor:'black'}]} onPress={()=> signInWithApple()}>
            <View style={{flex:2,alignItems:'center'}}>
                <Icon1  name={'apple1'} size={normalize(20)} color={'white'} />
            </View>
            <View style={{flex:6}}>
                <Text style={styles.txt}>SIGN IN WITH APPLE</Text>
            </View>
            </TouchableOpacity>
            :null}

            <TouchableOpacity style={styles.btn2} onPress={()=>props.navigation.navigate('Register')}>
            <View style={{flex:2,alignItems:'center'}}>
                <Icon2  name={'mail'} size={normalize(20)} color={'white'} />
            </View>
            <View style={{flex:6}}>
                <Text style={styles.txt}>SIGN UP USING EMAIL</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:h*0.05}} activeOpacity={1.0} onPress={()=>continueAsAGuest()}>
            <Text style={styles.continue}>Continue as a Guest</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ marginTop:h*0.05}} activeOpacity={1.0} onPress={()=>props.navigation.navigate('Login')}>
            <Text style={styles.accountText}>I already have an account{'\n'}LOGIN NOW</Text>
            </TouchableOpacity>
            </ImageBackground>
        )
    
}


const styles=StyleSheet.create({
    container : {
        flex: 1,
        // backgroundColor:'#0B121A',
        alignItems:'center',
        // width:w,
        // height:h
    },
    title:{
        color:'white',
        fontSize:normalize(14),
        fontFamily:'OpenSans-Bold'

    },
 
    logo:{
        width:w*0.5,
        height:w*0.4,
        marginTop:h*0.12
    },
    tagline:{
        color:'#00309F',
        fontSize:normalize(16),
        // fontFamily:'Anderson Grotesk',
    },
    btn:{
        backgroundColor:'#3364B7',
        width:w*0.85,
        paddingVertical:w*0.045,
        borderRadius:50,
        flexDirection:'row',
        marginTop:h*0.1,
        alignItems:'center',
        justifyContent:'center'
    },
    btn2:{
        backgroundColor:'#203152',
        width:w*0.85,
        paddingVertical:w*0.045,
        borderRadius:50,
        flexDirection:'row',
        marginTop:h*0.02,
        alignItems:'center',
        justifyContent:'center'
    },
    txt:{
        color:'white',
        fontSize:normalize(12),
        fontFamily:'Anderson Grotesk',
    },
    accountText:{
        color:'white',
        fontSize:normalize(11),
        fontFamily:'Anderson Grotesk',
        textAlign:'center',
    },
    continue:{
        color:'white',
        fontSize:normalize(17),
        fontFamily:'Anderson Grotesk',
        textDecorationLine:'underline',
        
    }
 
})

const mapStateToProps = state => ({

  })
  
export default connect(mapStateToProps, actions)(Start);
// export default copilot()(Welcome);