import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderMessage } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'

class History extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    fetchCalendarResults()
      .then(entries => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        // if no entries for today, set the value to the reminder message
        if (!entries[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString()]: getDailyReminderMessage
            })
          )
        }
      })
  }
  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    )
  }
}

const mapStateToProps = entries => {
  return {
    entries
  }
}

export default connect(mapStateToProps)(History)
