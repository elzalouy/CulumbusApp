import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import Header from '../../../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import { normalize } from '../../normalize'
import Carousel from 'react-native-snap-carousel';

import { styles } from './styles';
import { API_URL } from "@env"

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height)

function HotelOffers(props) {
  const [offer, setOffer] = useState({ images: [], name: '', description: '' });

  useEffect(() => {
    console.log(props.route.params.offer)
    props.setAskOffer(props.route.params.offer, true)
    setOffer(props.route.params.offer)
    return () => {
      props.setAskOffer({}, false)
    }
  }, [])

  function _renderItem({ item, index }) {
    return (
      <Image source={{ uri: API_URL + "/files/images/" + item + ".png" }} style={styles.img} resizeMode={'cover'} />
    );
  }
  return (
    <View style={styles.container}>
      <Header nav={props.navigation} />
      <Text style={styles.txt}>{offer.name}</Text>
      <View style={{ height: w * 0.48, marginTop: w * 0.02 }}>
        <Carousel
          //   ref={(c) => { this._carousel = c; }}
          data={offer.images}
          renderItem={(item) => _renderItem(item)}
          sliderWidth={w}
          itemWidth={w * 0.88}
          inactiveSlideOpacity={0.5}
          inactiveSlideScale={1}
          //   layout={'default'}
          loop={true}
        />

      </View>

      <Text style={styles.description}>{offer.description}</Text>
    </View>
  )
}
const mapStateToProps = state => ({
  restrictions: state.restrictions.restrictions,
  restrictionsLoading: state.restrictions.restrictionsLoading,

})

export default connect(mapStateToProps, actions)(HotelOffers);