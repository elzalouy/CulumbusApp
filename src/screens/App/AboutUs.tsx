import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    Dimensions,
    ScrollView,

} from 'react-native';

import Header from '../../components/Header';
import { styles } from './Profile/styles';


const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

function AboutUs(props) {

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ alignItems: 'center' }}>
            <Header nav={props.navigation} />
            <Text style={styles.txt}>About</Text>
            <View style={{ marginTop: h * 0.07, paddingHorizontal:w*0.05 }}>
                <Text style={styles.description}>

                    Culumbus is a FREE full-service travel consultancy that can curate any request you have
                    in mind including the possibility to get on a rocket to space and orbit the earth. Well, you
                    get the picture, we basically do everything and tell you all information you need to build
                    the perfect trip and always stay safe for free unless you asked us to handle the whole
                    process with extra fees 5%
                    If you’ve been around for long traveling and exploring the world, by yourself, then you
                    would know that a good trip is all about planning. Here at Culumbus, you can plan your
                    trip professionally for free, we like to think of ourselves as the CEOs of planning, we did it
                    with a hundred and we did it for one. Yet we believe we are better at doing the following

                </Text>
            </View>

        </ScrollView>
    );
}



export default AboutUs;
