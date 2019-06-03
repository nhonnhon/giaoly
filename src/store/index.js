import { createStore } from 'redux'
import reducers from '../reducers/common'
export const store = createStore(reducers)