import React, { useState, useEffect } from 'react';
import { connect} from 'react-redux';
import * as actions from '../../../actions';
import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, FlatList,ActivityIndicator } from 'react-native'
import Header from '../../../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import { normalize } from '../../normalize'

import { styles } from './styles';
import Flag from 'react-native-ico-flags';

const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height)

function CountryRestrictions(props) {
  const [restrictions, setRestrictions] = useState([]);
  const [searched, setSearched] = useState([]);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState(['PCR','Vaccination','Doses','Shopping','Bars &\nRestaurants', 'Touristic\nplaces', 'Public\ntransport','Visa']);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  

  if (props.restrictions.length !== restrictions.length){
    let x=[]
    for(let i = 0; i<props.restrictions.length;i++){
      x.push(0)
    }
    setSelected(x)
    setRestrictions(props.restrictions)
  };
  if (props.restrictionsLoading !== loading){
    setLoading(props.restrictionsLoading)
  };
  
  
    useEffect(() => {

        props.listCountryRestrions()
        return () => {
        //   props.clearCityActivities()
        }
    }, [])

    function updateOption(index,optionIndex){
      let x=[...selected]
      x[index]=optionIndex
      setSelected(x)
    }

    function updateSearch(text){
      let result=[]
      for(let i=0;i<restrictions.length;i++){
        if(restrictions[i].country.includes(text)){
          result.push(restrictions[i])
        }
      }
      setSearched(result)
      setSearch(text)
    }


  return (
    <View style={styles.container}>
              <Header nav={props.navigation}/>
              <Text style={styles.txt}>Country Restrictions</Text>
    <ScrollView style={styles.subContainer} contentContainerStyle={{alignItems:'center'}}>
  <View style={styles.row}>
      <TextInput
        style={styles.input}
        onChangeText={(text)=>updateSearch(text)}
        value={search}
        placeholder="Search for Country"
        // keyboardType="numeric"
      />
      {/* {search.length>0? */}
      <TouchableOpacity style={{width:w*0.15,justifyContent:'center',alignItems:'center'}}>
        <Icon  name={'arrow-right-circle'} size={normalize(25)} color={'#203152'} />
        </TouchableOpacity>
        {/* :null} */}
      </View>
      {/* <Text style={styles.txt}>{JSON.stringify(restrictions)}</Text> */}
      {loading?
    <ActivityIndicator style={{marginTop:h*0.25}} size="large" color="#203152" />

      :
      <FlatList 
                extraData={selected}
                data={search.length>0?searched:restrictions}
                style={{width:w*0.9}}
                keyExtractor={(item, index) => item.id }
                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }}
                renderItem={({ item, index }) =>  
                // {restrictions.map((item,index)=>

                <View style={styles.card}>
                  <View style={styles.header}>
                  {/* <View style={styles.flagContainer}> */}
                    <Flag name={item.country.toLowerCase()} height={w*0.2} width={w*0.2}  style={{margin:0}}/>
         
                  {/* </View> */}
                  <View style={{paddingTop:w*0.04,marginLeft:w*0.03}}>
                  <Text style={styles.title}>Country</Text>
                  <Text style={styles.country}>{item.country}</Text>
                  </View>
                  </View>
                  <View style={styles.line} />
                  <View style={styles.body}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  
                      {options.map((option,optionIndex)=>
                        <TouchableOpacity style={selected[index]==optionIndex?styles.selectedOptionCard:styles.optionCard} onPress={()=>updateOption(index,optionIndex)} activeOpacity={1.0}>
                          <Text style={selected[index]==optionIndex?[styles.optionText,{color:'white'}]:styles.optionText} numberOfLines={2}>{option}</Text>
                        </TouchableOpacity>
                      )

                      }

                    </ScrollView>

                    {  selected[index] ==0?
                      <View style={styles.textContainer}>
                        <Text style={styles.txt2}>{item.pcr.value?'Yes':'No'}</Text>
                        <Text style={styles.txt3}>{item.pcr.label}</Text>
                      </View>
                      :selected[index]==1?
                      <View style={styles.textContainer}>
                      <Text style={styles.txt2}>{item.vaccination.value?'Yes':'No'}</Text>
                      <Text style={styles.txt3}>{item.vaccination.label}</Text>
                    </View>
                      :selected[index]==2?
                      <View style={styles.textContainer}>
                      <Text style={styles.txt2}>Doses</Text>
                      <Text style={styles.txt3}>{item.doses}</Text>
                      </View>
                      :selected[index] ==3?
                      <View style={styles.textContainer}>
                        <Text style={styles.txt2}>Shops & Shopping centers</Text>
                        <Text style={styles.txt3}>{item.shops}</Text>
                      </View>
                      :selected[index]==4?
                      <View style={styles.textContainer}>
                      <Text style={styles.txt2}>Bars & Restaurants</Text>
                      <Text style={styles.txt3}>{item.restaurants}</Text>
                      </View>
                      :selected[index]==5?
                      <View style={styles.textContainer}>
                      <Text style={styles.txt2}>Touristic places</Text>
                      <Text style={styles.txt3}>{item.touristicPlaces}</Text>
                      </View>
                      :selected[index]==6?
                      <View style={styles.textContainer}>
                      <Text style={styles.txt2}>Public transport</Text>
                      <Text style={styles.txt3}>{item.publicTransport}</Text>
                      </View>
                      :selected[index]==7?
                      <View style={styles.textContainer}>
                      <Text style={styles.txt2}>Visa</Text>
                      <Text style={styles.txt3}>{item.visaApplying}</Text>
                      </View>
                      :null
                      }
                  </View>

                </View>
                // )}

   }/> }
      </ScrollView>
        </View>
  )
  }
  const mapStateToProps = state => ({
    restrictions:state.restrictions.restrictions,
    restrictionsLoading:state.restrictions.restrictionsLoading,
    
  })
  
  export default connect(mapStateToProps, actions)(CountryRestrictions);