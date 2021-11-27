import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import Header from '../../../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import {normalize} from '../../normalize';
import FastImage from 'react-native-fast-image';
import {styles} from './style';
import Card from '../../../components/Card';

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

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
function cityEvents(props) {
  const [adrenalineCities, setCities] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState({});
  const [events, setEvents] = useState([]);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  console.log(props.route.params.events);
  return (
    <View style={styles.container}>
      <Header nav={props.navigation} />
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        extraData={props.route.params.events}
        data={props.route.params.events}
        style={{marginTop: w * 0.05, paddingBottom: w * 0.01, width: w * 0.9}}
        contentContainerStyle={{alignItems: 'center'}}
        keyExtractor={(item, index) => item.uuid}
        onMomentumScrollBegin={() => {
          setOnEndReachedCalledDuringMomentum(false);
        }}
        onEndReachedThreshold={0.03}
        // onEndReached={({distanceFromEnd}) => loadMoreCities()}
        // ListHeaderComponent={() => (
        //   <>
        //     <Text style={styles.txt}>Cities</Text>
        //     <View style={styles.row}>
        //       <TextInput
        //         style={styles.input}
        //         onChangeText={(text) => setSearch(text)}
        //         value={search}
        //         placeholder="Search for city"
        //         // keyboardType="numeric"
        //       />
        //       {/* {search.length>0? */}
        //       <TouchableOpacity
        //         style={{
        //           width: w * 0.15,
        //           justifyContent: 'center',
        //           alignItems: 'center',
        //         }}>
        //         <Icon
        //           name={'arrow-right-circle'}
        //           size={normalize(25)}
        //           color={'#203152'}
        //         />
        //       </TouchableOpacity>
        //       {/* :null} */}
        //     </View>
        //   </>
        // )}

        renderItem={
          ({item, index}) => (
            // {cities.map((item,index)=>
            <TouchableOpacity
              style={{marginBottom: w * 0.03, marginRight: w * 0.03}}
              activeOpacity={0.8}
              //   onPress={() => getEventsIncity(item._id)}
            >
              <Card
                event={item}
                nav={props.navigation}
                loading={false}
                //   onload={() => imageLoaded(1)}
                right={true}
              />
            </TouchableOpacity>
          )
          // )}
        }
      />
    </View>
  );
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
  offers: state.hotels.offers,
  adrenalineCities: state.venues.adrenalineCities,
  adrenalineEvents: state.venues.adrenalineEvents,
});

export default connect(mapStateToProps, actions)(cityEvents);
