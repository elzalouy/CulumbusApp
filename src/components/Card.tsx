import React, {useEffect, useState} from 'react';
import {normalize} from '../screens/normalize';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import FastImage from 'react-native-fast-image';
import {API_URL} from '@env';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
let base_url = API_URL + '/files/images/';

function Card(props) {
  const [imgUrl, setImgUrl] = useState('');

  // console.log('authLink')

  useEffect(() => {
    var x =
      props.event.cover_image_url || props.event.images?.length
        ? `${base_url}${props.event.images[0]}.png`
        : null;
    console.log(x);
    setImgUrl(x);
  }, []);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => props.nav.navigate('EventDetails', {event: props.event})}>
      <SkeletonContent
        containerStyle={[styles.card, {position: 'absolute'}]}
        isLoading={props.loading ? false : true}
        boneColor="#EAEDF0"
        highlightColor="white"
        layout={[
          {key: '4', width: w * 0.435, height: w * 0.35, borderRadius: 15},
        ]}
      />
      {props.event ? (
        <ImageBackground
          source={{uri: imgUrl}}
          style={styles.card}
          resizeMode={FastImage.resizeMode.cover}
          onLoad={props.onload}>
          <View style={styles.cardTitle}>
            <Text style={styles.cardText} numberOfLines={2}>
              {props.event ? props.event.title : null}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {props.event.retail_price
                ? props.event.retail_price.value
                : props.event.price}
              $
            </Text>
          </View>
        </ImageBackground>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor:'silver',
    width: w * 0.435,
    height: w * 0.35,
    borderRadius: 15,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  cardTitle: {
    backgroundColor: 'white',
    opacity: 0.8,
    width: w * 0.35,
    marginBottom: w * 0.02,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: w * 0.02,
    alignItems: 'center',
  },
  cardText: {
    color: '#203152',
    fontSize: normalize(8),
    fontFamily: 'Anderson Grotesk',
    width: w * 0.32,
  },
  priceContainer: {
    backgroundColor: '#203152',
    paddingVertical: w * 0.02,
    paddingHorizontal: w * 0.03,
    position: 'absolute',
    top: w * 0.02,
    right: w * 0.02,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    color: 'white',
    fontSize: normalize(12),
    fontFamily: 'Anderson Grotesk',
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, actions)(Card);
