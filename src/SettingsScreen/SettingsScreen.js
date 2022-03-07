import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

export default function SettingsScreen() {
  const [data, setData] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    Geolocation.getCurrentPosition(success => {
      let {latitude, longitude} = success.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,daily&appid=67cbe2819e035e37eae076f389bdae62`,
      )
        .then(res => res.json())
        .then(item => setData(item));

      fetch(
        `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=BDYyBA70GPNVgvF5hrOhqfC7OYtnwzmIePJuDA6v4ck&mode=retrieveAddresses&prox=${latitude},${longitude}`,
      )
        .then(res => res.json())
        .then(item =>
          setAddress(item.Response.View[0].Result[0].Location.Address),
        );
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.location}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 10,
          }}>
          <Icon name="gps-fixed" />
          <Text style={{fontSize: 12, fontWeight: 'bold', color: 'gray'}}>
            {' '}
            Your Location Now
          </Text>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'darkblue'}}>
          {address.AdditionalData ? address.AdditionalData[2].value : ''}
          {', '}
          {address.AdditionalData ? address.AdditionalData[1].value : ''}
          {', '}
          {address.AdditionalData ? address.AdditionalData[0].value : ''}
        </Text>
      </View>
      <View style={styles.weather}>
        <Image
          source={require('../assets/weather-png-photos.png')}
          style={{
            width: 250,
            height: 220,
          }}
        />
        <Text
          style={[
            styles.blueColor,
            {
              backgroundColor: 'whitesmoke',
              padding: 5,
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 'bold',
            },
          ]}>
          {data.current ? data.current.weather[0].main: ''}
        </Text>
        <Text
          style={[
            styles.blueColor,
            {
              fontSize: 54,
              paddingTop: 20,
            },
          ]}>
          {data.current ? Math.round(data.current.temp) + '°c' : ''}
        </Text>
      </View>
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingTop:20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Feather name="wind" size={18} color={'skyblue'} />
          <Text style={{fontSize: 12, color: 'darkblue', fontWeight: 'bold'}}>
            {'  '}
            {Math.round(data.current ? data.current.wind_speed : '')}km/h
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Feather name="droplet" size={18} color={'skyblue'} />
          <Text style={{fontSize: 12, color: 'darkblue', fontWeight: 'bold'}}>
            {'  '}
            {data.current ? data.current.humidity : ''}%
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Feather name="info" size={18} color={'skyblue'} />
          <Text style={{fontSize: 12, color: 'darkblue', fontWeight: 'bold'}}>
            {'  '}
            {data.current ? data.current.pressure : ''} mBar
          </Text>
        </View>
      </View>
      <View style={styles.settings}>
        <View style={{paddingHorizontal:20, flexDirection:'row', alignItems:'center', paddingBottom:30, paddingTop:50}}>
          <Text style={{marginRight:'auto', color:'darkblue', fontSize:16, fontWeight:'bold'}}>Temparature</Text>
          <Text style={{marginRight:10}}>Celcius</Text>
          <Feather name='chevron-right' size={18} color={'darkblue'}/>
        </View>    
        <View style={{paddingHorizontal:20, flexDirection:'row', alignItems:'center', paddingBottom:30, }}>
          <Text style={{marginRight:'auto', color:'darkblue', fontSize:16, fontWeight:'bold'}}>Wind speed</Text>
          <Text style={{marginRight:10}}>m/s</Text>
          <Feather name='chevron-right' size={18} color={'darkblue'}/>
        </View>    
        <View style={{paddingHorizontal:20, flexDirection:'row', alignItems:'center', paddingBottom:30, }}>
          <Text style={{marginRight:'auto', color:'darkblue', fontSize:16, fontWeight:'bold'}}>Source</Text>
          <Text style={{marginRight:10}}>weather.gov</Text>
          <Feather name='chevron-right' size={18} color={'darkblue'}/>
        </View>      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blueColor: {
    color: 'darkblue',
  },
  location: {
    flex: 0.2,
    alignItems: 'center',
    paddingVertical: 10,
  },
  weather: {
    flex: 1.15,
    alignItems: 'center',
  },
  settings: {
    flex: 1,
  },
});
