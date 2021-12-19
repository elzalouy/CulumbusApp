import React, { useState, useEffect } from 'react';
import { normalize } from '../normalize';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  ImageBackground,
  ScrollView,
} from 'react-native';
import More from '../../components/More';
// import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Swiper from 'react-native-swiper';

import { API_URL } from '@env';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
function Home(props) {
  const [offers, setOffers] = useState([]);

  if (props.offers !== offers) {
    console.log(props.offers, offers.length)
    setOffers(props.offers);
  }

  useEffect(() => {
    props.listHotelOffers();
    // navigation.goBack()
  }, []);

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
                    <View style={styles.subHeader}>
                   
                        <Image source={{uri: 'logo'}} resizeMode="contain" style={styles.logo}/>

                    </View>    
        </View> */}
      <View style={styles.header3}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }} />

          <View style={{ flex: 2, alignItems: 'center' }}>
            <Image
              source={{ uri: 'logo' }}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          {/* <View style={{flex:1,alignItems:'center'}}> */}
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: w * 0.02,
              paddingHorizontal: w * 0.01,
            }}
            onPress={() => props.navigation.openDrawer()}>
            <More />
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>

      <ScrollView
        style={styles.subContainer}
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('CountryRestrictions')}>
          <ImageBackground
            source={{ uri: 'home5' }}
            resizeMode="cover"
            style={styles.card2}>
            <View style={styles.textContainer}>
              <Text style={styles.txt2}>COUNTRY RESTRICTIONS TABLE</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        {/* <View style={styles.header2}>
            <ImageBackground source={{uri: 'home4'}} resizeMode="cover" style={styles.card}>
            <Text style={styles.txt4}>AIRLINE PCR{'\n'}Table</Text>

              </ImageBackground>

      
          <ImageBackground source={{uri: 'home5'}} resizeMode="cover" style={styles.card}>
            <Text style={styles.txt4}>COUNTRY{'\n'}RESTRICTIONS TABLE</Text>

              </ImageBackground>
            </View> */}
        <View style={[styles.card3, { marginTop: w * 0.03 }]}>
          <Swiper
            style={styles.wrapper}
            key={'1'}
            // onIndexChanged={(x)=>{let y=this.state.indexes;y[index]=x;this.setState({indexes:y})}}
            // containerStyle={{backgroundColor:'silver'}}
            loop={true}
            dot={
              <View
                style={{
                  backgroundColor: 'transparent',
                  // opacity:0.55,
                  width: 13,
                  height: 13,
                  borderRadius: 6.5,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: w * 0.1,
                  borderColor: 'white',
                  borderWidth: 1,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: 'white',
                  width: 13,
                  height: 13,
                  borderRadius: 6.5,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: w * 0.1,
                }}
              />
            }>
            {(offers.length > 3
              ? [
                { name: 'Hotel offers', description: 'Latest hotel offers' },
              ].concat(offers.slice(0, 3))
              : [
                { name: 'Hotel offers', description: 'Latest hotel offers' },
              ].concat(offers)
            ).map((item, index) => (
              <TouchableOpacity
                style={{ width: w * 0.94, alignItems: 'center' }}
                key={'1' + index}
                activeOpacity={1.0}
                onPress={() =>
                  index == 0
                    ? props.navigation.navigate('AllHotelOffers')
                    : props.navigation.navigate('HotelOffers', { offer: item })
                }>
                <ImageBackground
                  source={{
                    uri: item.images
                      ? API_URL + '/files/images/' + item.images[0] + '.png'
                      : 'home5',
                  }}
                  resizeMode="cover"
                  style={styles.card2}>
                  <View style={styles.textContainer}>
                    <Text style={styles.txt2} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.txt3} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        <View style={styles.card3}>
          <Swiper
            style={styles.wrapper}
            // onIndexChanged={(x)=>{let y=this.state.indexes;y[index]=x;this.setState({indexes:y})}}
            // containerStyle={{backgroundColor:'silver'}}
            loop={true}
            dot={
              <View
                style={{
                  backgroundColor: 'transparent',
                  // opacity:0.55,
                  width: 13,
                  height: 13,
                  borderRadius: 6.5,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: w * 0.1,
                  borderColor: 'white',
                  borderWidth: 1,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: 'white',
                  width: 13,
                  height: 13,
                  borderRadius: 6.5,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: w * 0.1,
                }}
              />
            }>
            {['x', 'x', 'x'].map((item) => (
              <TouchableOpacity
                style={{ width: w * 0.94, alignItems: 'center' }}
                onPress={() => props.navigation.navigate('Cities', { index: 0 })}
                activeOpacity={1.0}>
                <ImageBackground
                  source={{ uri: 'home4' }}
                  resizeMode="cover"
                  style={styles.card2}>
                  <View style={styles.textContainer}>
                    <Text style={styles.txt2}>City Of The Day</Text>
                    <Text style={styles.txt3}>Explore Peru</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        {/* <View style={styles.card3}>
          <Swiper
            style={styles.wrapper}
            // onIndexChanged={(x)=>{let y=this.state.indexes;y[index]=x;this.setState({indexes:y})}}
            // containerStyle={{backgroundColor:'silver'}}
            loop={true}
            dot={
              <View
                style={{
                  backgroundColor: 'transparent',
                  // opacity:0.55,
                  width: 13,
                  height: 13,
                  borderRadius: 6.5,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: w * 0.1,
                  borderColor: 'white',
                  borderWidth: 1,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: 'white',
                  width: 13,
                  height: 13,
                  borderRadius: 6.5,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: w * 0.1,
                }}
              />
            }>
            {Array.from(Array(3).keys()).map((item) => (
              <TouchableOpacity
                style={{width: w * 0.94, alignItems: 'center'}}
                onPress={() => props.navigation.navigate('AdrenalineEvents')}
                activeOpacity={1.0}>
                <ImageBackground
                  source={{uri: 'home3'}}
                  resizeMode="cover"
                  style={styles.card2}>
                  <View style={styles.textContainer}>
                    <Text style={styles.txt2}>Adrenaline</Text>
                    <Text style={styles.txt3}>
                      Mountain biking at Mt Toubkal
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View> */}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: w,
    height: h,
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'white',
    height: w * 0.25,
    width: w,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  subHeader: {
    flexDirection: 'row',
    marginTop: w * 0.15,
    justifyContent: 'center',
    width: w,
  },
  logo: {
    width: w * 0.27,
    height: w * 0.15,
  },
  txt: {
    color: '#203152',
    fontSize: normalize(28),
    fontFamily: 'Anderson Grotesk',
  },
  header2: {
    flexDirection: 'row',
    width: w * 0.9,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: w * 0.3,
  },
  header3: {
    width: w * 0.9,
    justifyContent: 'flex-end',
    height: w * 0.25,
    marginBottom: w * 0.05,
  },
  subContainer: {
    width: w * 0.9,
    marginTop: w * 0.02,
  },
  card: {
    backgroundColor: 'silver',
    width: w * 0.435,
    height: w * 0.3,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  card2: {
    backgroundColor: 'silver',
    width: w * 0.9,
    height: w * 0.36,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  card3: {
    // backgroundColor:'silver',
    width: w * 0.94,
    height: w * 0.4,
    overflow: 'hidden',
    borderRadius: 15,
    // marginTop:w*0.03,
  },
  wrapper: {
    // height:w*0.36,
    // marginTop:w*0.5,
    // backgroundColor:'red'
  },
  textContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: w * 0.65,
    marginBottom: w * 0.06,
    padding: w * 0.02,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  txt2: {
    color: '#203152',
    fontSize: normalize(17),
    fontFamily: 'Anderson Grotesk',
  },
  txt3: {
    color: '#7C8698',
    fontSize: normalize(11),
    fontFamily: 'Anderson Grotesk',
  },
  txt4: {
    color: 'white',
    fontSize: normalize(12),
    fontFamily: 'Anderson Grotesk',
    textAlign: 'center',
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
});
const mapStateToProps = (state) => ({
  token: state.auth.token,
  offers: state.hotels.offers,
});

export default connect(mapStateToProps, actions)(Home);
