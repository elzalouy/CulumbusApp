import { StyleSheet, Dimensions } from 'react-native'
import { normalize } from '../../normalize'

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

export const styles=StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor:'white',
        alignItems:'center',
        width:w,
        height:h,
        overflow:'visible'
    },
    txt:{
        color:'#203152',
        fontSize:normalize(28),
        fontFamily:'Anderson Grotesk',
    },
    name:{
        color:'black',
        fontSize:normalize(18),
        fontFamily:'Anderson Grotesk',
        fontWeight:'bold',
    },
    button1:{
        width:w*0.75,
        backgroundColor:'#203152',
        paddingVertical:w*0.06,
        marginTop:w*0.05,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    button2:{
        width:w*0.75,
        backgroundColor:'#203152',
        paddingVertical:w*0.06,
        marginTop:w*0.1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    btnText:{
        color:'white',
        fontSize:normalize(13),
        fontFamily:'Anderson Grotesk',
    },
    logoutButton:{
        backgroundColor:'white',
        paddingVertical:w*0.01,
        paddingHorizontal:w*0.04,
        marginTop:w*0.05,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
        borderWidth:1,
        borderColor:'red',
    },
    logoutText:{
        color:'black',
        fontSize:normalize(13),
        fontFamily:'Anderson Grotesk',
        marginTop:w*0.005,
  
    },
    nameContainer:{
        flexDirection:'row',
        width:w,
        alignItems:'center'
        // backgroundColor:'red'
    },
    editText:{
        color:'white',
        fontSize:normalize(10),
        fontFamily:'Anderson Grotesk',
        // fontWeight:''
    },
    editContainer:{
        backgroundColor:'rgba(0, 0, 0, 0.4)',
        flexDirection:'row',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        paddingHorizontal:w*0.02,
        paddingVertical:5,

    },
    input:{
        borderBottomWidth:1,
        borderBottomColor:'#D6D6D6',
        height:w*0.07,
        fontSize:normalize(14),
        fontFamily:'Anderson Grotesk',
        color:'#203152',
        marginBottom:w*0.05,
        marginTop:w*0.01,
    },
    inputText:{
        color:'#203152',
        fontSize:normalize(16),
        fontFamily:'Anderson Grotesk',
    },
    inputsContainer:{
        width:w*0.9,
        marginTop:w*0.05
    }
})