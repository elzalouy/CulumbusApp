import React, { useState, useEffect } from 'react';
import { normalize } from '../../normalize'
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, FlatList, TextInput, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import Header from '../../../components/Header';
import FastImage from 'react-native-fast-image';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { styles } from './styles';
import { API_URL } from "@env"

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

function Cities(props) {
  // const loader={id:'1111',cover_image_url:'',name:'',country:{name:''}}
  const [loading, setLoading] = useState({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(20);
  const [citiesLoaded, setCitiesLoaded] = useState(false);
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
  const [offers, setOffers] = useState([]);
  const [searchedOffers, setSearchedOffers] = useState([]);
  const [offersCopy, setOffersCopy] = useState([]);

  if (props.offers !== offers) {
    setOffers(props.offers)
    setOffersCopy(props.offers);

  };

  useEffect(() => {
    // props.listHotelOffers();
  }, [])

  // function loadMoreCities(){
  //     if(!onEndReachedCalledDuringMomentum){
  //     props.listCities(page)
  //     setPage(page+20)
  //     setOnEndReachedCalledDuringMomentum(true);
  //     }

  // }


  function imageLoaded(index) {
    let x = loading
    x[index] = true
    setLoading(x)
  }

  function searching(txt) {
    let newArray = []
    for (let i = 0; i < offers.length; i++) {
      if (offers[i].name.includes(txt))
        newArray.push(offers[i])
    }
    setSearch(txt)
    setSearchedOffers(newArray)
  }
  function filterOffers() {
    var tmp = offers.filter(hotel => hotel.name.toLowerCase().includes(search.toLowerCase()))
    setOffersCopy(tmp)
    //console.log(tmp,'search')
  }
  function Loader() {
    return (
      <TouchableOpacity style={{ marginBottom: w * 0.03, }} activeOpacity={0.8} >

        <SkeletonContent
          containerStyle={[styles.img, { position: 'absolute' }]}
          isLoading={true}
          boneColor="#EAEDF0"
          highlightColor="white"
          layout={[
            {
              key: '000', width: w * 0.9,
              height: w * 0.4, borderRadius: 15
            },
          ]}
        />

        <FastImage source={{ uri: '' }} style={styles.img} resizeMode={FastImage.resizeMode.cover}>
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
      <Header nav={props.navigation} />


      {offersCopy.length == 0 ?
        <>
          <Text style={styles.txt}>Hotel Offers</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => searching(text)}
              value={search}
              placeholder="Search for offer"
            // keyboardType="numeric"
            />
            {/* {search.length>0? */}
            <TouchableOpacity style={{ width: w * 0.15, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name={'arrow-right-circle'} size={normalize(25)} color={'#203152'} />
            </TouchableOpacity>
            {/* :null} */}
          </View>
          {Loader()}
          {Loader()}
          {Loader()}
          {Loader()}
        </>
        //   null
        :
        <>
          <>

            <Text style={styles.txt}>Hotel Offers</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setSearch(text)}
                value={search}
                placeholder="Search for offer"
              // keyboardType="numeric"
              />
              {/* {search.length>0? */}
              <TouchableOpacity style={{ width: w * 0.15, justifyContent: 'center', alignItems: 'center' }} onPress={()=>filterOffers()}>
                <Icon name={'arrow-right-circle'} size={normalize(25)} color={'#203152'} />
              </TouchableOpacity>
              {/* :null} */}
            </View>
          </>
          <FlatList
            showsVerticalScrollIndicator={false}
            extraData={offersCopy}
            data={offersCopy}
            style={{ marginTop: w * 0.05, paddingBottom: w * 0.01, width: w * 0.9, }}
            contentContainerStyle={{ alignItems: 'center' }}
            keyExtractor={(item, index) => item.id}
            // onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
            // onEndReachedThreshold={0.03}
            // onEndReached={({distanceFromEnd}) => 
            //     loadMoreCities()
            // }
            // ListHeaderComponent={() =>
            //   <>

            //     <Text style={styles.txt}>Hotel Offers</Text>
            //     <View style={styles.row}>
            //       <TextInput
            //         style={styles.input}
            //         onChangeText={(text) => searching(text)}
            //         value={search}
            //         placeholder="Search for offer"
            //       // keyboardType="numeric"
            //       />
            //       {/* {search.length>0? */}
            //       <TouchableOpacity style={{ width: w * 0.15, justifyContent: 'center', alignItems: 'center' }}>
            //         <Icon name={'arrow-right-circle'} size={normalize(25)} color={'#203152'} />
            //       </TouchableOpacity>
            //       {/* :null} */}
            //     </View>
            //   </>
            // }
            // ListFooterComponent={() => citiesLoaded ||search.length>0?null :<ActivityIndicator size="small" color="silver" style={{marginBottom:h*0.02}}/>}

            renderItem={({ item, index }) =>
              <TouchableOpacity style={{ marginBottom: w * 0.03, }} activeOpacity={0.8}
                onPress={() => props.navigation.navigate('HotelOffers', { offer: item })
                }
              //onPress={()=>item.name?props.route.params.index==1?props.navigation.navigate('Adrenaline',{city:item}):props.navigation.navigate('CityOfTheDay',{city:item}):null}
              >

                {/* <SkeletonContent
                        containerStyle={[styles.img,{position:'absolute'}]}
                        isLoading={loading[index]?false:true}
                        boneColor="#EAEDF0"
                        highlightColor="white"
                          layout={[
                            { key: index,width:w*0.9,
                            height:w*0.4, borderRadius:15 },
                           ]}
                        /> */}
                {item?.images?.length ?
                  <FastImage source={{ uri: API_URL + "/files/images/" + item.images[0] + ".png" }} style={styles.img} resizeMode={FastImage.resizeMode.cover}
                    onLoad={imageLoaded[index]}>
                    <View style={styles.textContainer}>
                      <Text style={styles.txt2} numberOfLines={1}>{item.name}</Text>
                      <Text style={styles.txt3} numberOfLines={2}>{item.description}</Text>
                    </View>
                  </FastImage>
                  :
                  null
                }
              </TouchableOpacity>
              // )}
            } />
        </>
      }

    </View>

  );
}



const mapStateToProps = state => ({
  cities: state.venues.cities,
  offers: state.hotels.offers,

})

export default connect(mapStateToProps, actions)(Cities);