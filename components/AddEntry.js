import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
  getActivityMetaInfo,
  timeToString,
  getDailyReminderMessage
} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { white, purple } from '../utils/colors'

const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {
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

    // Update Redux
    this.props.dispatch(
      addEntry({
        [key]: entry
      })
    )

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      eat: 0,
      sleep: 0
    })

    // TODO navigate to home

    // update local storage
    submitEntry({ key, entry })

    // TODO clear local notification
  }

  reset = () => {
    const key = timeToString()

    // TODO update Redux
    this.props.dispatch(
      addEntry({
        [key]: getDailyReminderMessage()
      })
    )

    // TODO navigate to home

    // TODO save to "database"
    removeEntry(key)
  }

  render() {
    const metaInfo = getActivityMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
            size={100}
          />
          <Text>You already logged your information for today</Text>
          <TextButton style={{ padding: 10 }} onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(activity => {
          const { getIcon, type, ...rest } = metaInfo[activity]
          const value = this.state[activity]

          return (
            <View key={activity} style={styles.row}>
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
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginRight: 40,
    marginLeft: 40
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})

const mapStateToProps = state => {
  const key = timeToString()
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps)(AddEntry)
