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

logo:{
    width:w*0.27,
    height:w*0.15
},
header2:{
    flexDirection:'row',
    width:w*0.9,
    alignItems:'center',
    justifyContent:'space-between',
    // marginTop:w*0.03
},
subContainer:{
    width:w*0.9,
    marginTop:w*0.02,
    

},
cardContainer:{
marginTop:w*0.08
},
card:{
    // backgroundColor:'silver',
    width:w*0.435,
    height:w*0.35,
    borderRadius:15,
    justifyContent:'flex-end',
    overflow:'hidden'
},
cardHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:w*0.9,
    alignItems:'center',
    marginBottom:w*0.02
},
txt2:{
    color:'black',
    fontSize:normalize(18),
    fontFamily:'Anderson Grotesk',
},
txt3:{
    color:'black',
    fontSize:normalize(13),
    fontFamily:'Anderson Grotesk',
    textDecorationLine:'underline'
},
cardTitle:{
  backgroundColor:'white',
  opacity:0.8,
  width:w*0.35,
  marginBottom:w*0.02,
  borderBottomRightRadius:10,
  borderTopRightRadius:10,
  paddingVertical:w*0.02,
  alignItems:'center'
},
cardText:{
  color:'#203152',
  fontSize:normalize(8),
  fontFamily:'Anderson Grotesk',
  width:w*0.32
},
priceContainer:{
  backgroundColor:'#203152',
  padding:w*0.02,
  position:'absolute',
  top:w*0.02,
  right:w*0.02,
  borderRadius:15,
  justifyContent:'center',
  alignItems:'center'
},
price:{
  color:'white',
  fontSize:normalize(12),
  fontFamily:'Anderson Grotesk',
},
img:{
    width:w*0.9,
    height:w*0.5,
    borderRadius:10,
    // borderTopRightRadius:30,
    overflow:'hidden'
},
location:{
    color:'#203152',
    fontSize:normalize(11),
    // fontFamily:'Anderson Grotesk Light Oblique',
},
txt:{
    color:'#203152',
    fontSize:normalize(17),
    fontFamily:'Anderson Grotesk',
    width:w*0.8,
    textAlign:'center'
},
optionCard:{
    paddingHorizontal:w*0.02,
    paddingVertical:w*0.02,
    borderWidth:1.5,
    borderRadius:10,
    borderColor:'#203152',
    marginLeft:w*0.03
},
selectedOptionCard:{
    paddingHorizontal:w*0.02,
    paddingVertical:w*0.02,
    borderWidth:1.5,
    borderRadius:10,
    borderColor:'#203152',
    marginLeft:w*0.03,
    backgroundColor:'#203152'
},
optionsContainer:{
    marginTop:w*0.05,
    width:w
},
optionText:{
    // color:'#203152',
    fontSize:normalize(13),
    fontFamily:'Anderson Grotesk',
},
selectedOptionText:{
     color:'white',
     fontSize:normalize(13),
     fontFamily:'Anderson Grotesk',
}

})