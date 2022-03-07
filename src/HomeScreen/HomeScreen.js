import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import CurrentForecast from './CurrentForecast'
import HourlyForecast from './HourlyForecast'
import WeeklyForecast from './WeeklyForecast'

export default function HomeScreen() {
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.box1}>
        <CurrentForecast />
      </View>
      <View style={styles.box2}>
        <HourlyForecast />
      </View>
      <View style={styles.box3}>
        <WeeklyForecast />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  box1:{
    flex:4,
    backgroundColor:'#ffffff'
  },
  box2:{
    flex:1.2,
    backgroundColor:'#ffffff'
  },
  box3:{
    flex:1.5,
    backgroundColor:'#ffffff'   
  }
})