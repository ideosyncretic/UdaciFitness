import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { getActivityMetaInfo, timeToString } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'

const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  )
}

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
      [activity]: value
    }))
  }

  submit = () => {
    const key = timeToString() // format date
    const entry = this.state

    // TODO update Redux

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      eat: 0,
      sleep: 0
    })

    // TODO navigate to home

    submitEntry({ key, entry })

    // TODO clear local notification
  }

  reset = () => {
    const key = timeToString()

    // TODO update Redux

    // TODO navigate to home

    // TODO save to "database"
    removeEntry(key)
  }

  render() {
    const metaInfo = getActivityMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name="ios-happy-outline" size={100} />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      )
    }

    return (
      <View>
        <DateHeader date={new Date().toLocaleDateString()} />
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
                  {...rest}
                />
              )}
            </View>
          )
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}
