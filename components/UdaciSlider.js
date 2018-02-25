import React from 'react'
import { View, Text, Slider, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'

const UdaciSlider = props => {
  const { value, onChange, step, max, unit } = props
  return (
    <View style={styles.row}>
      <Slider
        style={{ flex: 1 }}
        value={value}
        onValueChange={onChange}
        maximumValue={max}
        minimumValue={0}
        step={step}
        unit={unit}
      />
      <View style={styles.metricCounter}>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>{value}</Text>
        <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default UdaciSlider
