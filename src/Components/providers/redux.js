import React from 'react'
import { Provider } from 'react-redux'
import { store } from './../../utils/configureStore'

export default ({ children }) => <Provider store={store}>{children}</Provider>
