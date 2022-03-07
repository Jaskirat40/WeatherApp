import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import moment from 'moment'
import Geolocation from '@react-native-community/geolocation';

export default function HourlyForecast() {
  const[data,setData] = useState([])
  useEffect(() => {
    Geolocation.getCurrentPosition((success)=> {
      let {latitude, longitude} = success.coords
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,daily&appid=67cbe2819e035e37eae076f389bdae62`)
      .then(res=>res.json())
      .then(item=>setData(item))
    })
  }, []);

  return (
    <View style={{paddingLeft:20,flex:1}}>
      <View style={{paddingBottom:10}}>
        <Text style={{fontSize:16,fontWeight:'bold',color:'#999999'}}>Today</Text>
      </View>
      <ScrollView horizontal={true} contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
        {data.hourly?data.hourly.map(item=>
              <View key={item.dt} style={styles.weather}>
                <Text style={{fontSize:10,fontWeight:'bold', color:'midnightblue'}}>{moment.tz(item.dt*1000, data.timezone).format("HH")+":00"}</Text>
                <Image style={{width:30,height:30}}source={{uri:`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}}/>
                <Text style={{fontSize:16,fontWeight:'bold', color:'midnightblue'}}>{Math.round(item.temp)}°</Text>
              </View>
        ):<Text></Text>}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
      backgroundColor:'#ffffff'
    },
    weather:{
      paddingRight:25,
      alignItems:'center',
      justifyContent:'space-around',
    }

})
