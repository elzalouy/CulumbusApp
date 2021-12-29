import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import Header from '../../../components/Header';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import MapView, {PROVIDER_GOOGLE, Geojson} from 'react-native-maps';
import myPlace from '../../../assets/countries/world.geo.json';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {normalize} from '../../normalize';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

function Profile(props) {
  const [user, setUser] = useState({name: ''});
  const [latitude, setLatitude] = useState(30.033333);
  const [longitude, setLongitude] = useState(31.233334);
  const [visitedCountries, setVisitedCountries] = useState({
    type: 'FeatureCollection',
    features: [],
  });
  const [wishlistedCountries, setWishlistedCountries] = useState({
    type: 'FeatureCollection',
    features: [],
  });

  if (JSON.stringify(props.user) !== JSON.stringify(user)) {
    setUser(props.user);
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
      },
      (error) => console.log(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
    let newVisitedCountries = {...myPlace};
    let countries = [
      // 'egypt',
      // 'italy',
      // 'switzerland',
      // 'germany',
      // 'austria',
      // 'turkey',
    ];
    let features = [];
    let newWishlistedCountries = {...myPlace};
    let wishlistedCountries = [];
    let wishlistedFeatures = [];
    for (let i = 0; i < myPlace.features.length; i++) {
      if (
        countries.includes(myPlace.features[i].properties.name.toLowerCase())
      ) {
        features.push(myPlace.features[i]);
      }
      if (
        wishlistedCountries.includes(
          myPlace.features[i].properties.name.toLowerCase(),
        )
      ) {
        wishlistedFeatures.push(myPlace.features[i]);
      }
    }
    newVisitedCountries.features = features;
    newWishlistedCountries.features = wishlistedFeatures;
    setVisitedCountries(newVisitedCountries);
    setWishlistedCountries(newWishlistedCountries);

    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            // setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();
    return () => {};
  }, []);

  function getLocation() {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        // alert(position.coords.longitude)
        //getting the Longitude from the location json
        const currentLongitude = position.coords.longitude;

        //getting the Latitude from the location json
        const currentLatitude = position.coords.latitude;

        //Setting Longitude state
        setLongitude(currentLongitude);

        //Setting Longitude state
        setLatitude(currentLatitude);
      },
      (error) => {
        // setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      <Header nav={props.navigation} />
      <Text style={styles.txt}>Profile</Text>
      <View>
        <View style={styles.nameContainer}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 2, alignItems: 'center'}}>
            <Text style={styles.name}>{user.name}</Text>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.editContainer}
              onPress={() => props.navigation.navigate('EditProfile')}>
              <Text style={styles.editText}>Edit</Text>
              <Icon
                name="edit"
                style={{marginLeft: 5, marginBottom: 5}}
                size={normalize(10)}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <MapView
        // ref={ map => { this.map = map }}
        // onMapReady={this.onMapReady}

        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}
        minZoomLevel={0}
        maxZoomLevel={0}
        style={{
          width: w * 0.94,
          height: w * 0.6,
          borderRadius: 15,
          marginTop: h * 0.02,
        }}>
        {visitedCountries.features.length > 0 ? (
          <Geojson
            geojson={visitedCountries}
            strokeColor="#FF5355"
            fillColor="#FF5355"
            strokeWidth={2}
          />
        ) : null}
        {wishlistedCountries.features.length > 0 ? (
          <Geojson
            geojson={wishlistedCountries}
            strokeColor="#D87600"
            fillColor="#D87600"
            strokeWidth={2}
          />
        ) : null}
      </MapView>
{/* 
      <TouchableOpacity style={styles.button1} activeOpacity={1.0}>
        <Text style={styles.btnText}>Edit your countries</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity style={styles.button2} activeOpacity={1.0}>
        <Text style={styles.btnText}>Payment History</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={1.0}
        onPress={() => props.navigation.navigate('Log Out')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, actions)(Profile);
