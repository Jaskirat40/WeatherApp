import { View, Text, Image, FlatList } from 'react-native'
import React,{useEffect,useState} from 'react'
import Geolocation from '@react-native-community/geolocation';

export default function WeeklyForecast() {
  const[data,setData] = useState([])

  useEffect(()=>{
    Geolocation.getCurrentPosition((success)=> {
      let {latitude, longitude} = success.coords
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,hourly&appid=67cbe2819e035e37eae076f389bdae62`)
      .then(res=>res.json())
      .then(item=>setData(item))
    })
  },[])

  function date(unix){
    var timestamp = new Date(unix*1000);
    var date =  timestamp.getUTCDay();
    if (date == 0)
      return 'Sunday'
    else if (date == 1)
      return 'Monday'
    else if(date == 2)
      return 'Tuesday'
    else if (date == 3)
      return 'Wednesday'
    else if(date == 4)
      return 'Thursday'
    else if (date == 5)
      return 'Friday'
    else if(date == 6)
      return 'Saturday'
  }

  return (
    <View style={{flex:1,paddingTop:20}}>
      <FlatList
        keyExtractor={item=>item.dt}  
        showsVerticalScrollIndicator={false}
        data={data.daily}
        renderItem={({item}) => (
          <View style={{paddingHorizontal:20,paddingBottom:10,flexDirection:'row',alignItems:'center', fontSize:12,fontWeight:'bold'}}>  
            <Text style={{width:'22%',marginRight:'auto',fontSize:14,fontWeight:'bold', color:'midnightblue'}}>{date(item.dt)}</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'55%'}}>
              <Image style={{width:40,height:40}} source={{uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`}}/>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:14,fontWeight:'bold', color:'midnightblue' }}>{Math.floor(item.temp.max)}°   </Text>
                <Text style={{fontSize:14,fontWeight:'normal', color:'midnightblue' }}>{Math.floor(item.temp.min)}°</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}