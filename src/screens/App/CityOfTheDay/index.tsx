import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

function CityOfTheDay(props) {
  const [events, setEvents] = useState([]);
  const [load, setLoad] = useState([false, false, false, false, false, false]);
  const [city, setCity] = useState({
    name: '',
    cover_image_url: '',
    country: {name: ''},
  });
  const [options, setOptions] = useState([
    'Activites',
    'Adrenaline',
    'Hotels',
    'Flights',
    'Shopping',
  ]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [mainLoaded, setmainLoaded] = useState(true);

  //   if (props.venues.length !== venues.length) {
  //     // Row changed since last render. Update isScrollingDown.
  //     setVenues(props.venues);
  //   }
  if (props.events.length !== events.length) {
    if(props.events.length){
    console.log( Object.keys(props.events[0]),' the events')
    console.log( props.events[0],' the events')

    }
    setEvents(props.events);
  }

  useEffect(() => {
    // setEvents([])
    // props.listEvents()
    setCity(props.route.params.city);
    props.listCityActivities(props.route.params.city.id);
    return () => {
      props.clearCityActivities();
    };
  }, []);

  function imageLoaded(index) {
    let x = load;
    x[index] = true;
    setLoad(x);
  }

  return (
    <View style={styles.container}>
      <Header nav={props.navigation} />
      <Text style={styles.txt}>
        {city.name}, {city.country.name}
      </Text>

      <ScrollView
        style={styles.subContainer}
        contentContainerStyle={{paddingBottom: w * 0.05}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.img}>
          {mainLoaded ? (
            <SkeletonContent
              containerStyle={[styles.img, {position: 'absolute'}]}
              isLoading={props.loading ? false : true}
              boneColor="#EAEDF0"
              highlightColor="white"
              layout={[
                {key: '4', width: w * 0.9, height: w * 0.5, borderRadius: 10},
              ]}
            />
          ) : null}
          <FastImage
            source={{uri: city.cover_image_url}}
            style={styles.img}
            resizeMode={FastImage.resizeMode.cover}
            onLoad={() => setmainLoaded(false)}
          />
        </View>
        {/* <ScrollView
          style={styles.optionsContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {options.map((item, index) => (
            <TouchableOpacity
              style={
                selectedOption !== index
                  ? styles.optionCard
                  : styles.selectedOptionCard
              }
              onPress={() => setSelectedOption(index)}
              activeOpacity={1.0}>
              <Text
                style={
                  selectedOption !== index
                    ? styles.optionText
                    : styles.selectedOptionText
                }>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView> */}

        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.txt2}>Let us inspire you</Text>
            {/* <TouchableOpacity>
              <Text style={styles.txt3}>View More</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.header2}>
            <Card
              event={events[0]}
              nav={props.navigation}
              loading={load[0]}
              onload={() => imageLoaded(0)}
            />

            <Card
              event={events[1]}
              nav={props.navigation}
              loading={load[1]}
              onload={() => imageLoaded(1)}
              right={true}
            />
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.txt2}>Popular active experiences</Text>
            {/* <TouchableOpacity>
              <Text style={styles.txt3}>View More</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.header2}>
            <Card
              event={events[2]}
              nav={props.navigation}
              loading={load[2]}
              onload={() => imageLoaded(2)}
            />

            <Card
              event={events[3]}
              nav={props.navigation}
              loading={load[3]}
              onload={() => imageLoaded(3)}
              right={true}
            />
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.txt2}>Around your City</Text>
            {/* <TouchableOpacity>
              <Text style={styles.txt3}>View More</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.header2}>
            <Card
              event={events[4]}
              nav={props.navigation}
              loading={load[4]}
              onload={() => imageLoaded(4)}
            />

            <Card
              event={events[5]}
              nav={props.navigation}
              loading={load[5]}
              onload={() => imageLoaded(5)}
              right={true}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => ({
  venues: state.venues.venues,
  events: state.venues.events,
});

export default connect(mapStateToProps, actions)(CityOfTheDay);
