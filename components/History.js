import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderMessage } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'

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
							[timeToString()]: getDailyReminderMessage(),
						}),
					)
				}
			})
	}

	renderItem = ({ today, ...prevDays }, formattedDate, key) => (
		<View>
			{today ? (
				<Text>{JSON.stringify(today)}</Text>
			) : (
				<Text>{JSON.stringify(prevDays)}</Text>
			)}
		</View>
	)

	renderEmptyDate(formattedDate) {
		return (
			<View>
				<Text>No data for this day.</Text>
			</View>
		)
	}
	render() {
		const { entries } = this.props
		return (
			<UdaciFitnessCalendar
				items={entries}
				renderItem={this.renderItem}
				renderEmptyDate={this.renderEmptyDate}
			/>
		)
	}
}

const mapStateToProps = entries => {
	return {
		entries,
	}
}

export default connect(mapStateToProps)(History)
