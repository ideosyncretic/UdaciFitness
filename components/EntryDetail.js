import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import ActivityCard from './ActivityCard'

class EntryDetail extends Component {
	static navigationOptions = ({ navigation }) => {
		const { entryId } = navigation.state.params

		const year = entryId.slice(0, 4)
		const month = entryId.slice(5, 7)
		const day = entryId.slice(8)
		return {
			title: `${day}/${month}/${year}`,
		}
	}

	render() {
		const { activities } = this.props
		return (
			<View style={styles.container}>
				<ActivityCard activities={activities} />
				<Text>Entry Detail - {this.props.navigation.state.params.entryId}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white,
		padding: 15,
	},
})

const mapStateToProps = (state, { navigation }) => {
	const { entryId } = navigation.state.params

	return {
		entryId,
		activities: state[entryId],
	}
}

export default connect(mapStateToProps)(EntryDetail)
