import { StyleSheet, Dimensions } from 'react-native'
import { normalize } from '../../normalize'

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

export const styles=StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor:'white',
        alignItems:'center'
    },
    txt:{
        color:'#203152',
        fontSize:normalize(28),
        fontFamily:'Anderson Grotesk',
        textAlign:'center'
    },
    img:{
        width:w*0.9,
        height:w*0.4,
        borderRadius:15,
        
        justifyContent:'flex-end'
    },
    textContainer:{
        backgroundColor:'rgba(255,255,255,0.8)',
        width:w*0.55,
        marginBottom:w*0.02,
        padding:w*0.02,
        borderTopRightRadius:10,
        borderBottomRightRadius:10
    },
    txt2:{
        color:'#203152',
        fontSize:normalize(17),
        fontFamily:'Anderson Grotesk',
    },
    txt3:{
        color:'#7C8698',
        fontSize:normalize(11),
        fontFamily:'Anderson Grotesk',
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
    }

})