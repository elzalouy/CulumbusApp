import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import Header from '../../../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import {normalize} from '../../normalize';
import FastImage from 'react-native-fast-image';
import {styles} from './style';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {API_URL} from '@env';
let base_url = API_URL + '/files/images/';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
function AdrenalineEvents(props) {
  const [adrenalineCities, setCities] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState({});
  const [events, setEvents] = useState([]);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);

  if (props.adrenalineEvents.length !== events.length) {
    // console.log(events, 'events1');

    setEvents(props.adrenalineEvents);
  }
  if (props.adrenalineCities.length !== adrenalineCities.length) {
    console.log(props.adrenalineCities, 'cities1');

    setCities(props.adrenalineCities);
  }

  useEffect(() => {
    console.log('enteered');
    props.listAdrenalineCities();
    props.listAdrenalineEvents();
  }, []);
  const getEventsIncity = (city) => {
    const eventsInCity = [];
    events.forEach((event) => {
      if (event.city?._id === city) eventsInCity.push(event);
    });
    console.log(eventsInCity);
    props.navigation.navigate('AdrenalineCityEvents', {events: eventsInCity});
  };
  function Loader() {
    return (
      <TouchableOpacity style={{marginBottom: w * 0.03}} activeOpacity={0.8}>
        <SkeletonContent
          containerStyle={[styles.img, {position: 'absolute'}]}
          isLoading={true}
          boneColor="#EAEDF0"
          highlightColor="white"
          layout={[
            {key: '000', width: w * 0.9, height: w * 0.4, borderRadius: 15},
          ]}
        />

        <FastImage
          source={{uri: ''}}
          style={styles.img}
          resizeMode={FastImage.resizeMode.cover}>
          <View style={styles.textContainer}>
            <Text style={styles.txt2}></Text>
            <Text style={styles.txt3}></Text>
          </View>
        </FastImage>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Header nav={props.navigation} />

      {adrenalineCities.length == 0 ? (
        <>
          <Text style={styles.txt}>Cities</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setSearch(text)}
              value={search}
              placeholder="Search for city"
              // keyboardType="numeric"
            />
            {/* {search.length>0? */}
            <TouchableOpacity
              style={{
                width: w * 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name={'arrow-right-circle'}
                size={normalize(25)}
                color={'#203152'}
              />
            </TouchableOpacity>
            {/* :null} */}
          </View>
          {Loader()}
          {Loader()}
          {Loader()}
          {Loader()}
        </>
      ) : (
        //   null
        <FlatList
          showsVerticalScrollIndicator={false}
          extraData={adrenalineCities}
          data={adrenalineCities}
          style={{marginTop: w * 0.05, paddingBottom: w * 0.01, width: w * 0.9}}
          contentContainerStyle={{alignItems: 'center'}}
          keyExtractor={(item, index) => item.uuid}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
          onEndReachedThreshold={0.03}
          // onEndReached={({distanceFromEnd}) => loadMoreCities()}
          ListHeaderComponent={() => (
            <>
              <Text style={styles.txt}>Cities</Text>
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setSearch(text)}
                  value={search}
                  placeholder="Search for city"
                  // keyboardType="numeric"
                />
                {/* {search.length>0? */}
                <TouchableOpacity
                  style={{
                    width: w * 0.15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name={'arrow-right-circle'}
                    size={normalize(25)}
                    color={'#203152'}
                  />
                </TouchableOpacity>
                {/* :null} */}
              </View>
            </>
          )}
          // ListFooterComponent={() =>
          //   citiesLoaded || search.length > 0 ? null : (
          //     <ActivityIndicator
          //       size="small"
          //       color="silver"
          //       style={{marginBottom: h * 0.02}}
          //     />
          //   )
          // }
          renderItem={
            ({item, index}) => (
              // {cities.map((item,index)=>
              <TouchableOpacity
                style={{marginBottom: w * 0.03}}
                activeOpacity={0.8}
                onPress={() => getEventsIncity(item._id)}>
                <SkeletonContent
                  containerStyle={[styles.img, {position: 'absolute'}]}
                  isLoading={loading[index] ? false : true}
                  boneColor="#EAEDF0"
                  highlightColor="white"
                  layout={[
                    {
                      key: index,
                      width: w * 0.9,
                      height: w * 0.4,
                      borderRadius: 15,
                    },
                  ]}
                />

                <FastImage
                  source={{
                    uri: item.images?.length
                      ? `${base_url}${item.images[0]}.png`
                      : '',
                  }}
                  style={styles.img}
                  resizeMode={FastImage.resizeMode.cover}
                  // onLoad={imageLoaded[index]}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.txt2}>{item.name}</Text>
                    {/* <Text style={styles.txt3}>{item.country.name}</Text> */}
                  </View>
                </FastImage>
              </TouchableOpacity>
            )
            // )}
          }
        />
      )}
    </View>
  );
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
  offers: state.hotels.offers,
  adrenalineCities: state.venues.adrenalineCities,
  adrenalineEvents: state.venues.adrenalineEvents,
});

export default connect(mapStateToProps, actions)(AdrenalineEvents);
