import React, {useState, useEffect} from 'react';
import {normalize} from '../normalize';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Header from '../../components/Header';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Entypo';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {API_URL} from '@env';
let base_url = API_URL + '/files/images/';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

function EventDetails(props) {
  const [event, setEvent] = useState({
    title: '',
    meeting_point: '',
    city: {name: '', country: {name: ''}},
    cover_image_url: '',
    description: '',
    about: '',
    longitude: '',
    latitude: '',
    images: [],
  });
  const [imgUrl, setImgUrl] = useState('');

  // console.log('authLink')

  useEffect(() => {
    var x;
    if(event){
      if( event.cover_image_url)
        x =  event.cover_image_url
      if(event.images?.length)
        x=`${base_url}${event.images[0]}.png`
    }
    setImgUrl(x);
  }, [event]);
  //   if (props.venues.length !== venues.length) {
  //     // Row changed since last render. Update isScrollingDown.
  //     setVenues(props.venues);
  //   }

  useEffect(() => {
    // console.log(props.route.params.event.longitude+" "+props.route.params.event.latitude);
    setEvent(props.route.params.event);
  }, []);

  function reserve() {
    let cartID = '774c6a87-6778-44ad-89d3-80d93f099e00';
    let data = {
      type: 'musement',
      product_identifier: '249217479',
      quantity: 2,
      // "language": "it",
      //  "pickup" : "5ee32dbd-898d-4f2e-aa9b-bb430b9a4960"
    };
  }

  function handleGetDirections() {
    let data = {
      destination: {
        latitude: event.longitude,
        longitude: event.latitude,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving',
        },
        {
          key: 'dir_action',
          value: 'navigate',
        },
      ],
    };
    getDirections(data);
  }

  return (
    <View style={styles.container}>
      <Header nav={props.navigation} />
      <Text style={styles.txt}>{event.title}</Text>

      <ScrollView
        style={styles.subContainer}
        contentContainerStyle={{paddingBottom: w * 0.05}}
        showsVerticalScrollIndicator={false}>
        <FastImage
          source={{uri: imgUrl}}
          style={styles.img}
          resizeMode={FastImage.resizeMode.cover}
          onLoad={props.onload}
        />

        <View style={{flexDirection: 'row', marginTop: w * 0.03}}>
          {/* <Icon  name={'location'} size={normalize(15)} color={'#203152'} /> */}
          <Text style={styles.location}>
            {event.city.name}{' '}
            {event.city.country ? `/ ${event.city.country.name}` : null}
          </Text>
        </View>
        <Text style={styles.description}>{event.about}</Text>
        <Text style={[styles.description, {marginTop: w * 0.05}]}>
          {event.description}
        </Text>

        {event.latitude ? (
          <View
            style={{
              width: w * 0.9,
              paddingVertical: w * 0.03,
              marginTop: w * 0.1,
            }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{width: w * 0.9, height: w * 0.35}}
              region={{
                latitude: event.longitude,
                longitude: event.latitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
              }}>
              {/* <MapView.Marker
      coordinate={{
        latitude: event.longitude,
        longitude: event.latitude}}
    //   title={this.state.name}
    //   description={marker.description}
    /> */}
            </MapView>
            <Icon1
              name={'directions'}
              color="#2767AD"
              style={{position: 'absolute', top: w * 0.04, left: w * 0.01}}
              size={normalize(40)}
              onPress={() => handleGetDirections()}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() =>
            props.navigation.navigate('Reservation', {event: event})
          }>
          <Text style={styles.txt4}>Reserve</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  txt: {
    color: '#203152',
    fontSize: normalize(15),
    fontFamily: 'Anderson Grotesk',
    width: w * 0.7,
    textAlign: 'center',
  },
  subContainer: {
    width: w * 0.9,
    marginTop: w * 0.02,
  },
  img: {
    width: w * 0.9,
    height: w * 0.5,
    borderRadius: 10,
    // borderTopRightRadius:30,
    overflow: 'hidden',
  },
  location: {
    color: '#203152',
    fontSize: normalize(11),
    // fontFamily:'Anderson Grotesk Light Oblique',
  },
  description: {
    color: 'black',
    fontSize: normalize(13),
    fontFamily: 'Anderson Grotesk',
    marginTop: w * 0.03,
    // textAlign:'justify'
  },
  loginButton: {
    width: w * 0.8,
    backgroundColor: '#203152',
    paddingVertical: w * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: w * 0.05,
  },
  txt4: {
    color: 'white',
    fontSize: normalize(14),
    fontFamily: 'Anderson Grotesk',
  },
});
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, actions)(EventDetails);
