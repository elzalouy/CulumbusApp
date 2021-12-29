import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, StyleSheet, Dimensions , Image, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform} from 'react-native'
import { normalize } from '../normalize'
import { connect} from 'react-redux';
import * as actions from '../../actions';
import Icon from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-datepicker'

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);


function Register(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [birthdate, setBirthdate] = useState(null);
    const [password, setPassword] = useState('');
    const [retypepassword, setRetypepassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorMobileNumber, setErrorMobileNumber] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');


  if (props.loading !== loading){
    setLoading(props.loading)
  };
  
    useEffect(() => {
          // setEvents([])
        // props.listEvents()
        // props.listCityActivities(props.route.params.city.id)
        return () => {
        //   props.clearCityActivities()
        }
    }, [])

    function register(){
        if(verify()){
            let data={
                name:name,
                email:email,
                mobileNumber:mobileNumber,
                password:password,
                birthdate:birthdate
            }
    
          props.register(data,props.navigation)
        }
      
    }


    function isEmail(emailI){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(emailI).toLowerCase());
    }
    

    function isMobileNumber(str) {
        if (typeof str != "string") return false
        return !isNaN(str) && 
               !isNaN(parseFloat(str)) &&
                    str.length===11
        // return true
      }

    function verify(){
        let result=true
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if(name&&(format.test(name) || /\d/.test(name))){
        result=false

        setErrorName("The name can not contain numbers or symbols")

        } else {

            if(name && name.length>2){
                setErrorName("")
            }else{
                result=false
                if(!name){
                    setErrorName("The name is a required field.")
                }else{
                    setErrorName("Please enter your real name.")
                }
            }
        }


        if(isEmail(email)){
            setErrorEmail("")
        }else{
            result=false
            setErrorEmail("This is not a valid email.")
        }
        if(isMobileNumber(mobileNumber)){
            setErrorMobileNumber("")
        }else{
            result=false
            setErrorMobileNumber("This is not a valid mobile number.")
        }
        if(password && password.length>7){
            setErrorPassword("")
        }else{
            result=false
            setErrorPassword("The password should be at least 8 characters.")
        }
        if(retypepassword===password){
            setErrorConfirmPassword("")
        }else{
            result=false
            setErrorConfirmPassword("The passwords do not match.")
        }
        
        
        return result
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
                    <Text style={styles.txt}>Register Now</Text>
                    <Text style={styles.txt2}>Please enter your credentials in the form bellow:</Text>
                </View>


                {loading?
               <ActivityIndicator style={{marginTop:w*0.5}} size="large" color="#203152" />
                :
                <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
               >
                <ScrollView style={styles.formContainer} contentContainerStyle={{alignItems:'center',paddingBottom:w*0.5}}             keyboardShouldPersistTaps={'handled'}>
                <View style={styles.form} >
                    <View style={styles.inputs}  >
                    <Text style={styles.txt3}>Your Name</Text>
                    <TextInput style={styles.input} placeholder="Enter your Name" placeholderTextColor="rgba(32, 49, 82, 0.2)"
                    onChangeText={text => setName(text)}
                    value={name}
                    onSubmitEditing={() => { this.input2.focus(); }}
                    />
                    {errorName?<Text style={styles.error}>{errorName}</Text>:null}

                     <Text style={styles.txt3}>Your Email</Text>
                    <TextInput style={styles.input} placeholder="Enter your Email" placeholderTextColor="rgba(32, 49, 82, 0.2)"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    ref={(input) => { this.input2 = input; }}
                    onSubmitEditing={() => { this.input3.focus(); }}
                    />
                    {errorEmail?<Text style={styles.error}>{errorEmail}</Text>:null}
                     <Text style={styles.txt3}>Mobile Number</Text>
                    <TextInput style={styles.input} placeholder="Enter Mobile Number" placeholderTextColor="rgba(32, 49, 82, 0.2)"
                    onChangeText={text => setMobileNumber(text)}
                    value={mobileNumber}
                    ref={(input) => { this.input3 = input; }}
                    onSubmitEditing={() => { this.input4.focus(); }}
                    />
                 {errorMobileNumber?<Text style={styles.error}>{errorMobileNumber}</Text>:null}
                 <Text style={styles.txt3}>Birthdate</Text>

                 <DatePicker
              androidMode='calendar'
                        style={[styles.input,{marginTop:0}]}
                        date={birthdate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="1920-01-01"
                        maxDate={new Date()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                        dateText:{
                            // fontFamily:'NeueHaasGroteskDisp W02',
                            fontSize:normalize(13),
                    color:'#203152',
                        },
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            width:w*0.3,
                            borderWidth:0,
                        },
                        }}
                        onDateChange={(date) => {setBirthdate(date)}}
                    />


                    <Text style={styles.txt3}>Password</Text>
                    <TextInput style={styles.input} placeholder="Enter your Password" placeholderTextColor="rgba(32, 49, 82, 0.2)"
                    onChangeText={text => setPassword(text)}                    
                    value={password}      
                    secureTextEntry={true}    
                    ref={(input) => { this.input4 = input; }}
                    onSubmitEditing={() => { this.input5.focus(); }   }       
                    />
                   {errorPassword?<Text style={styles.error}>{errorPassword}</Text>:null}


                    <Text style={styles.txt3}>Retype Password</Text>
                    <TextInput style={styles.input} placeholder="Enter your Password" placeholderTextColor="rgba(32, 49, 82, 0.2)"
                    onChangeText={text => setRetypepassword(text)}                    
                    value={retypepassword}      
                    secureTextEntry={true}   
                    ref={(input) => { this.input5 = input; }}
                    />
                  {errorConfirmPassword?<Text style={styles.error}>{errorConfirmPassword}</Text>:null}


                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={()=>register()}>
                    <Text style={styles.txt4}>Register</Text>
                    </TouchableOpacity>
                    </View>
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
    formContainer:{
        width:w,
        flex:1,
    },
    form:{
        width:w*0.9,
        marginTop:w*0.07,
        marginBottom:w*0.15,
        alignItems:'center',
        paddingBottom:w*0.08,
    },
    inputs:{
        width:w*0.9,
        backgroundColor:'rgba(255,255,255,0.9)',
        borderRadius:15,
        paddingHorizontal:w*0.04,
        paddingTop:w*0.05,
        paddingBottom:w*0.13,
    },
    txt3:{
        color:'#203152',
        fontSize:normalize(16),
        fontFamily:'Anderson Grotesk',
        marginTop:w*0.04
    },
    input:{
        borderBottomWidth:1,
        borderBottomColor:'#D6D6D6',
        height:w*0.07,
        fontSize:normalize(14),
        fontFamily:'Anderson Grotesk',
        color:'#203152',
        marginBottom:w*0.01,
        marginTop:w*0.01,
        width:w*0.82
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
    error:{
        color:'#cc0000',
        fontSize:normalize(11),
        fontFamily:'Anderson Grotesk',
        

    }


})

const mapStateToProps = state => ({
    loading:state.auth.loading,

})

export default connect(mapStateToProps, actions)(Register);