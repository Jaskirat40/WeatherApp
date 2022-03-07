import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment-timezone';
import Geolocation from '@react-native-community/geolocation';

export default function CurrentForecast() {
  const [data, setData] = useState([]);
  const [address, setAddress] = useState('');

  const data1 = {
    datasets: [
      {
        data: [50, 20, 50, 20, 12],
        color: (opacity = 1) => 'lightgray',
        strokeWidth: 2,
      },
    ],
  };

  useEffect(() => {
    Geolocation.getCurrentPosition((success)=> {
      let {latitude, longitude} = success.coords;
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,daily&appid=67cbe2819e035e37eae076f389bdae62`)
      .then(res=>res.json())
      .then(item=>setData(item))
      fetch(
        `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=BDYyBA70GPNVgvF5hrOhqfC7OYtnwzmIePJuDA6v4ck&mode=retrieveAddresses&prox=${latitude},${longitude}`,
      )
        .then(res => res.json())
        .then(item =>
          setAddress(item.Response.View[0].Result[0].Location.Address),
        );
    })
  }, []);

  return (
    <View style={[styles.container]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'relative',
        }}>
        <View>
          <Text style={[styles.bluecolor, {fontSize: 20, fontWeight: 'bold'}]}>
          {address.AdditionalData ? address.AdditionalData[2].value : ''}
          </Text>
          <View style={{alignItems: 'flex-start', paddingTop: 10}}>
            <Text style={[styles.bluecolor, {fontSize: 74}]}>
              {data.current ? Math.round(data.current.temp) : ''}°
            </Text>
            <Text
              style={[
                styles.bluecolor,
                {
                  backgroundColor: 'whitesmoke',
                  padding: 5,
                  borderRadius: 10,
                  marginLeft: 7,
                  fontSize: 14,
                  fontWeight: 'bold',
                },
              ]}>
              {data.current ? data.current.weather[0].main : ''}
            </Text>
          </View>
        </View>
        <Image
          source={require('../assets/weather-png-photos.png')}
          style={{
            width: 300,
            height: 300,
            position: 'absolute',
            overflow: 'hidden',
            right: -100,
            top: -35,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 100,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Feather name="droplet" size={15} color={'skyblue'} />
          <Text style={{fontSize: 12, color: 'darkblue', fontWeight: 'bold'}}>
            {' '}
            {data.current ? data.current.humidity : ''}%
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Feather name="info" size={15} color={'skyblue'} />
          <Text style={{fontSize: 12, color: 'darkblue', fontWeight: 'bold'}}>
            {' '}
            {data.current ? data.current.pressure : ''} mBar
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Feather name="wind" size={15} color={'skyblue'} />
          <Text style={{fontSize: 12, color: 'darkblue', fontWeight: 'bold'}}>
            {' '}
            {Math.round(data.current ? data.current.wind_speed : '')}km/h
          </Text>
        </View>
      </View>
      <View style={{justifyContent: 'center', position: 'relative',}}>
        <LineChart
          withDots={false}
          withVerticalLabels={false}
          withVerticalLines={false}
          withHorizontalLabels={false}
          withHorizontalLines={false}
          data={data1}
          width={2000}
          height={120}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 255) => '#ffffff',
          }}
          bezier
          style={{
            marginLeft: -90,
            marginRight: 0,
            paddingTop: 30,
            borderRadius: 0,
          }}
        />
        <View style={{position: 'absolute', top:35, left:20, flexDirection:'row', alignItems:'center'}}>
          <Feather name='sunrise' color='black' size={16}/>
          <Text style={{}}>
            {'  '}
            {moment
              .tz(data.current ? data.current.sunrise * 1000 : '', data.timezone)
              .format('HH:mm')}{' '}
            AM
          </Text>
        </View>
        <View style={{position: 'absolute', bottom: 40, right: 10, flexDirection:'row', alignItems:'center'}}>
          <Text >
            {moment
              .tz(data.current ? data.current.sunset * 1000 : '', data.timezone)
              .format('HH:mm')}{' '}
            PM
            {'  '}
          </Text>
          <Feather name='sunset' color='black' size={16}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  bluecolor: {
    color: 'midnightblue',
  },
});
