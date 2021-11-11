import React, { useState, useEffect } from 'react';
import { connect} from 'react-redux';
import * as actions from '../../../actions';
import { View, Text, Dimensions, TouchableOpacity, ScrollView, Platform, TextInput,Alert, ActivityIndicator } from 'react-native'
import  Geolocation  from '@react-native-community/geolocation'

import Header from '../../../components/Header';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { normalize } from '../../normalize'
import DatePicker from 'react-native-datepicker'


const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height)

function EditProfile(props) {
    const [user, setUser] = useState({name:''});
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [loading, setLoading] = useState(false);
 
  
    if (JSON.stringify(props.user) !== JSON.stringify(user)){
        setUser(props.user)
    };
    
    if (props.loading !== loading){
        setLoading(props.loading)
    };

  useEffect(() => {
    // alert(JSON.stringify(props.user))
    if(props.user.email){
        setEmail(props.user.email)
    }
    if(props.user.name){
        setName(props.user.name)
    }
    if(props.user.birthdate){
        setBirthdate(props.user.birthdate)
    }
    if(props.user.mobile){
        setMobile(props.user.mobile)
    }

    return () => {
    }
  }, [])


  function deleteAccount() { 
      let data={
          _id:props.user._id
      }
    Alert.alert('Alert','Are you sure you want to delete your account?',
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "I am sure", onPress: () => props.deleteAccount(data,props.navigation), style:"destructive" }
        ]
        )
  }

  function editProfileF() { 
    let data={
        _id:props.user._id,
        userInput:{
            name:name,
            birthdate:birthdate
        }
    }
    props.editProfile(data,props.navigation)
    }
  


  return (
    <View style={styles.container}>
           
        <Header nav={props.navigation}/>
        <Text style={styles.txt}>Edit Profile</Text>
        {loading?
               <ActivityIndicator style={{marginTop:h*0.25}} size="large" color="#203152" />
                :
                <>
        <View style={styles.inputsContainer}>

        <Text style={styles.inputText}>Email</Text>
            <TextInput style={styles.input} placeholder="Enter Mobile Number Here" placeholderTextColor="rgba(32, 49, 82, 0.2)"
            onChangeText={text => setEmail(text)}
            value={email}
            // onSubmitEditing={() => { this.input2.focus(); }}
            editable={false} selectTextOnFocus={false}
            />

        <Text style={styles.inputText}>Name</Text>
            <TextInput style={styles.input} placeholder="Enter Mobile Number Here" placeholderTextColor="rgba(32, 49, 82, 0.2)"
            onChangeText={text => setName(text)}
            value={name}
            onSubmitEditing={() => { this.input2.focus(); }}
            />
            {/* {props.user.mobileNumber?
            <>
                <Text style={styles.inputText}>Mobile Number</Text>
                <TextInput style={styles.input} placeholder="Enter Mobile Number Here" placeholderTextColor="rgba(32, 49, 82, 0.2)"
                onChangeText={text => setMobile(text)}
                value={mobile}
                onSubmitEditing={() => { this.input2.focus(); }}
                />
            </>
            :null} */}

   
        <Text style={styles.inputText}>Birthdate</Text>
        <DatePicker
              androidMode='calendar'
                        style={[styles.input,{marginTop:0,width:w*0.9}]}
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
      </View>
        
        <TouchableOpacity style={styles.button2} activeOpacity={1.0} onPress={()=>editProfileF()}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
     
        <TouchableOpacity style={styles.logoutButton} activeOpacity={1.0}onPress={()=>deleteAccount()}>
          <Text style={styles.logoutText}>Delete Account</Text>
        </TouchableOpacity>
        </>
}
    </View>
  );
}

const mapStateToProps = state => ({
    user:state.auth.user,
    loading:state.auth.loading,
})

export default connect(mapStateToProps, actions)(EditProfile);