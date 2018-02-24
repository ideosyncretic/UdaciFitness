import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getActivityMetaInfo } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'

export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    eat: 0,
    sleep: 0
  }

  increment = activity => {
    const { max, step } = getActivityMetaInfo(activity)
    this.setState(state => {
      const count = state[activity] + step

      return {
        ...state,
        [activity]: count > max ? max : count
      }
    })
  }

  decrement = activity => {
    const { step } = getActivityMetaInfo(activity)
    this.setState(state => {
      const count = state[activity] - step

      return {
        ...state,
        [activity]: count < 0 ? 0 : count
      }
    })
  }

  slide = (activity, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }

  render() {
    const metaInfo = getActivityMetaInfo()
    return (
      <View>
        {Object.keys(metaInfo).map(activity => {
          const { getIcon, type, ...rest } = metaInfo[activity]
          const value = this.state[activity]

          return (
            <View key={activity}>
              {getIcon()}
              {type === 'slider' ? (
                <UdaciSlider
                  value={value}
                  onChange={value => this.slide(activity, value)}
                  {...rest}
                />
              ) : (
                <UdaciSteppers
                  value={value}
                  onIncrement={() => this.increment(activity)}
                  onDecrement={() => this.decrement(activity)}
                />
              )}
            </View>
          )
        })}
      </View>
    )
  }
}
