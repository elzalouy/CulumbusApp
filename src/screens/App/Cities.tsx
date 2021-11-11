import React, { useState, useCallback, useEffect } from 'react';
import { normalize } from '../normalize'
import { connect} from 'react-redux';
import * as actions from '../../actions';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, FlatList, TextInput, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import Header from '../../components/Header';
import FastImage from 'react-native-fast-image';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

function Cities(props) {
    // const loader={id:'1111',cover_image_url:'',name:'',country:{name:''}}
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState({});
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(20);
    const [citiesLoaded, setCitiesLoaded] = useState(false);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);

    if (props.cities.length !== cities.length){
        setCities(props.cities)
    };

    useEffect(() => {
        props.listCities(0)
    }, [])

    function loadMoreCities(){
        if(!onEndReachedCalledDuringMomentum){
        props.listCities(page)
        setPage(page+20)
        setOnEndReachedCalledDuringMomentum(true);
        }
       
    }
  
  
    function imageLoaded(index){
        let x=loading
        x[index]=true
        setLoading(x)
      }

      function Loader(){
        return(
            <TouchableOpacity style={{marginBottom:w*0.03,}} activeOpacity={0.8} >
                    
            <SkeletonContent
            containerStyle={[styles.img,{position:'absolute'}]}
            isLoading={true}
            boneColor="#EAEDF0"
            highlightColor="white"
              layout={[
                { key: '000',width:w*0.9,
                height:w*0.4, borderRadius:15 },
               ]}
            />
    
    <FastImage source={{uri:''}} style={styles.img} resizeMode={FastImage.resizeMode.cover}>
        <View style={styles.textContainer}>
        <Text style={styles.txt2}></Text>
        <Text style={styles.txt3}></Text>
        </View>
    </FastImage>
    </TouchableOpacity>
        )
      }

  return (
      <View style={styles.container}>      
                <Header nav={props.navigation}/>


      {cities.length==0?
      <>
        <Text style={styles.txt}>Cities</Text>
        <View style={styles.row}>
      <TextInput
        style={styles.input}
        onChangeText={(text)=>setSearch(text)}
        value={search}
        placeholder="Search for city"
        // keyboardType="numeric"
      />
      {/* {search.length>0? */}
      <TouchableOpacity style={{width:w*0.15,justifyContent:'center',alignItems:'center'}}>
        <Icon  name={'arrow-right-circle'} size={normalize(25)} color={'#203152'} />
        </TouchableOpacity>
        {/* :null} */}
      </View>
     { Loader()}
     { Loader()}
     { Loader()}
     { Loader()}
      </>
    //   null
      :
       <FlatList 
                showsVerticalScrollIndicator={false}
                extraData={cities}
                data={cities}
                style={{marginTop:w*0.05,paddingBottom:w*0.01,width:w*0.9,}}
                contentContainerStyle={{alignItems:'center'}}
                keyExtractor={(item, index) => item.uuid }
                onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
                onEndReachedThreshold={0.03}
                onEndReached={({distanceFromEnd}) => 
                    loadMoreCities()
                }
                ListHeaderComponent={()=>
            <>
                    
        <Text style={styles.txt}>Cities</Text>
        <View style={styles.row}>
      <TextInput
        style={styles.input}
        onChangeText={(text)=>setSearch(text)}
        value={search}
        placeholder="Search for city"
        // keyboardType="numeric"
      />
      {/* {search.length>0? */}
      <TouchableOpacity style={{width:w*0.15,justifyContent:'center',alignItems:'center'}}>
        <Icon  name={'arrow-right-circle'} size={normalize(25)} color={'#203152'} />
        </TouchableOpacity>
        {/* :null} */}
      </View>
                    </>
                }
                ListFooterComponent={() => citiesLoaded ||search.length>0?null :<ActivityIndicator size="small" color="silver" style={{marginBottom:h*0.02}}/>}

                renderItem={({ item, index }) =>  
                // {cities.map((item,index)=>
                <TouchableOpacity style={{marginBottom:w*0.03,}} activeOpacity={0.8} onPress={()=>item.name?props.route.params.index==1?props.navigation.navigate('Adrenaline',{city:item}):props.navigation.navigate('CityOfTheDay',{city:item}):null}>
                    
                        <SkeletonContent
                        containerStyle={[styles.img,{position:'absolute'}]}
                        isLoading={loading[index]?false:true}
                        boneColor="#EAEDF0"
                        highlightColor="white"
                          layout={[
                            { key: index,width:w*0.9,
                            height:w*0.4, borderRadius:15 },
                           ]}
                        />
                
                <FastImage source={{uri:item.cover_image_url}} style={styles.img} resizeMode={FastImage.resizeMode.cover}
                onLoad={imageLoaded[index]}>
                    <View style={styles.textContainer}>
                    <Text style={styles.txt2}>{item.name}</Text>
                    <Text style={styles.txt3}>{item.country.name}</Text>
                    </View>
                </FastImage>
                </TouchableOpacity>
                // )}
   }/> 
}

      </View>

  );
}

const styles=StyleSheet.create({
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
        width:w*0.45,
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

const mapStateToProps = state => ({
    cities:state.venues.cities,
})

export default connect(mapStateToProps, actions)(Cities);