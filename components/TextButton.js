import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const TextButton = ({ children, onPress }) => (
  <TouchableOpacity>
    <Text>{children}</Text>
  </TouchableOpacity>
)

export default TextButton
