import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, StyleSheet, Dimensions , Image, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform} from 'react-native'
import { normalize } from '../normalize'
import { connect} from 'react-redux';
import * as actions from '../../actions';
import Icon from 'react-native-vector-icons/AntDesign';
// import { BlurView } from 'expo-blur';

// import {
//     TextField,
//     FilledTextField,
//     OutlinedTextField,
//   } from 'react-native-material-textfield';

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

  if (props.loading !== loading){
    setLoading(props.loading)
  };
  
    useEffect(() => {
        // alert("1")
          // setEvents([])
        // props.listEvents()
        // props.listCityActivities(props.route.params.city.id)
        return () => {
        //   props.clearCityActivities()
        }
    }, [])
    function login(){

        let data={
            mobileNumber:email,
            password:password
        }

      props.login(data,props.navigation)
    }
        return (
            
            <ImageBackground source={{uri: 'img2'}} style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <TouchableOpacity style={{position:'absolute',left:w*0.05,marginTop:w*0.02,padding:w*0.01}} onPress={()=>props.navigation.goBack()}>
                            <Icon  name={'arrowleft'} size={normalize(23)} color={'#203152'} />
                        </TouchableOpacity>
                        <View style={{}}>
                        <Image source={{uri: 'logo'}} resizeMode="contain" style={styles.logo}/>
                        </View>

                    </View>
                    <Text style={styles.txt}>Welcome back</Text>
                    <Text style={styles.txt2}>Please enter your credentials in the form bellow:</Text>
                </View>


                {loading?
               <ActivityIndicator style={{marginTop:h*0.25}} size="large" color="#203152" />
                :
                <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
               >
                   <ScrollView   keyboardShouldPersistTaps={'handled'}>
                <View style={styles.form} >
                    <View style={styles.inputs}>
                    {/* <OutlinedTextField
        label='Phone number'
        keyboardType='phone-pad'
        // formatText={this.formatText}
        // onSubmitEditing={this.onSubmit}
        // ref={this.fieldRef}
      /> */}
                    <Text style={styles.txt3}>Mobile Number</Text>
                    <TextInput style={styles.input} placeholder="Enter Mobile Number Here" placeholderTextColor="rgba(32, 49, 82, 0.2)"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    onSubmitEditing={() => { this.input2.focus(); }}
                    />
                    <Text style={styles.txt3}>Password</Text>
                    <View >
                    <TextInput style={styles.input} placeholder="Enter password" placeholderTextColor="rgba(32, 49, 82, 0.2)"
                    onChangeText={text => setPassword(text)}                    
                    value={password}      
                    secureTextEntry={true}     
                    ref={(input) => { this.input2 = input; }}
                    />
                    <TouchableOpacity style={{position:'absolute',top:w*0.02,right:0}} onPress={()=>props.navigation.navigate('ForgetPassword')}>
                        <Text style={styles.txt5}>FORGOT?</Text>
                    </TouchableOpacity>
                    </View>

                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={()=>login()}>
                    <Text style={styles.txt4}>LOGIN</Text>
                    </TouchableOpacity>
                    
                </View>
                <TouchableOpacity style={{marginTop:h*0.05,}}activeOpacity={1.0} onPress={()=>this.login()}>
            <Text style={styles.accountText}>Dont’ have an account yet?{'\n'}sign up now</Text>
            </TouchableOpacity>
                </ScrollView>
                </KeyboardAvoidingView>
}

             
            </ImageBackground>
        )
    
}

const styles=StyleSheet.create({
    container : {
        flex: 1,
        alignItems:'center',
    },
    header:{
        backgroundColor:'white',
        height:w*0.55,
        width:w,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    subHeader:{
        flexDirection:'row',
        marginTop:w*0.1,
        justifyContent:'center',
        width:w

    },
    logo:{
        width:w*0.17,
        height:w*0.12

    },
    txt:{
        color:'#203152',
        fontSize:normalize(28),
        fontFamily:'Anderson Grotesk',
        marginTop:w*0.11
    },
    txt2:{
        color:'#7C8698',
        fontSize:normalize(11),
        fontFamily:'Anderson Grotesk',
    },
    form:{
        width:w*0.9,
        marginTop:h*0.12,
        paddingBottom:w*0.08,
        alignItems:'center',
    },
    inputs:{
        width:w*0.9,
        backgroundColor:'rgba(255,255,255,0.9)',
        borderRadius:15,
        paddingHorizontal:w*0.04,
        paddingTop:w*0.05,
        paddingBottom:w*0.13,
    },
    accountText:{
        color:'white',
        fontSize:normalize(11),
        fontFamily:'Anderson Grotesk',
        textAlign:'center',
        // marginTop:w*0.3
    },
    txt3:{
        color:'#203152',
        fontSize:normalize(16),
        fontFamily:'Anderson Grotesk',
    },
    input:{
        borderBottomWidth:1,
        borderBottomColor:'#D6D6D6',
        height:w*0.07,
        fontSize:normalize(14),
        fontFamily:'Anderson Grotesk',
        color:'#203152',
        marginBottom:w*0.05,
        marginTop:w*0.01
    },
    loginButton:{
        width:w*0.7,
        backgroundColor:'#203152',
        paddingVertical:w*0.05,
        position:'absolute',
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    txt4:{
        color:'white',
        fontSize:normalize(16),
        fontFamily:'Anderson Grotesk',
    },
    txt5:{
        color:'#5680FA',
        fontSize:normalize(11),
        fontFamily:'Anderson Grotesk',
        

    }


})

const mapStateToProps = state => ({
    loading:state.auth.loading,

})

export default connect(mapStateToProps, actions)(Login);