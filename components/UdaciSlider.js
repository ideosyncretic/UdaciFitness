import React from 'react'
import { View, Text, Slider } from 'react-native'

const UdaciSlider = props => {
  const { value, onChange, step, max, unit } = props
  return (
    <View>
      <Slider
        value={value}
        onValueChange={onChange}
        maximumValue={max}
        minimumValue={0}
        step={step}
        unit={unit}
      />
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  )
}

export default UdaciSlider
