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
    img:{
        width:w*0.84,
        height:w*0.45,
        borderRadius:10,
        alignSelf:'center'
    },
    txt:{
        color:'#203152',
        fontSize:normalize(28),
        fontFamily:'Anderson Grotesk',
        textAlign:'center'
    },
    description:{
        color:'black',
        fontSize:normalize(13),
        fontFamily:'Anderson Grotesk',
        marginTop:w*0.03,
        width:w*0.9,
        textAlign:'justify'
    },
  
})