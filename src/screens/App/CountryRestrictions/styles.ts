import { StyleSheet, Dimensions } from 'react-native'
import { normalize } from '../../normalize'

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

export const styles=StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor:'white',
        alignItems:'center',
    },
    subContainer:{
        width:w,
    },
    input:{
        width: w*0.75,
        borderWidth:2,
        borderRadius:10,
        borderColor:'#203152',
        marginVertical:w*0.05,
        paddingVertical:w*0.03,
        paddingHorizontal:w*0.02
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        width:w*0.9,
        justifyContent:'space-between'
    },
    txt:{
        color:'#203152',
        fontSize:normalize(20),
        fontFamily:'Anderson Grotesk',
    },
    card:{
        width:w*0.9,
        backgroundColor:'rgba(208, 208, 208, 0.2)',
        paddingBottom:w*0.15,
        paddingTop:w*0.03,
        borderRadius:15,
        marginTop:h*0.02,

    },
    header:{
        flexDirection:'row',
        paddingHorizontal:w*0.05
    },
    line:{
        width:w*0.9,
        height:1,
        backgroundColor:'#D0D0D0'
    },
    body:{
        marginTop:w*0.05
    },
    flagContainer:{
        width:w*0.2,
        height:w*0.18,
        // borderRadius:100,
        overflow:'hidden',
        padding:0,
    },
    title:{
        color:'#7C8698',
        fontSize:normalize(13),
        fontFamily:'Anderson Grotesk',
    },
    country:{
        color:'#203152',
        fontSize:normalize(18),
        fontFamily:'Anderson Grotesk Bold',
    },
    optionCard:{
        paddingHorizontal:w*0.02,
        // height:w*0.1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        marginHorizontal:w*0.02
    },
    selectedOptionCard:{
        backgroundColor:'#203152',
        paddingHorizontal:w*0.02,
        height:h*0.06,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        marginHorizontal:w*0.02
    },
    optionText:{
        color:'black',
        fontSize:normalize(13),
        fontFamily:'Anderson Grotesk',
        width:w*0.25,
        flexWrap:'wrap',
        textAlign:'center'
    },
    optionsContainer:{
        marginTop:20
    },
    txt2:{
        color:'black',
        fontSize:normalize(14),
        fontFamily:'Anderson Grotesk',
    },
    txt3:{
        color:'#7C8698',
        fontSize:normalize(11),
        fontFamily:'Anderson Grotesk',
    },
    textContainer:{
        marginLeft:w*0.04,
        marginTop:w*0.04,
        width:w*0.8
    }
})