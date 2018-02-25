export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRIES = 'ADD_ENTRIES'

export const receiveEntries = entries => {
  return {
    type: RECEIVE_ENTRIES,
    entries
  }
}

export const addEntries = entry => {
  return {
    type: ADD_ENTRIES,
    entry
  }
}
