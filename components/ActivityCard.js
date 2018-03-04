import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DateHeader from './DateHeader'
import { getActivityMetaInfo } from '../utils/helpers'
import { gray } from '../utils/colors'

const ActivityCard = ({ date, activities }) => {
	return (
		<View>
			{date && <DateHeader date={date} />}
			{Object.keys(activities).map(activity => {
				const {
					getIcon,
					displayName,
					unit,
					backgroundColor,
				} = getActivityMetaInfo(activity)

				return (
					<View style={styles.activity} key={activity}>
						{getIcon()}
						<View>
							<Text style={{ fontSize: 20 }}>{displayName}</Text>
							<Text style={{ fontSize: 16, color: gray }}>
								{activities[activity]} {unit}
							</Text>
						</View>
					</View>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	activity: {
		flexDirection: 'row',
		marginTop: 12,
	},
})

export default ActivityCard
