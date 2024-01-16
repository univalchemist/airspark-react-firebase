import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './../../utils/configureStore'

export default ({ children }) => (
	<ConnectedRouter history={history}>{children}</ConnectedRouter>
)
